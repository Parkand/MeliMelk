param([switch]$Undo)
$ErrorActionPreference='Stop'
$launcher=Join-Path $env:LOCALAPPDATA 'DaftarDemo\pg-default\start-daftar-pg.ps1'
if(!(Test-Path -LiteralPath $launcher)){throw 'Launcher not found.'}
if([Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners().Port -contains 3182){throw 'Stop the running demo with Ctrl+C first.'}
$mode=if($Undo){'undo'}else{'install'}
& node (Join-Path $PSScriptRoot 'apply.mjs') $mode
if($LASTEXITCODE -ne 0){throw 'Grid update stopped; demo was not started.'}
if(Get-Command git -ErrorAction SilentlyContinue){git status --short -- demo/public/app.js app/globals.css tools/maskan-grid-shared;git --no-pager diff --stat -- demo/public/app.js app/globals.css}
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $launcher
