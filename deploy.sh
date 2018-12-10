#!/bin/sh

jekyll build
cd _site
git init
git remote add origin git@github.com:dmarczydlo/dmarczydlo.github.io.git
git add .
git commit -m "init commit"
git push -u -f origin master

cd ..
echo "DONE"