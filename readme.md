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
<br>

### Methods & events
#### Methods

> &nbsp;<br>
> TwiceJS.append(`item: Array|Object[]|any`): *TwiceJS*
> <br>&nbsp;
    
Appends an item or a list of items on current collection.
```JS
const dataset = new TwiceJS

const item = {id: 4}
dataset.append(item)
// > [{id: 4}]

// OR

const items = [{id: 4}, {id: 4}, {id: 3}]
dataset.append(items)
// > [{id: 4}, {id: 4}, {id: 3}]
```

<br>

> &nbsp;<br>
> TwiceJS.replace(`oldItem: any`, `newItem: any`): *TwiceJS*
> <br>&nbsp;
    
Replace an item on current collection.
```JS
const data = [{id: 4}, {id: 4}]
const dataset = (new TwiceJS)
    .append(data)

const oldItem = {id: 4}
const newItem = {id: 5}
dataset.replace(oldItem, newItem)
// > [{id: 5}, {id: 5}]
```

<br>

> &nbsp;<br>
> TwiceJS.remove(`item: Array|Object[]|any`): *TwiceJS*
> <br>&nbsp;
    
Remove an item or a list of items on current collection.
```JS
const data = [{id: 4}, {id: 4}, {id: 5}]
const dataset = (new TwiceJS)
    .append(data)

const item = {id: 4}
dataset.remove(item)
// > [{id: 5}]
```

<br>

> &nbsp;<br>
> TwiceJS.isEmpty(): *Boolean*
> <br>&nbsp;
    
Returns true if the collection is empty, false otherwise.
```JS
const data = [{id: 4}, {id: 4}]
const dataset = (new TwiceJS)
    .append(data)

const item = {id: 4}
dataset.remove(item)

dataset.isEmpty() // true
```

<br>

> &nbsp;<br>
> TwiceJS.clear(): *TwiceJS*
> <br>&nbsp;
    
Clear the collection
```JS
const data = [{id: 4}, {id: 4}, {id: 5}]
const dataset = (new TwiceJS)
    .append(data)

dataset.clear()

dataset.isEmpty() // true
```

<br>

> &nbsp;<br>
> TwiceJS.has(`item: Array|Object[]|any`): *Boolean*
> <br>&nbsp;
    
Returns true if the collection contains the searched entry, false otherwise.
```JS
const data = [{id: 4}, {id: 4}, {id: 5}]
const dataset = (new TwiceJS)
    .append(data)

dataset.has({id: 4}) // true
dataset.has({id: 7}) // false
```

<br>

> &nbsp;<br>
> TwiceJS.occurrence(`item: Array|Object[]|any`): *Number*
> <br>&nbsp;
    
Get an entry occurrences count.
```JS
const data = [{id: 4}, {id: 4}, {id: 5}]
const dataset = (new TwiceJS)
    .append(data)

dataset.occurrence({id: 4}) // 2
dataset.occurrence({id: 7}) // 0
```

<br>

> &nbsp;<br>
> TwiceJS.encode(`item: Array|Object[]|any`): *String*
> <br>&nbsp;
    
Encode an entry according the defined `key_encoder` option.
```JS
const dataset = new TwiceJS({
    key_encoder: TwiceJS.ENCODERS.BASE_64
})

dataset.encode({id: 4}) // eyJpZCI6NH0=
```

<br>

> &nbsp;<br>
> TwiceJS.decode(`item: String`): *any*
> <br>&nbsp;
    
Decode an entry according the defined `key_encoder` option.
```JS
const dataset = new TwiceJS({
    key_encoder: TwiceJS.ENCODERS.BASE_64
})

const base64_str = dataset.encode({id: 4}) // eyJpZCI6NH0=
dataset.decode(base64_str) // {id: 4}
```

<br><br>

### Todo

- [x] Add keyify option choice : JSON or base64.
- [ ] Add `.increment(<item>)` (alias of `.append(<items>)`) and `.decrement(<item>)` (alias of `.delete(<item>)`) methods which adds or removes only one occurrency of an entry on the collection, and increment or decrement his count.
- [ ] Rewrite TwiceJS class with TypeScript.
- [ ] Add unit tests.
