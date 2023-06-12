#!/bin/sh

(cd .appfairy && unzip *.zip)

node_modules/.bin/appfairy

for f in src/{scripts,styles,views}/* public/css/*; do
  sed -i 's/af-class-//g' $f
done

for f in src/views/*View.js; do
  sed -i 's/alt$/alt=""/g' $f
  sed -i '/madeBy=document\.createComment/d' $f
done
