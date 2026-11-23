param([switch]$Undo)
$ErrorActionPreference='Stop'
$dst=(Resolve-Path -LiteralPath '.\demo\public\app.js').Path
$receipt=Join-Path $PSScriptRoot 'installed.local.json'
$allowed=@('8adae7ce566b409e00ee0107abc9fd9df883264ff057efe4cdc8a1e70659d3e9','7a8da0bb70ed0f88455cc5568d26744ed827705acb0337abcb0ea4476d851bd0')
function H($p){(Get-FileHash -Algorithm SHA256 -LiteralPath $p).Hash.ToLowerInvariant()}
$current=H $dst
if(Test-Path -LiteralPath $receipt){
 $m=Get-Content -LiteralPath $receipt -Raw | ConvertFrom-Json
 if($m.target -ne $dst){throw 'Receipt belongs to another project.'}
 if($current -eq $m.after){
  if(!$Undo){Write-Host 'Contacts grid already installed.';return}
  if((H $m.backup) -ne $m.before){throw 'Backup mismatch.'}
  $tmp="$dst.$([guid]::NewGuid()).tmp";try{[IO.File]::Copy($m.backup,$tmp);[IO.File]::Replace($tmp,$dst,"$($m.backup).undone-$([guid]::NewGuid())")}finally{if(Test-Path $tmp){Remove-Item -LiteralPath $tmp}};Write-Host 'Original UI restored.';return
 }
}
if($Undo){throw 'No matching installation to undo.'}
if($current -notin $allowed){throw 'Unknown app.js version; nothing overwritten.'}
$work=New-Item -ItemType Directory -Path (Join-Path $env:TEMP ('mk-grid-'+[guid]::NewGuid()))
$tmp="$dst.$([guid]::NewGuid()).js"
try{
 Push-Location $work.FullName
 try{
  & npm.cmd pack 'tabulator-tables@6.3.1' --registry=https://registry.npmjs.org --ignore-scripts --silent
  if($LASTEXITCODE -ne 0){throw 'Tabulator download failed; no UI change.'}
  & tar.exe -xzf 'tabulator-tables-6.3.1.tgz';if($LASTEXITCODE -ne 0){throw 'Vendor extraction failed.'}
  & node (Join-Path $PSScriptRoot 'build.mjs') $dst (Join-Path $work.FullName 'package') $tmp
  if($LASTEXITCODE -ne 0){throw 'Build failed.'}; & node --check $tmp;if($LASTEXITCODE -ne 0){throw 'Invalid bundle.'}
 }finally{Pop-Location}
 if((H $dst) -ne $current){throw 'UI changed during installation.'}
 $bak="$dst.before-contacts-$([guid]::NewGuid()).bak"
 @{target=$dst;before=$current;after=(H $tmp);backup=$bak}|ConvertTo-Json|Set-Content -LiteralPath $receipt -Encoding UTF8
 [IO.File]::Replace($tmp,$dst,$bak)
 Write-Host "Contacts grid installed. Backup: $bak"
}finally{if(Test-Path $tmp){Remove-Item -LiteralPath $tmp};Remove-Item -LiteralPath $work.FullName -Recurse -Force}
