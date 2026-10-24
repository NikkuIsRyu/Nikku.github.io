#!/usr/bin/env bash
# One-click backup of Website_project to Google Drive on Linux / Omarchy
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

BACKUP_DIR="${HOME}/GoogleDrive/University/Website_Project_Backups"
mkdir -p "$BACKUP_DIR"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M")
ZIP_PATH="${BACKUP_DIR}/Website_project_backup_${TIMESTAMP}.zip"

echo "Creating backup archive: ${ZIP_PATH}..."
zip -r -q "$ZIP_PATH" . -x "node_modules/*" ".astro/*" "dist/*" ".git/*" ".npm-cache/*" "temp/*" ".antigravity_logs/*"

SIZE=$(du -h "$ZIP_PATH" | cut -f1)
echo "Backup successfully saved to Google Drive: ${ZIP_PATH} (${SIZE})"
