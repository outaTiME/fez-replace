# fez-replace

> Replace text patterns with a given replacement using [pattern-replace](https://github.com/outaTiME/pattern-replace).



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

exports.build = function (spec) {

  spec.with('**/*.html').each(function (file) {
    spec.rule(file, replace({
      patterns: [
        {
        match: 'foo',
        replacement: 'bar'
        }
      ]
    }));
  });

};

exports.default = exports.build;

fez(module);
```

### Options

#### patterns
Type: `Array`

Define patterns that will be used to replace the contents of source files.

> Check out [pattern-replace](https://github.com/outaTiME/pattern-replace#patterns) documentation for more details.

#### variables
Type: `Object`

This is the old way to define patterns using plain object (simple variable lookup mechanism and no regexp support), you can still using but for more control you should use the new `patterns` way.

> Check out [pattern-replace](https://github.com/outaTiME/pattern-replace#variables) documentation for more details.

#### prefix
Type: `String`
Default: `@@`

The prefix added for matching (prevent bad replacements / easy way).

> Check out [pattern-replace](https://github.com/outaTiME/pattern-replace#prefix) documentation for more details.

#### usePrefix
Type: `Boolean`
Default: `true`

If set to `false`, we match the pattern without `prefix` concatenation (useful when you want to lookup an simple string).

> Check out [pattern-replace](https://github.com/outaTiME/pattern-replace#useprefix) documentation for more details.

#### preservePrefix
Type: `Boolean`
Default: `false`

If set to `true`, we preserve the `prefix` in target.

> Check out [pattern-replace](https://github.com/outaTiME/pattern-replace#preserveprefix) documentation for more details.

#### delimiter
Type: `String`
Default: `.`

The delimiter used to flatten when using object as replacement.

> Check out [pattern-replace](https://github.com/outaTiME/pattern-replace#delimiter) documentation for more details.

## Release History

 * 2014-02-26   v0.0.1   Initial version.

---

Task submitted by [Ariel Falduto](http://outa.im/)
