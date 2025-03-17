#!/bin/bash
find . -name "* 2.js" -o -name "* 2.css" | while read file; do
  echo "Suppression de $file"
  rm "$file"
done
