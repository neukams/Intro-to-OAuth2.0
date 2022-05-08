# 493-assignment6-oauth

## Sources Cited

Basic HTML Webpage
https://javascript.plainenglish.io/lets-build-a-website-login-page-with-html-css-javascript-and-an-external-api-a083942f797d

OAuth Logo on Landing Page
https://xpertlab.com/wp-content/uploads/2021/07/java_foundation_oauth2_logo.png

Uses Node.js v14x
 - nvm use 14

This code implements a 'Client' that is part of a standard OAuth 2.0 workflow
 - GET request at the base URL '/' simulates a redirect to Google OAuth servers
 - Google server ... does something ...
 - then we ... do something ...


To deploy to GCloud from local WSL env
 - gcloud init
 - gcloud app deploy

To run this codebase on your localhost, ensure to set DB permissions locally. Must be done for each terminal session. This allows you to run locally, and talk to the gcloud database
 - export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"

 keypath is the path & filename of the JSON file from GCloud that authenticates the service account
 see: https://cloud.google.com/docs/authentication/getting-started
 our key_path file: "hw6-gcloud-key.json"

command: export GOOGLE_APPLICATION_CREDENTIALS="assignment-5-gcloud-key.json"