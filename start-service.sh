#!/bin/bash

function error_command() {
    echo "no such command $command"
    help
}

function help() {
    echo "usage:"
    echo "  run:"
    echo "    $0 db               - start PostgreSQL database"
    echo "    $0 manage_db        - start a PostgreSQL terminal session"
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

function manage_db() {
    # Check if the database container is running
    db_container=$(docker-compose -f ./database/postgres.yml ps -q db)
    if [ -z "$db_container" ] || ! docker ps -q --no-trunc | grep -q "^$db_container$"; then
        echo "Database container is not running. Run 'db' first before accessing the data."
        return
    fi

    echo "Starting PostgreSQL terminal session..."
    docker-compose -f ./database/postgres.yml exec db psql -U postgres
}

# Check if the script is run from the git root directory
if [[ $PWD != $(git rev-parse --show-toplevel) ]]; then
    echo "This script must be run from the root directory of the repository"
    exit 1
fi

command=${1:-}

case $command in
    db) start_database ;;
    manage_db) manage_db ;;
    stop) stop_services ;;
    -h) help ;;
    --help) help ;;
    *) error_command ;;
esac
