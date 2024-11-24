DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
PROJECT_ROOT=$DIR/..

cd $PROJECT_ROOT

docker compose -f docker-compose.yaml down