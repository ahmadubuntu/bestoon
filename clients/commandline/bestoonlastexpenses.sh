#!/bin/bash

source "$(dirname $0)"/bestoonconfig.sh

curl --data "token=$TOKEN" $BASE_URL/q/expenses/
