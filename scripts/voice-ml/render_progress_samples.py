"""Render the same sentences with every Voice ML training stage, for the
fine-tuning progress player on nikku.tech (/projects/voice-ml/).

Run on the GPU PC, from the Voice_ML_Project root:
    1. Start the API:  run_api.bat          (GPT-SoVITS api_v2 on 127.0.0.1:9880)
    2. In a second terminal, with the GPTSoVits env python:
         D:\\miniconda3\\envs\\GPTSoVits\\python.exe render_progress_samples.py
    3. Copy the folder  output\\website_progress\\  to Google Drive:
         10 Projects/Voice ML/website_progress/

Stages (same seed and sampling settings for all, so only the model changes):
    1 baseline  base pretrained GPT-SoVITS v2ProPlus, zero-shot clone of the
                female_zh_c1 reference voice (no fine-tuning)
    2 ft1       female_v3      (CSMSC, first fine-tune)
    3 ft2       female_v4      (CSMSC 7.5 h, second fine-tune)
    4 current   female_zh_c1   (AISHELL-3, current commercial model)

Paths follow configs/voice_profiles.yaml: weights are relative to GPT-SoVITS/,
reference audio is relative to the project root.
"""
import json
import sys
import time
from pathlib import Path

import requests
import yaml

API_URL = "http://127.0.0.1:9880"
PROJECT_ROOT = Path(__file__).resolve().parent
GPT_SOVITS_DIR = PROJECT_ROOT / "GPT-SoVITS"
OUT_DIR = PROJECT_ROOT / "output" / "website_progress"

# Self-written test sentences from data/eval/v4_testset.json (no textbook text).
SENTENCES = {
    "greeting": "你好，今天过得开心吗？",
    "sandhi": "老李想买两把好看的雨伞，可以陪小吕一起去展览馆选购。",
    "cuisine": "这道特色菜既保留了传统风味，又融合了创新的烹饪工艺，味道确实不同凡响。",
}

SAMPLING = {
    "text_lang": "zh",
    "prompt_lang": "zh",
    "top_k": 10,
    "top_p": 1.0,
    "temperature": 0.8,
    "speed_factor": 1.0,
    "text_split_method": "cut5",
    "batch_size": 1,
    "seed": 42,
    "split_bucket": True,
    "parallel_infer": True,
}


def load_stages():
    profiles = yaml.safe_load((PROJECT_ROOT / "configs" / "voice_profiles.yaml").read_text(encoding="utf-8"))["voices"]
    c1 = profiles["female_zh_c1"]
    base = profiles["male_zs_c1"]  # its weights are the untouched base pretrained models
    return [
        ("1_baseline", {**c1, "sovits_weights": base["sovits_weights"], "gpt_weights": base["gpt_weights"]}),
        ("2_ft1", profiles["female_v3"]),
        ("3_ft2", profiles["female_v4"]),
        ("4_current", c1),
    ]


def set_weights(profile):
    for endpoint, key in (("set_sovits_weights", "sovits_weights"), ("set_gpt_weights", "gpt_weights")):
        path = (GPT_SOVITS_DIR / profile[key]).resolve()
        if not path.exists():
            sys.exit(f"Missing weights: {path}")
        r = requests.get(f"{API_URL}/{endpoint}", params={"weights_path": str(path)}, timeout=60)
        if r.status_code != 200:
            sys.exit(f"{endpoint} failed: {r.text}")


def main():
    try:
        requests.get(f"{API_URL}/", timeout=5)
    except requests.ConnectionError:
        sys.exit("API not running. Start run_api.bat first.")

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest = []
    for stage, profile in load_stages():
        ref = (PROJECT_ROOT / profile["ref_audio"]).resolve()
        if not ref.exists():
            sys.exit(f"Missing reference audio: {ref}")
        set_weights(profile)
        print(f"[{stage}] {Path(profile['sovits_weights']).name} | {Path(profile['gpt_weights']).name}")
        for key, text in SENTENCES.items():
            payload = {**SAMPLING, "text": text, "ref_audio_path": str(ref), "prompt_text": profile["prompt_text"]}
            t0 = time.time()
            r = requests.post(f"{API_URL}/tts", json=payload, timeout=180)
            if r.status_code != 200 or not r.content:
                sys.exit(f"TTS failed for {stage}/{key}: {r.status_code} {r.text[:200]}")
            out = OUT_DIR / f"{stage}_{key}.wav"
            out.write_bytes(r.content)
            manifest.append({"stage": stage, "sentence": key, "text": text, "file": out.name,
                             "sovits": profile["sovits_weights"], "gpt": profile["gpt_weights"]})
            print(f"   {out.name}  ({time.time() - t0:.1f}s)")

    (OUT_DIR / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nDone: {len(manifest)} files in {OUT_DIR}")
    print("Copy that folder to Google Drive: 10 Projects/Voice ML/website_progress/")


if __name__ == "__main__":
    main()
