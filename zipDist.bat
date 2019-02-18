@echo off

call yarn build

for /f "delims=" %%i in ("%cd%") do set folder=%%~ni

winrar a -r -afzip -ep1 ./%folder%.zip ./dist/

pause
