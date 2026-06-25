#!/bin/bash
set -e # fail the script if we get a non zero exit code
zowe zcsp issue command-with-options --requiredNumber $1 --use-the-string --the-string $2
