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

There are several ways uo use TwiceJS, as you can see in the examples below.<br>
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
```

<br>

The main TwiceJS purpuse is to dedupe a collection, and especially an objects collection. You can get the deduped collection with the `.entries` getter.

```JS
//  dedupe entries
console.log(set.entries)
// > [{"id":1},{"id":2},{"id":3}]

```

<br>

You can also dedupe a collection, and get the count of occurrences for each entry with the `.withCount` getter.

```JS
// dedupe entries with occurences count
console.log(set.withCount)
// > [{"id":1,"_count":3},{"id":2,"_count":1},{"id":3,"_count":2}]
```
> The key `_count` can be set by modifying the `count_key` option in TwiceJS's options object passed in parameter on instanciation.


<br>

Now, let see how handle the created collection with TwiceJS.
There are three methods availables with TwiceJS : `append`, `replace` and `remove`.

```JS
// Removes all occurrences of `{id: 1}` on the collection
set.remove({id: 1})

console.log(set.withCount)
// > [{"id":2,"_count":1},{"id":3,"_count":2}]

// Appends an entry
set.append({ id: 2 })
console.log(set.withCount)
// >  [{"id":3,"_count":2},{"id":2,"_count":2}]

// Replaces all occurrences of `{id: 2}` by `{id: 7}`
set.replace({ id: 2 }, { id: 7 })
console.log(set.withCount)
// >  [{"id":3,"_count":2},{"id":7,"_count":2}]
```

<br><br>

### Todo

- [ ] Add a `.delete(<item>)` method which removes only one occurrency of an entry on the collection, and decrement his count.
- [ ] Rewrite TwiceJS class with TypeScript.
