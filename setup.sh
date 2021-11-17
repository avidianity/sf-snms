#!/usr/bin/sh

echo 'Pre-setup configuration'

if [ ! -x "$(command -v node)" ]; then
    echo 'Node does not exist, installing...'
    if [ ! -x "$(command -v nvm)"]; then
        curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh" | bash
        export NVM_DIR="$HOME/.nvm"
        . "$NVM_DIR/nvm.sh"
    fi
    nvm install --lts
fi

if [ -x "$(command -v yarn)" ]; then
    echo 'Yarn exists, skipping...'
else
    echo 'Installing yarn'
    npm install -g yarn > /dev/null
fi

# Client

echo 'Changing directory to client'
cd client

echo 'Create environment variables'
cp .env.example .env

echo 'Installing client dependencies'
echo 'NOTE: Installation can take long depending on internet connection, please dont close unexpectedly'
yarn > /dev/null

echo 'Client setup done'

echo 'Changing directory to server'
cd ../server

echo 'Create environment variables'
cp .env.example .env

echo 'Installing client dependencies'
echo 'NOTE: Installation can take long depending on internet connection, please dont close unexpectedly'
yarn > /dev/null

echo 'Updating prisma client'
yarn add --dev prisma@latest > /dev/null
yarn add @prisma/client@latest > /dev/null

echo 'Generating prisma artifacts'
yarn prisma generate > /dev/null

echo 'Server setup done'

exit 0
