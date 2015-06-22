#!/bin/sh

SOURCE_BRANCH='source'
DEPLOY_BRANCH='deploy'

git config --get user.name
if [ $? -ne 0 ]; then
  git config user.name $GIT_NAME
  git config user.email $GIT_EMAIL
fi

node_modules/.bin/gulp
git checkout -b $DEPLOY_BRANCH --track origin/$DEPLOY_BRANCH
mv build/* .
git add -A
git commit -m "Automatic build"
git checkout $SOURCE_BRANCH

if [ $TRAVIS_PULL_REQUEST -ne 0 ]; then
  git remote set-url --push origin https://github.com/friendsofrobinsonstatepark/friendsofrobinsonstatepark.github.io.git
  git remote set-branches --add origin $DEPLOY_BRANCH
  git fetch -q
  git config credential.helper "store --file=.git/credentials"
  echo "https://$GH_TOKEN:@github.com" > .git/credentials
  git push -f origin $DEPLOY_BRANCH:$DEPLOY_BRANCH
  rm .git/credentials
fi
