:: author milkmidi
set FILE_ZILLA="C:\Program Files\FileZilla FTP Client\filezilla.exe"
set IP=210.61.2.204
set REMOTE_PATH="/www.hennessy-tw.com/2017Hennessy_Privilege_Collection"
set /p USER_ID=<"e:\ftp_id.txt"
set /p PWD=<"e:\ftp_pwd.txt"
%FILE_ZILLA% "ftp://%USER_ID%:%PWD%@%IP%%REMOTE_PATH%" --local="%cd%\dist"
::pause
::close

