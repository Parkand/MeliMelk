$ErrorActionPreference='Stop'
$css=(Resolve-Path '.\app\globals.css').Path
$js=(Resolve-Path '.\demo\public\app.js').Path
$launcher=Join-Path $env:LOCALAPPDATA 'DaftarDemo\pg-default\start-daftar-pg.ps1'
if(!(Test-Path -LiteralPath $launcher)){throw 'Launcher not found'}
if([Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners().Port -contains 3182){throw 'Stop the existing demo with Ctrl+C first.'}
$tmp="$css.$([guid]::NewGuid()).tmp"
$backup="$css.before-contacts-$([guid]::NewGuid()).bak"
$hash=(Get-FileHash -LiteralPath $css).Hash
try {
 & node (Join-Path $PSScriptRoot 'extract.mjs') $js $css $tmp
 if($LASTEXITCODE -ne 0){throw 'CSS patch stopped; no changes.'}
 if((Get-FileHash -LiteralPath $css).Hash -ne $hash){throw 'CSS changed; stopped.'}
 [IO.File]::Replace($tmp,$css,$backup)
 Write-Host "CSS installed. Original CSS backup: $backup"
}finally{if(Test-Path -LiteralPath $tmp){Remove-Item -LiteralPath $tmp}}
if(Get-Command git -ErrorAction SilentlyContinue){git --no-pager diff --stat -- app/globals.css demo/public/app.js}
& powershell.exe -NoProfile -ExecutionPolicy Bypass -File $launcher
