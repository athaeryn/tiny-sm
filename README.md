# TinySM

A tiny state machine that doesn't worry about where you came from or where
you're going.


## Installation

```sh
$ npm install tiny-sm
```

## Example Usage

```js
let sm1 = new TinySM({
  foo: (x) => console.log(x)
});

sm1.to("foo", 42);
// 42


let sm2 = new TinySM({
  foo: {
    enter: () => console.log("Entering foo."),
    exit:  () => console.log("Exiting foo.")
  },
  bar: () => console.log("Entering bar.")
});

sm2.to("foo");
// "Entering foo."

sm2.to("bar");
// "Exiting foo."
// "Entering bar."

sm2.to("foo");
// "Entering foo."
```
