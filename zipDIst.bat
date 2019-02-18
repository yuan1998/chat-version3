@echo off

call yarn build

for /f "delims=" %%i in ("%cd%") do set folder=%%~ni

rar a -r -ep1 ./%folder%.zip ./dist/

pause
