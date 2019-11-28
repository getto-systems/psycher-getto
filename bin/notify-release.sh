#!/bin/bash

notify(){
  local url
  local result
  local version

  while getopts :l: OPT; do
    case $OPT in
      l)
        url=$OPTARG
        ;;
    esac
  done

  shift $((OPTIND - 1))

  result=$1
  version=$(.release-version)

  if [ "$url" ]; then
    echo "$result : $version : $channel"
    curl -d '{"type":"release","result":"'"$result"'","channel":"'"$channel"'","version":"'"$version"'"}' "$url"
  fi
}

notify "$@"
