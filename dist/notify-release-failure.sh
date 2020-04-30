#!/bin/bash

notify(){
  local url
  local channel
  local version
  local result

  url=$1
  channel=$2
  version=$3
  result=failure

  if [ "$url" ]; then
    echo "$result : $version : $channel"
    curl -d '{"type":"release","result":"'"$result"'","channel":"'"$channel"'","version":"'"$version"'"}' "$url"
  fi
}

notify "$@"
