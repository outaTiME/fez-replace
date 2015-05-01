# fez-replace [![Build Status](https://secure.travis-ci.org/outaTiME/fez-replace.png?branch=master)](http://travis-ci.org/outaTiME/fez-replace)

> Replace text patterns with [applause](https://github.com/outaTiME/applause).



## Install

From NPM:

```shell
npm install fez-replace --save-dev
```

## Replace Filter

Assuming installation via NPM, you can use `fez-replace` in your script like this:

```javascript
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {

  spec.with('src/index.html').one(function (file) {
    spec.rule(file, 'build/index.html', replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ]
    }));
  });

};

fez(module);
```

### Options

@@options

### Usage Examples

#### Basic

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

fez.js:

```js
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {

  spec.with('src/manifest.appcache').one(function (file) {
    spec.rule(file, 'build/manifest.appcache', replace({
      patterns: [
        {
          match: 'timestamp',
          replacement: new Date().getTime()
        }
      ]
    }));
  });

};

fez(module);
```

#### Multiple matching

File `src/manifest.appcache`:

```
CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

File `src/humans.txt`:

```
              __     _
   _    _/__  /./|,//_`
  /_//_// /_|///  //_, outaTiME v.@@version

/* TEAM */
  Web Developer / Graphic Designer: Ariel Oscar Falduto
  Site: http://www.outa.im
  Twitter: @outa7iME
  Contact: afalduto at gmail dot com
  From: Buenos Aires, Argentina

/* SITE */
  Last update: @@timestamp
  Standards: HTML5, CSS3, robotstxt.org, humanstxt.org
  Components: H5BP, Modernizr, jQuery, Twitter Bootstrap, LESS, Jade, Grunt
  Software: Sublime Text 2, Photoshop, LiveReload

```

fez.js:

```js
var fez = require('fez');
var replace = require('fez-replace');
var pkg = require('./package.json');

exports.default = function (spec) {

  spec.with(['src/manifest.appcache', 'src/humans.txt']).each(function (file) {
    spec.rule(file, file.patsubst('src/%', 'build/%'), replace({
      patterns: [
        {
          match: 'version',
          replacement: pkg.version
        },
        {
          match: 'timestamp',
          replacement: new Date().getTime()
        }
      ]
    }));
  });

};

fez(module);
```

#### Cache busting

File `src/index.html`:

```html
<head>
  <link rel="stylesheet" href="/css/style.css?rel=@@timestamp">
  <script src="/js/app.js?rel=@@timestamp"></script>
</head>
```

fez.js:

```js
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {

  spec.with('src/index.html').one(function (file) {
    spec.rule(file, 'build/index.html', replace({
      patterns: [
        {
          match: 'timestamp',
          replacement: new Date().getTime()
        }
      ]
    }));
  });

};

fez(module);
```

#### Include file

File `src/index.html`:

```html
<body>
  @@include
</body>
```

fez.js:

```js
var fs = require('fs');
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {

  spec.with('src/index.html').one(function (file) {
    spec.rule(file, 'build/index.html', replace({
      patterns: [
        {
          match: 'include',
          replacement: fs.readFileSync('./includes/content.html', 'utf8')
        }
      ]
    }));
  });

};

fez(module);
```

#### Regular expression

File `src/username.txt`:

```
John Smith
```

fez.js:

```js
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {

  spec.with('src/username.txt').one(function (file) {
    spec.rule(file, 'build/username.html', replace({
      patterns: [
        {
          match: /(\w+)\s(\w+)/,
          replacement: '$2, $1' // replaces "John Smith" to "Smith, John"
        }
      ]
    }));
  });

};

fez(module);
```

#### Lookup for `foo` instead of `@@foo`

fez.js:

```js
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {

  spec.with('src/foo.txt').one(function (file) {

    // option 1 (explicitly using an regexp)
    spec.rule(file, 'build/foo.txt', replace({
      patterns: [
        {
          match: /foo/g,
          replacement: 'bar'
        }
      ]
    }));

    // option 2 (easy way)
    spec.rule(file, 'build/foo.txt', replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      usePrefix: false
    }));

    // option 3 (old way)
    spec.rule(file, 'build/foo.txt', replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      prefix: '' // remove prefix
    }));

  });

};

fez(module);
```

## Release History

 * 2015-05-01   v0.3.0   Update to [applause](https://github.com/outaTiME/applause) v0.4.0.
 * 2014-10-10   v0.2.0   Escape regexp when matching type is `String`.
 * 2014-06-10   v0.1.5   Remove node v.8.0 support and third party dependencies updated.
 * 2014-04-20   v0.1.4   JSON / YAML / CSON as function supported. Readme updated (thanks [@milanlandaverde](https://github.com/milanlandaverde)).
 * 2014-03-23   v0.1.3   Readme updated.
 * 2014-03-22   v0.1.2   Modular core renamed to [applause](https://github.com/outaTiME/applause). Performance improvements. Expression flag removed. New pattern matching for CSON object. More test cases, readme updated and code cleanup.
 * 2014-03-21   v0.1.1   Test cases in Mocha, readme updated and code cleanup.
 * 2014-03-17   v0.1.0   New [pattern-replace](https://github.com/outaTiME/pattern-replace) modular core for replacements.
 * 2014-02-26   v0.0.1   Initial version.

---

Task submitted by [Ariel Falduto](http://outa.im/)
