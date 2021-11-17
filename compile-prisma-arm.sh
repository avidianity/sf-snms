#!/usr/bin/sh

if [ ! -d "$HOME/prisma/bin" ]; then
    echo "Creating prisma libraries directory"
    mkdir "$HOME/prisma/bin" -p
fi

if [ ! -x "$(command -v wget)" ]; then
    echo "Downloading wget"
    sudo apt install wget > /dev/null
fi

INTROSPECTION_ENGINE="$HOME/prisma/bin/introspection-engine"
LIBQUERY_ENGINE="$HOME/prisma/bin/libquery_engine.so"
MIGRATION_ENGINE="$HOME/prisma/migration-engine"
PRISMA_FMT="$HOME/prisma/bin/prisma-fmt"
QUERY_ENGINE="$HOME/prisma/bin/query-engine"

if [ ! -e "$INTROSPECTION_ENGINE" ]; then
    echo "Downloading prisma introspection engine"
    wget "https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/introspection-engine" -O "$INTROSPECTION_ENGINE"
fi

if [ ! -e "$LIBQUERY_ENGINE" ]; then
    echo "Downloading prisma libquery engine"
    wget "https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/libquery_engine.so" -O "$LIBQUERY_ENGINE"
fi

if [ ! -e "$MIGRATION_ENGINE" ]; then
    echo "Downloading prisma migration engine"
    wget "https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/migration-engine" -O "$MIGRATION_ENGINE"
fi

if [ ! -e "$PRISMA_FMT" ]; then
    echo "Downloading prisma fmt"
    wget "https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/prisma-fmt" -O "$PRISMA_FMT"
fi

if [ ! -e "$QUERY_ENGINE" ]; then
    echo "Downloading prisma query engine"
    wget "https://github.com/pantharshit00/prisma-rpi-builds/releases/download/3.2.1/query-engine" -O "$QUERY_ENGINE"
fi

echo "Making binaries executable"
chmod +x "$INTROSPECTION_ENGINE"
chmod +x "$MIGRATION_ENGINE"
chmod +x "$PRISMA_FMT"
chmod +x "$QUERY_ENGINE"

echo "Compiling prisma done"

exit 0
