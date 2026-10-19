# One-click backup of Website_project to Google Drive
$backupDir = "G:\Meine Ablage\University\Website_Project_Backups"
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
}

$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm"
$zipPath = "$backupDir\Website_project_backup_$timestamp.zip"

Write-Host "Creating backup archive: $zipPath..." -ForegroundColor Cyan

$exclude = @('node_modules', '.astro', 'dist', '.git', '.npm-cache', 'temp', '.antigravity_logs')
$files = Get-ChildItem -Path $PSScriptRoot -Recurse | Where-Object {
    $itemPath = $_.FullName
    $skip = $false
    foreach ($ex in $exclude) {
        if ($itemPath -match "[\\/]$ex([\\/]|$)") { $skip = $true; break }
    }
    -not $skip
}

Add-Type -AssemblyName System.IO.Compression.FileSystem
$tempFolder = "D:\Temp\backup_stage_$timestamp"
if (-not (Test-Path "D:\Temp")) { New-Item -ItemType Directory -Force -Path "D:\Temp" | Out-Null }
New-Item -ItemType Directory -Force -Path $tempFolder | Out-Null

$baseDir = $PSScriptRoot
foreach ($f in $files) {
    if (-not $f.PSIsContainer) {
        $rel = $f.FullName.Substring($baseDir.Length + 1)
        $dest = Join-Path $tempFolder $rel
        $parent = Split-Path $dest
        if (-not (Test-Path $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
        Copy-Item $f.FullName -Destination $dest -Force
    }
}

[System.IO.Compression.ZipFile]::CreateFromDirectory($tempFolder, $zipPath)
Remove-Item -Recurse -Force $tempFolder

$sizeKb = [math]::Round((Get-Item $zipPath).Length / 1KB, 1)
Write-Host "Backup successfully saved to Google Drive: $zipPath ($sizeKb KB)" -ForegroundColor Green
