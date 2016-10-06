#!/usr/bin/env node

var jsdom = require('jsdom'),
    td2xml = require('./td2xml')(),
    file = process.argv[2];

if (!file) {
  console.log('Usage: xhtml bad.html > good.xhtml');
  process.exit();
}

jsdom.env('',
    (err, window) => {
         var $$$ = require('tripledollar')(window),
             fs = require('fs'),
             div = $$$('div.container');

         $$$.appendToDoc(div)
         .then( () => {
           fs.readFile(file, (err, stream) => {
              if (err) return;
              div.innerHTML = stream.toString();
              var container = $$$.structify($$$.query('.container'));
              console.log(td2xml.parse(container[1]));
            });
         });
    }
);

