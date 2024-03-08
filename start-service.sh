#!/bin/bash

function error_command() {
    echo "no such command $command"
    help
}

function help() {
    echo "usage:"
    echo "  run:"
    echo "    $0 db               - start PostgreSQL database"
    echo "  stop:"
    echo "    $0 stop             - stop all docker-services"
}

function start_database() {
    echo "Starting database service"
    docker-compose -f ./database/postgres.yml up -d
}

function stop_services() {
    echo "Stopping all services"
    docker-compose -f ./database/postgres.yml down
}

# Check if the script is run from the git root directory
if [[ $PWD != $(git rev-parse --show-toplevel) ]]; then
    echo "This script must be run from the root directory of the repository"
    exit 1
fi

command=${1:-}

case $command in
    db) start_database ;;
    stop) stop_services ;;
    -h) help ;;
    --help) help ;;
    *) error_command ;;
esac
