#!/bin/bash

github_workspace=$1
repository_name=$2
ref_name=$3

git clone "https://x-access-token:$TOKEN_GIT@github.com/tcc-lucas-dafne/$NAME_REPO_GIT" $NAME_REPO_GIT
cd $NAME_REPO_GIT
git checkout develop

current_date=$(date +%d-%m-%Y)
mkdir -p reports/$TOOL_NAME/$current_date

export TZ=America/Sao_Paulo
hour=$(date +'%d-%m-%Y_%H-%M-%S')
mv $github_workspace/$REPORT_NAME.$REPORT_FORMAT $github_workspace/$REPORT_NAME_$hour.$REPORT_FORMAT
cp $github_workspace/$REPORT_NAME_$hour.$REPORT_FORMAT reports/$TOOL_NAME/$current_date/

git add reports/$TOOL_NAME/$current_date/$REPORT_NAME_$hour.$REPORT_FORMAT
git add .
git commit -m "Adicionando relatório no repositório $repository_name $ref_name [skip ci]"
git push origin develop