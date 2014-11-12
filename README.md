# tiny-sm

This is a tiny JavaScript state machine that doesn't worry about what you're
transitioning to or from.

## Installation

```sh
$ npm install tiny-sm
```

## Example Usage

```js
var TinySM = require("tiny-sm");

sm = new TinySM;
sm.add("foo", console.log.bind(console, "foo"));
sm.to("foo");

// logs "foo"
```
