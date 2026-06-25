#!/bin/bash
set -e # fail the script if we get a non zero exit code
zowe zcsp issue command-with-positionals $1 $2
