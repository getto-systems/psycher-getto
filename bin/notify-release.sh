#!/bin/bash

notify(){
  local url
  local result

  while getopts :t:l: OPT; do
    case $OPT in
      l)
        url=$OPTARG
        ;;
    esac
  done

  shift $((OPTIND - 1))

  result=$1

  if [ "$url" ]; then
    echo "$result : $channel"
    curl -d '{"type":"release","result":"'"$result"'","channel":"'"$channel"'"}' "$url"
  fi
}

notify "$@"
