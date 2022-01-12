#!/bin/bash
export ZOWE_OPT_TEST_ENV="zowe🐚"
echo "zowe😊" | zowe zcsp issue cwo --test-arg "zowe😊"
unset ZOWE_OPT_TEST_ENV
