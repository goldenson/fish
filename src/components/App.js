import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fishes: {},
      order: {}
    };

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
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

  loadSamples() {
    this.setState({
      fishes: sampleFishes
    })
  }

  addToOrder(key) {
    // take a copy of our state
    const order = { ...this.state.order };
    // update or add the new number of fish ordered
    order[key] = order[key] + 1 || 1;
    // update your state
    this.setState({  order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {
              Object
                .keys(this.state.fishes)
                .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
            }
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}/>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
      </div>
    )
  }
}

export default App;
