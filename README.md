# babel-plugin-transform-jsx-ref-to-function

> Replace string value of the ref attribute to function.

## Example

**In**
```js
<button ref="button">Some button</button>
```

**Out**
```js
<button ref={el => this['button'] = el}>Some button</button>
```

## Installation

```sh
$ npm i --save-dev babel-plugin-transform-jsx-ref-to-function
```

Add this to you babel config plugins

```javascript
plugins: [
    'babel-plugin-transform-jsx-ref-to-function'
]
```
