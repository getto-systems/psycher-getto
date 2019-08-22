#!/bin/bash

notify(){
  local url
  local result

  while getopts :l: OPT; do
    case $OPT in
      l)
        url=$OPTARG
        ;;
    esac
  done

  shift $((OPTIND - 1))

  result=$1

  if [ "$url" ]; then
    echo "$result : $channel / $timestamp"
    curl -d '{"source":"gitlab","result":"'"$result"'","channel":"'"$channel"'","timestamp":"'"$timestamp"'"}' "$url"
  fi
}

notify "$@"
