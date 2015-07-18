/* eslint-env node */

var fs = require('fs');
// var Feed = require('feed'); // to create feed objects and write them out
// var feedmerger = new require('./feedmerger.js').feedmerger; // our module to merge several feeds into one. Includes additional dependencies
var escapeMD = require('./escape-markdown.js').escapeMarkdown; // our module to escape markdown control characters
// var async = require('async'); // asyncjs for async stuff

exports.pagewriter = function(cat, jsonFeed) {
  'use strict';

  var theFeed = jsonFeed;
  var category = cat;
  console.log(category);

  var theOutput = '---\n' +
    'layout: page\n' +
    'title: Mathblogging.org | Category: "' + category + '"\n' +
    '---\n\n' // +
  ;

  var addEntries = function(resultFeed) {
    //   console.log(resultFeed.title);
    var newPart = '\n## ' + resultFeed.title + '\n\n';
    for (var i in resultFeed.items) {
      if (i > 9) {
        break;
      }
      var item = resultFeed.items[i];
      //     console.log(item.title);
      newPart += '* ' + '**' + escapeMD(item.author[0].name) + '**' + ' [' + escapeMD(item.title) + '](' + item.link + ')\n';
    }
    return newPart;
  };

  var doTheRest = function(feed) {
    theOutput += addEntries(feed);
    fs.writeFile('./mathblogging.org/' + category + '.md', theOutput);
    //   build out markdown now!
  };

  doTheRest(theFeed);
  // console.log(theFeed.render('atom-1.0'));
  return true;
  //end module
};