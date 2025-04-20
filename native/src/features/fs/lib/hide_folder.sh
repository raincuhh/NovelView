#!/bin/bash
APPDATA_DIR="./AppData/Local/com.novelview.app"

CACHE_FOLDER="$APPDATA_DIR/_cache"
DATA_FOLDER="$APPDATA_DIR/Data"

if [ -d "$CACHE_FOLDER" ]; then
  # macos
  if [[ "$OSTYPE" == "darwin"* ]]; then
    chflags hidden "$CACHE_FOLDER"
  else
    # linux
    mv "$CACHE_FOLDER" "$APPDATA_DIR/.cache"
  fi
  echo "Cache folder is now hidden"
else
  echo "Cache folder does not exist."
fi

if [ -d "$DATA_FOLDER" ]; then
  # macos
  if [[ "$OSTYPE" == "darwin"* ]]; then
    chflags hidden "$DATA_FOLDER"
  else
    # linux
    mv "$DATA_FOLDER" "$APPDATA_DIR/.data"
  fi
  echo "Data folder is now hidden"
else
  echo "Data folder does not exist."
fi
