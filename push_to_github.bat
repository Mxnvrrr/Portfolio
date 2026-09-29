@echo off
title Push Portfolio to GitHub
color 0b
echo ==============================================================
echo       PUSHING MANVEER SINGH'S PORTFOLIO TO GITHUB
echo       Repository: https://github.com/Mxnvrrr/Portfolio
echo ==============================================================
echo.
echo If a GitHub login window appears, please authorize or sign in.
echo.
git push -u origin main --force
echo.
if %ERRORLEVEL% EQU 0 (
    echo ==============================================================
    echo [SUCCESS] Code pushed successfully to main branch!
    echo.
    echo Now open this page to turn on GitHub Pages:
    echo https://github.com/Mxnvrrr/Portfolio/settings/pages
    echo.
    echo Select 'main' branch, click Save, and your site is LIVE!
    echo ==============================================================
) else (
    echo.
    echo [NOTE] If you saw an authentication prompt, please sign in.
    echo If needed, run this script again.
)
echo.
pause
