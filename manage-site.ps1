param([ValidateSet('Setup','Restart')][string]$Action='Restart')
$ErrorActionPreference='Stop'
$secret=$null
try {
    $root='F:\Nexora Real Stat All From AI\MeliMelk-publish'
    if ($PSScriptRoot -ne $root) {throw 'Unexpected project directory.'}
    $entry=(Get-Item -LiteralPath (Join-Path $root 'demo\server-mobile.mjs')).FullName
    $folder=Join-Path $env:LOCALAPPDATA 'MeliMelk\site-3182'
    [void][IO.Directory]::CreateDirectory($folder)
    $lock=[IO.File]::Open((Join-Path $folder 'manage.lock'),'OpenOrCreate','ReadWrite','None')
    $vault=Join-Path $folder 'postgres.dpapi'
    $record=Join-Path $folder 'server.json'
    if ($Action -eq 'Setup') {
        $secret=Read-Host 'PostgreSQL password for daftar_app' -AsSecureString
        if (!$secret -or !$secret.Length) {throw 'Empty password; credential unchanged.'}
        [IO.File]::WriteAllText($vault,(ConvertFrom-SecureString $secret))
        Write-Host 'RESULT: Encrypted credential saved for this Windows user.' -ForegroundColor Green
    } else {
        $secret=ConvertTo-SecureString ([IO.File]::ReadAllText($vault))
        $node=(Get-Command node.exe -CommandType Application).Source
        $start=New-Object Diagnostics.ProcessStartInfo
        $start.FileName=$node
        $start.Arguments='"'+$entry+'"'
        $start.WorkingDirectory=$root
        $start.UseShellExecute=$false
        $start.CreateNoWindow=$true
        $start.EnvironmentVariables['DEMO_PORT']='3182'
        $start.EnvironmentVariables['PGPASSWORD']=([pscredential]::new('daftar_app',$secret)).GetNetworkCredential().Password
        function Get-SiteListener { @(Get-NetTCPConnection -State Listen -ErrorAction Stop | Where-Object LocalPort -eq 3182) }
        $listeners=@(Get-SiteListener)
        if ($listeners.Count) {
            if (!(Test-Path -LiteralPath $record)) {throw 'Port 3182 is unmanaged. No process was stopped.'}
            $saved=Get-Content -Raw -LiteralPath $record | ConvertFrom-Json
            $old=Get-Process -Id $saved.id
            $null=$old.Handle
            $info=Get-CimInstance Win32_Process -Filter ("ProcessId="+$old.Id)
            if ($listeners.Count -ne 1 -or $listeners[0].OwningProcess -ne $old.Id -or
                $old.StartTime.ToUniversalTime().Ticks.ToString() -ne $saved.started -or
                $info.ExecutablePath -ne $node -or !$info.CommandLine.EndsWith('"'+$entry+'"',[StringComparison]::OrdinalIgnoreCase)) {
                throw 'Listener identity mismatch. No process was stopped.'
            }
            $old.Kill()
            if (!$old.WaitForExit(10000)) {throw 'Managed process did not stop.'}
        }
        $child=[Diagnostics.Process]::Start($start)
        $start.EnvironmentVariables.Remove('PGPASSWORD')
        @{id=$child.Id;started=$child.StartTime.ToUniversalTime().Ticks.ToString()} | ConvertTo-Json | Set-Content -LiteralPath $record
        $deadline=[DateTime]::UtcNow.AddSeconds(25)
        do {
            if ($child.HasExited) {throw 'Server exited during startup.'}
            $listening=Get-SiteListener | Where-Object OwningProcess -eq $child.Id | Select-Object -First 1
            if ($listening) {break}
            Start-Sleep -Milliseconds 300
        } while ([DateTime]::UtcNow -lt $deadline)
        if (!$listening) {throw 'Server did not listen on port 3182 in time.'}
        $response=Invoke-WebRequest -UseBasicParsing -Uri ('http://'+$listening.LocalAddress+':3182/login') -TimeoutSec 8
        if ($response.StatusCode -ne 200) {throw 'Login page unavailable.'}
        Write-Host 'RESULT: Managed site is responding on port 3182.' -ForegroundColor Green
    }
} catch {
    Write-Host ('RESULT: '+$_.Exception.Message) -ForegroundColor Red
    exit 1
} finally {
    if ($secret) {$secret.Dispose()}
    if ($lock) {$lock.Dispose()}
}
