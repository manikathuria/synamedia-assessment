#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PROJECT_ROOT=$DIR/..

cd $PROJECT_ROOT

SYNAMEDIA_ASSESSMENT_ENV_FILE=.env_api

function recreate_env_file() {
    local _FILE=$1
    if test -f "$_FILE"; then
        echo "$_FILE file exists."
        rm $_FILE
        echo "$_FILE file removed and creating new $_FILE file."
        touch $_FILE
    fi
}

recreate_env_file $SYNAMEDIA_ASSESSMENT_ENV_FILE

##########################################################################
# Generating .env required for picking build args
##########################################################################
rm .env
echo UID=`id -u`>> .env
echo GID=`id -g`>> .env
echo NODE_ENV=development >> .env

##########################################################################
# Generating .env_api for synamedia-assessment
##########################################################################
echo PORT=7871 >> $SYNAMEDIA_ASSESSMENT_ENV_FILE
echo NODE_ENV=development >> $SYNAMEDIA_ASSESSMENT_ENV_FILE
echo "SWAGGER_DESCRIPTION=SYNAMEDIA_ASSESSMENT" >> $SYNAMEDIA_ASSESSMENT_ENV_FILE
echo "SWAGGER_ENABLED=true" >> $SYNAMEDIA_ASSESSMENT_ENV_FILE
echo "SWAGGER_TITLE=SYNAMEDIA_ASSESSMENT" >> $SYNAMEDIA_ASSESSMENT_ENV_FILE
echo "SWAGGER_VERSION=1.0" >> $SYNAMEDIA_ASSESSMENT_ENV_FILE

docker compose -f docker-compose.yaml build
docker compose -f docker-compose.yaml up -d --remove-orphans