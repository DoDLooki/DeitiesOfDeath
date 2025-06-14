@echo off
setlocal

set "ROUTES=coaching build-orders merch privacy contact about legal random-draft"
set "OUT=dist"

for %%R in (%ROUTES%) do (
    mkdir "%OUT%\%%R" 2>nul
    copy "%OUT%\index.html" "%OUT%\%%R\index.html" >nul
    echo ✓ Copied index.html to %OUT%\%%R\
)

endlocal
