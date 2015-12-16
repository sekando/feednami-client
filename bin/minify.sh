#!/bin/sh
cp src/feednami-client.js releases/$1.js
uglifyjs src/feednami-client.js --mangle --compress > releases/$1.min.js