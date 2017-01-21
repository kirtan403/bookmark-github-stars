# Github Stars as bookmarks

This retrieves github starred repos' URLs of a given user and exports them as HTML bookmarks export file, so that you can import it to your browser or your any favorite online bookmarking sites which supports HTML file imports.

# Usage

**Tip:** Head over to https://kirtan403.github.io/bookmark-github-stars/ and get started.

To use this in a `node`, use `module.js` file, require the module file and use `getAllStarredRepos` function:

```
getAllStarredRepos('username-here',function(err,html) {
    if(err) {
        console.log("Error: " + err);
    }

    // You have your bookmarks html content in html variable
    // You can save it or use it however you like
  });
```

For using this in `browser`, we have converted this module using browserify.
Just download `bookmark-github-stars-browser.js` file and use it the same way you may use with node. After including this with script tag, you can use this with like this:

```
<script type="text/javascript" src="bookmark-github-stars-browser.js"></script>

<script>
bookmarkGithubStars.getAllStarredRepos(user, function(err, data) {

    if (err) {
        // An error
        console.log("There is an error");
        return;
    }

    // You have your bookmarks html content in html variable
    // You can save it or use it however you like

});
</script>
```

Check `index.html` for example.

# Build

The main file is `module.js` which contains the source code.

To generate the browser js file, use the below code.

If you do not have `browserify` install, download it first, else skip this step.
```
npm install -g browserify
```

Now generate `bookmark-github-stars-browser.js` using `module.js` file:
```
browserify module.js --standalone bookmarkGithubStars -o bookmark-github-stars-browser.js
```

Done.
