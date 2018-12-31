import React, { Component } from 'react';


class App extends Component {
  render() {
    return (
      <div className="App">
        <CartHeader />
      </div>
    );
  }
}

const CartHeader = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="#">Shopping Cart</a>
    </nav>
  )
}

export default App;
