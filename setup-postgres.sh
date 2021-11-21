#!/usr/bin/sh

sudo apt update

sudo apt install postgresql postgresql-contrib

. "./server/.env"

sudo -u postgres createuser "$DATABASE_USERNAME"

sudo -u postgres createdb "$DATABASE_NAME"

sudo su -c "psql -c \"ALTER USER $DATABASE_USERNAME WITH ENCRYPTED PASSWORD '$DATABASE_PASSWORD';\"" postgres
sudo su -c "psql -c \"ALTER USER $DATABASE_USERNAME CREATEDB;\"" postgres

sudo su -c "psql -c \"GRANT ALL PRIVILEGES ON DATABASE $DATABASE_NAME TO $DATABASE_USERNAME;\"" postgres
