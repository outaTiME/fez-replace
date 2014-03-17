Hacking (aka Contributing)
==========================

If you're here, it's because you're interested in contributing code to
Fez. That's great! Here are a few (loose) guidelines to follow before you submit
your pull request:

* Follow existing formatting conventions. This means two spaces per indent,
  always use semicolons, and comma last declaration lists. Just look around to
  see how things are done and try to mimic the existing style.
* If you have a line of code with more than four indents (which is pushing it),
  you're doing something wrong. Split your code into well-contained
  functions. As a rule of thumb, a function shouldn't be bigger than your
  head. Literally.
* Add a test for every new feature. To do this, copy an existing test project
  (both its directory and its test file), usually basic/, and add just enough
  code to test your new feature. Try to keep tests lean and orthogonal.

