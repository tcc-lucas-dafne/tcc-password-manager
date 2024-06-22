#!/bin/bash

github_workspace=$1
repository_name=$2
ref_name=$3

git clone "https://x-access-token:$TOKEN_GIT@github.com/tcc-lucas-dafne/$NAME_REPO_GIT" $NAME_REPO_GIT
cd $NAME_REPO_GIT
git checkout develop

current_date=$(date +%d-%m-%Y)
mkdir -p reports/zap_full_scan/$current_date

export TZ=America/Sao_Paulo
hour=$(date +'%d-%m-%Y_%H-%M-%S')
mv $github_workspace/report_json.json $github_workspace/report_json_$hour.json
cp $github_workspace/report_json_$hour.json reports/zap_full_scan/$current_date/

git add reports/zap_full_scan/$current_date/report_json_$hour.json
git add .
git commit -m "Adicionando relatório no repositório $repository_name $ref_name [skip ci]"
git push origin develop