#!/usr/bin/sh

echo 'Pre-setup configuration'

if [ ! -x "$(command -v node)" ]; then
    echo 'Node does not exist, installing...'
    rm -rf "$HOME/.nvm"
    curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh" | bash
    export NVM_DIR="$HOME/.nvm"
    . "$NVM_DIR/nvm.sh"
    nvm install --lts
    npm install -g npm
fi

if [ -x "$(command -v yarn)" ]; then
    echo 'Yarn exists, skipping...'
else
    echo 'Installing yarn'
    npm install -g yarn
fi

sh "./setup-prisma-arm.sh"

# Client

echo 'Changing directory to client'
cd client

echo 'Create environment variables'
cp .env.example .env

echo 'Installing client dependencies'
echo "NOTE: Installation can take long depending on internet connection, please don't close unexpectedly"
yarn

echo 'Client setup done'

echo 'Changing directory to server'
cd ../server

echo 'Create environment variables'
cp .env.example .env

echo 'Installing client dependencies'
echo "NOTE: Installation can take long depending on internet connection, please don't close unexpectedly"
yarn

echo 'Updating prisma client'
yarn add --dev prisma@latest
yarn add @prisma/client@latest

echo 'Generating prisma artifacts'
sh "../setup-postgres.sh"
yarn prisma generate
yarn prisma db push

echo 'Server setup done'

cd ../

exit 0
