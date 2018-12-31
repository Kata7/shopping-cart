import React, { Component } from 'react';


class App extends Component {
  render() {

    let cartItemsList = 
    [
      {id: 1, product: {id: 40, name: 'Mediocre Iron Watch', priceInCents: 399}, quantity: 1},
      {id: 2, product: {id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499}, quantity: 2},
      {id: 3, product: {id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999}, quantity: 1}
    ]

    return (
      <div className="App">
        <CartHeader />
        <CartItems list={cartItemsList}/>
        <CartFooter copyright="2018"/>
      </div>
    );
  }
}

const CartItems = ({list}) => {
  let cartItemsList = list.map((item) => {
    return (
      <CartItem key={item.id} product={item.product} name={item.product.name} priceInCents={item.product.priceInCents} quantity={item.quantity} />
    )
  })
  return (
    <div className="container">
      <h1>Cart Items</h1>
      <div className="list-group">
        <div className="list-group-item">
          <div className="row">
            <div className="col-sm-8">Product</div>
            <div className="col-sm-2">Price</div>
            <div className="col-sm-2">Quantity</div>
          </div>
        </div>
        
        {cartItemsList}
        
      </div>
    </div>
  )
}

const CartItem = ({key, product, name, priceInCents, quantity}) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-sm-8">{name}</div>
        <div className="col-sm-2">{priceInCents}</div>
        <div className="col-sm-2">{quantity}</div>
      </div>
    </div>
  )

}

const CartHeader = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="#">Shopping Cart</a>
    </nav>
  )
}

const CartFooter = ({copyright}) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="#">&copy; {copyright}</a>
    </nav>
  )
}

export default App;
