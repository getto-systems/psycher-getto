#!/bin/bash

notify(){
  local url
  local repository
  local result
  local image

  if [ ! -f push_latest_success ]; then
    echo "there is no push_latest_success file"
    return
  fi

  while getopts :r:l: OPT; do
    case $OPT in
      l)
        url=$OPTARG
        ;;
      r)
        repository=$OPTARG
        ;;
    esac
  done

  shift $((OPTIND - 1))

  result=$1
  image=$repository:$tag

  if [ "$url" ]; then
    echo "$result : $channel / $image"
    curl -d '{"type":"push_latest","image":"'"$image"'","result":"'"$result"'","channel":"'"$channel"'"}' "$url"
  fi
}

notify "$@"