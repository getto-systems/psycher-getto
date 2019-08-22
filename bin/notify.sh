#!/bin/bash

notify(){
  local notify_type
  local url
  local result

  while getopts :t:l: OPT; do
    case $OPT in
      t)
        notify_type=$OPTARG
        ;;
      l)
        url=$OPTARG
        ;;
    esac
  done

  shift $((OPTIND - 1))

  result=$1

  if [ "$url" ]; then
    echo "$result : $channel / $timestamp"
    curl -d '{"type":"'"$notify_type"'","result":"'"$result"'","channel":"'"$channel"'","timestamp":"'"$timestamp"'"}' "$url"
  fi
}

notify "$@"
