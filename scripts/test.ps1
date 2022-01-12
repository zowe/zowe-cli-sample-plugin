$env:ZOWE_OPT_TEST_ENV = "zowe⚡"
"zowe😊" | zowe zcsp issue cwo --test-arg "zowe😊"
Remove-Item Env:\ZOWE_OPT_TEST_ENV
