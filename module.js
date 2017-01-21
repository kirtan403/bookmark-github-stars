/* jshint esversion: 6 */
/* jshint node: true */
"use strict";

const rp = require('request-promise');
const linkParser = require('parse-link-header');
const netscape = require('netscape-bookmarks');

let result = {};

// getAllStartedRepos('kirtan403');

/*
 *  fetch all the starred repos for the mentioned user
 */
module.exports = {
    getAllStarredRepos: function(githubUser, callback) {

        // start with page 1
        getStarredPageData(1);

        // this function will call it self until we get all the repos
        function getStarredPageData(pageNo) {

            //console.log('fetching data for page no ' + pageNo);

            rp({
                    uri: 'https://api.github.com/users/' + githubUser + '/starred?per_page=100&page=' + pageNo,
                    headers: {
                        'User-Agent': 'Request-Promise'
                    },
                    resolveWithFullResponse: true
                })
                .then(function(response) {

                    let json = JSON.parse(response.body);

                    // push everything to result
                    for (var i = 0; i < json.length; i++) {
                        result[json[i].name] = json[i].html_url;
                    }

                    // check if we need to parse again
                    let linkHeader = linkParser(response.headers.link);
                    // console.log(linkHeader);

                    if (linkHeader.next) {
                        // get next page
                        getStarredPageData(linkHeader.next.page);
                    } else {
                        // done with the data
                        console.log('Fetching all URLs completed');
                        //console.log(result);
                        var html = generateHtmlExportFile(result);
                        callback(null, html);
                    }
                })
                .catch(function(err) {
                    // Crawling failed...
                    console.error("err: " + err);
                    callback(err, null);
                });
        }
    }
};

function generateHtmlExportFile(bookmarks) {
    var html = netscape(bookmarks);
    console.log(html);
    return html;
}
