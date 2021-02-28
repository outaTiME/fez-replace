# fez-replace

[![Build Status](https://img.shields.io/travis/outaTiME/fez-replace.svg)](https://travis-ci.org/outaTiME/fez-replace)
[![Version](https://img.shields.io/npm/v/fez-replace.svg)](https://www.npmjs.com/package/fez-replace)
![Prerequisite](https://img.shields.io/badge/node-%3E%3D10-blue.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: outa7iME](https://img.shields.io/twitter/follow/outa7iME.svg?style=social)](https://twitter.com/outa7iME)

> Replace text patterns with [applause](https://github.com/outaTiME/applause).

## Install

From NPM:

```shell
npm install fez-replace --save-dev
```

## Usage

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

## Options

Supports all the applause [options](https://github.com/outaTiME/applause#options).

## Examples

### Basic

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

```javascript
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {
  spec.with('src/manifest.appcache').one(function (file) {
    spec.rule(file, 'build/manifest.appcache', replace({
      patterns: [
        {
          match: 'timestamp',
          replacement: Date.now()
        }
      ]
    }));
  });
};

fez(module);
```

### Multiple matching

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
  Site: https://www.outa.im
  Twitter: @outa7iME
  Contact: afalduto at gmail dot com
  From: Buenos Aires, Argentina

/* SITE */
  Last update: @@timestamp
  Standards: HTML5, CSS3, robotstxt.org, humanstxt.org
  Components: H5BP, Modernizr, jQuery, Bootstrap, LESS, Jade, Grunt
  Software: Sublime Text, Photoshop, LiveReload

```

fez.js:

```javascript
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
          replacement: Date.now()
        }
      ]
    }));
  });
};

fez(module);
```

### Cache busting

File `src/index.html`:

```html
<head>
  <link rel="stylesheet" href="/css/style.css?rel=@@timestamp">
  <script src="/js/app.js?rel=@@timestamp"></script>
</head>
```

fez.js:

```javascript
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {
  spec.with('src/index.html').one(function (file) {
    spec.rule(file, 'build/index.html', replace({
      patterns: [
        {
          match: 'timestamp',
          replacement: Date.now()
        }
      ]
    }));
  });
};

fez(module);
```

### Include file

File `src/index.html`:

```html
<body>
  @@include
</body>
```

fez.js:

```javascript
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

### Regular expression

File `src/username.txt`:

```
John Smith
```

fez.js:

```javascript
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {
  spec.with('src/username.txt').one(function (file) {
    spec.rule(file, 'build/username.html', replace({
      patterns: [
        {
          match: /(\w+)\s(\w+)/,
          replacement: '$2, $1' // Replaces "John Smith" with "Smith, John"
        }
      ]
    }));
  });
};

fez(module);
```

### Lookup for `foo` instead of `@@foo`

fez.js:

```javascript
var fez = require('fez');
var replace = require('fez-replace');

exports.default = function (spec) {
  spec.with('src/foo.txt').one(function (file) {
    spec.rule(file, 'build/foo.txt', replace({
      patterns: [
        {
          match: /foo/g, // Explicitly using a regexp
          replacement: 'bar'
        }
      ]
    }));
    spec.rule(file, 'build/foo.txt', replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      usePrefix: false // Using the option provided
    }));
    spec.rule(file, 'build/foo.txt', replace({
      patterns: [
        {
          match: 'foo',
          replacement: 'bar'
        }
      ],
      prefix: '' // Removing the prefix manually
    }));
  });
};

fez(module);
```


## Related

- [applause](https://github.com/outaTiME/applause) - Human-friendly replacements

## License

MIT © [outaTiME](https://outa.im)
