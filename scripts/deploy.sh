#!/bin/bash

deploy_main(){
  local version
  local domain

  version=$(cat .release-version)
  domain=trellis.getto.systems/psycher/getto

  deploy_to_s3 $domain
  deploy_to_cloudformation
}
deploy_to_s3(){
  local target
  target=$1; shift

  aws s3 cp \
    --acl private \
    --cache-control "public, max-age=31536000" \
    --recursive \
    dist s3://$target/$version
}

deploy_to_cloudformation(){
  template=config/template.yaml
  packaged=config/packaged-template.yaml

  stack=$CLOUDFORMATION_STACK
  region=$CLOUDFORMATION_REGION
  bucket=$LAMBDA_BUCKET

  AWS_ACCESS_KEY_ID=$(cat $AWS_ACCESS_KEY)
  AWS_SECRET_ACCESS_KEY=$(cat $AWS_SECRET_KEY)

  # workaround : timestamp error
  find . -type f | xargs touch

  aws cloudformation package \
    --template-file $template \
    --output-template-file $packaged \
    --s3-bucket $bucket \
    && \
  aws cloudformation deploy \
    --template-file $packaged \
    --region $region \
    --stack-name $stack \
    && \
  :
}

deploy_main
