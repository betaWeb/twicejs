# TwiceJS

Manage duplicates, count item occurences, dedupe an Array, in an easy way.

<br><br>


## Getting started

### Installation
To install TwiceJS, you just have to download `TwiceJS.min.js` in the `dist` folder and add a script into your HTML page :
```HTML
<script src="path/to/TwiceJS.min.js"></script>
```

Or, if you prefer, you can use TwiceJS via NPM (or Yarn) :
```bash
# Use with npm
$ npm install --save @betaweb/twicejs

# Use with yarn
$ yarn add @betaweb/twicejs
```


### Basic usage

There are several ways uo use TwiceJS, as you can see in the examples below :
```JS
const iterable = [{id: 1}, {id: 1}, {id: 2}, {id: 1}, {id: 3}, {id: 3}]

/* .: Instanciate via TwiceJS class :. */
let set = new TwiceJS()
set.append(iterable)

// OR

/* .: With Array prototype property `dedupe` :. */
arr.dedupe()

// it instanciates twiceJs under the hood, and exposes the instance in `twiceJs` property
let set = arr.twiceJs


/* .: Below the output :. */
//  dedupe entries
console.log(set.entries)
// > [{"id":1},{"id":2},{"id":3}]

// dedupe entries with occurences count
console.log(set.withCount)
// > [{"id":1,"_count":3},{"id":2,"_count":1},{"id":3,"_count":2}]



/* .: You can mutate the iterable :. */

// Three methods are availables : append, replace and remove
set.remove({id: 1})

console.log(set.withCount)
// > [{"id":2,"_count":1},{"id":3,"_count":2}]

set.append({ id: 2 })
console.log(set.withCount)
// >  [{"id":3,"_count":2},{"id":2,"_count":2}]

set.replace({ id: 2 }, { id: 7 })
console.log(set.withCount)
// >  [{"id":3,"_count":2},{"id":7,"_count":2}]
```
