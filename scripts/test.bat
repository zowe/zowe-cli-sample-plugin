@echo off
chcp 65001 >NUL
set ZOWE_OPT_TEST_ENV=zowe🦇
echo zowe😊 | zowe zcsp issue cwo --test-arg "zowe😊"
set ZOWE_OPT_TEST_ENV=
