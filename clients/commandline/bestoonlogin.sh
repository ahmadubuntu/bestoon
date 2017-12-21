#!/bin/bash

source "$(dirname $0)"/bestoonconfig.sh

print_usage()
{
    echo "Use this script to submit expense reports to ${BASE_URL}"
    echo "Usage: ${0} <Amount> <Description>. Eg:"
    echo "Usage: ${0} 1000 Donation"
}

USERNAME=$1
shift
PASSWORD=$*
if [ -z "$PASSWORD" ]; then
    print_usage
    exit 1
fi

curl --data "username=$USERNAME&password=$PASSWORD" $BASE_URL/accounts/login/
