# -----------------------------------------
# Generate project tree (ASCII-only)
# -----------------------------------------

$excludePattern = 'node_modules|\.next|dist|build|coverage|\.git|\.vscode'

$root = (Get-Location).Path

$lines = Get-ChildItem -Recurse -Force |
    Where-Object { $_.FullName -notmatch $excludePattern } |
    Select-Object -ExpandProperty FullName |
    ForEach-Object { $_.Replace($root + '\', '') } |
    Sort-Object |
    ForEach-Object {
        $parts = $_ -split '\\'
        $depth = $parts.Count - 1
        ('|  ' * $depth) + '|-- ' + $parts[-1]
    }

# ASCII works in any encoding (TIS-620, ANSI, UTF-8)
Set-Content -Path "project_tree.txt" -Value $lines -Encoding ascii

Add-Content "project_tree.txt" "" -Encoding ascii
Add-Content "project_tree.txt" "-----------------------------" -Encoding ascii
Add-Content "project_tree.txt" "Run this command to regenerate:" -Encoding ascii
Add-Content "project_tree.txt" "powershell -ExecutionPolicy Bypass -File generate_tree.ps1" -Encoding ascii


# powershell -ExecutionPolicy Bypass -File generate_tree.ps1
