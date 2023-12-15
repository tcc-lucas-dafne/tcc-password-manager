#!/bin/bash
npm audit --json > npm-audit-report.json

if grep -q '"vulnerabilities":\{[^0]\}' npm-audit-report.json; then
    echo "Vulnerabilities found:"
    jq -r '.advisories | to_entries[] | "\(.key): \(.value.title) (\(.value.severity))"' npm-audit-report.json
    npm audit fix --force

    exit 1 
else
    echo "No vulnerabilities found."
fi
