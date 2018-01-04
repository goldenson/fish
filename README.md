# Wes Bos react course 

## Started from the bottom

Use https://github.com/facebookincubator/create-react-app as a boiler plate to get set up quickly.

## Thinking and understanding react components

A component is a reusable piece of your website.
React will update the data of a component everywhere on the page where this data is rendered.

### Creating our first component

```js
import React from 'react';

class StorePicker extends React.Component {
  render() {
    return <p>Hello</p>;
  }
}

export default StorePicker;
```

```js
// Need to path to absolute path otherwise it will pick up things inside node modules directory
import StorePicker from './components/StorePicker';

render(<StorePicker/>, document.querySelector('#main'));
```

### Writing HTML with JSX

- Use `className` for defining class in your JSX.

- You can only ever `return` one parent element.

- All html tags that do not have a closing tags should autoclose themselves.
```js
<input type="text" required placeholder="Store Name"/>
```
- Special syntax for comments inside JSX: `{/* Hello */}`, never put it below `render()`

### Loading CSS into our React Application

`import './css/style.css'`

### Creating our application layout with component

1. Import react
2. class MyComponent extends React.Component
3. render ()
4. return ()
5. export default MyComponent;
5. import MyComponent from './MyComponent'

### Passing dynamic data with props

```js
<Header name="max">
...
this.props.name
```

Using the react console, click on your component then go to your console and type `$r` to debug it.

### Stateless functional components

Use it when you are just rendering components using props without performing actions on it.

```js
cons Header = (props) => {
  return(
    ...
  )
}

export default Header;
```

### Routing with React Router

```js
import { BrowserRouter, Match, Miss } from 'react-router';


const Root = () => {
  return <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={StorePicker} />
      <Match exactly pattern="/store/:storeId" component={App} />
      <Miss component={NotFound} />
    </div>
    </BrowserRouter>;
}

render(<Root/>, document.querySelector('#main'));
```

### Helper and utility functions

Import only what you need, enjoy!

```js
import { getFunName } from '../helpers';

<input type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
```

### Working with React Events

Render methods are bound to the actual class that you are in.
Meaning you can use this inside the render method.

If you are creating your own class methods, you can not reference `this` inside.
Use a constructor to have access to it. Or we can use `@autobind`.

```js
constructor() {
  super();
  this.goToStore = this.goToStore.bind(this);
}

goToStore(event) {
  event.preventDefault(); // Stop the form to submitting
  console.log(this); // This is now accessible in our function
}

<form className="store-selector" onSubmit={this.goToStore}>

// OR bind it in your method call

<form className="store-selector" onSubmit={this.goToStore.bind(this)}>

// OR with an arrow function

<form className="store-selector" onSubmit={(e) => this.goToStore(e)}>
```

Stay away from touching the dom as much as possible.

Use function reference to bind data to your component.

```js
<input type="text" required placeholder="Store Name" defaultValue={getFunName()}
  ref={input => { this.storeInput = input; }} />
``` 

### All about React Router

We already learned about `props` and `states`.
Lets talk about context. It allows us to declare something at a top level and make it available to anybody at a lower level.
In our example, a `Router` needs to be pass down from the parent all the way down.

It uses `html` files push states, the page does not reload and all the assets are already loaded on the page.


```js
goToStore(event) {
  event.preventDefault(); // Stop the form to submitting
  const storeID = this.storeInput.value;
  this.context.router.transitionTo(`/store/${storeID}`);
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}
```

### Understanding state

State is a representation of all of the data in our application.
Each component can have its own state.
One object that contains all of the data related to a piece of our application.

Your state is always tie to a specific component. Each component can have its own state but we can also share the data between component.

#### How do we use state?

1. Get initial state

```js
  constructor() {
    super();
    this.state = {
      fishes: {},
      order: {}
    };
  }
```

2. Get a copy of your state then update the state

```js
constructor() {
  super();

  this.addFish = this.addFish.bind(this);

  this.state = {
    fishes: {},
    order: {}
  };
}

addFish(fish) {
  // Get a copy of your state
  const fishes = {...this.state.fishes}
  // Add a fish
  const timestamp = Date.now();
  fishes[`fish-${timestamp}`] = fish;
  // Update your state
  this.setState({ fishes });
}
```

3. Pass down a props in a lower component

```js
<Inventory addFish={this.addFish} />

<AddFishForm addFish={this.props.addFish}/>

createFish(event) {
  ...
  this.props.AddFish(fish);
  ...
}
```

### Loading data into state onclik

Pass down a `props` to a lower component to be able to call a method in a higher component.

```js
import sampleFishes from '../sample-fishes'
...

...
this.loadSamples = this.loadSamples.bind(this);

...
loadSamples() {
  this.setState({
    fishes: sampleFishes
  })
}

...
<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />

...
<button onClick={this.props.loadSamples}>Load sample Fishes</button>
```

### Displaying state with JSX

Use an unique `key` when you loop through a collection.
Use `Object.keys` to loop through a state collection.

```js
{
  Object
    .keys(this.state.fishes)
    .map(key => <Fish key={key} details={this.state.fishes[key]} />)
}
```

### Updating order state

**Dont ever touch the key of a React component.**
Pass down a method to a lower component by sending it via props.

### Diplaying order state with JSX

Sometimes we can create our own render function when the one from react gets to big.
Dont forget to bind it in your constructor if you want to use `this` inside your function.

```js
this.renderOrder = this.renderOrder.bind(this);

...

renderOrder(key) {
  const fish = this.props.fishes[key];
  const count = this.props.order[key];

  if (!fish || fish.status === 'unavailable') {
    return <li key={key}>Sorry, {fish ? fish.name : 'fish'} is no longer available!</li>
  }

  return(
    <li key={key}>
      <span>{count}lbs {fish.name}</span>
      <span className="price">{formatPrice(count * fish.price)}</span>
    </li>
  )
}

...

{orderIds.map(this.renderOrder)}
```

### Persisting our state with Firebase

One giant object database in real time made by google.

Lets talk about React lifecycle:

When a component is being mounted or rendered there is different entry points where we can hook into and do various things like AJAX requests or connecting to firebase in our example ...

Create a `base.js` file:

```js
import Rebase from 're-base';

const base = Rebase.createClass({
  apiKey: "lefngwoigilsngorbnfrsugeg",
  authDomain: "fish-react-603e1.firebaseapp.com",
  databaseURL: "https://fish-react-603e1.firebaseio.com",
});

export default base;
```

Use react hooks to sync states:

```js
componentWillMount() {
  this.ref = base.syncState(`${this.props.params.storeId}/fishes`,
    {
      context: this,
      state: 'fishes'
    }
  );
}

componentWillUnmount() {
  base.removeBinding(this.ref);
}
```

### Bugs

- setting price to “free” renders “$NaN”
- and no default image