import React, { Component } from 'react';

class App extends Component {
  state =
  {
    products: [
      { id: 40, name: 'Mediocre Iron Watch', priceInCents: 399 },
      { id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499 },
      { id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999 },
      { id: 43, name: 'Small Aluminum Keyboard', priceInCents: 2500 },
      { id: 44, name: 'Practical Copper Plate', priceInCents: 1000 },
      { id: 45, name: 'Awesome Bronze Pants', priceInCents: 399 },
      { id: 46, name: 'Intelligent Leather Clock', priceInCents: 2999 },
      { id: 47, name: 'Ergonomic Bronze Lamp', priceInCents: 40000 },
      { id: 48, name: 'Awesome Leather Shoes', priceInCents: 3990 },
    ],
    cartItemsList: [],
    item: {},
    amount: 0,
    currentID: 0
    
  }

  changeQuantity = (updatedQuantity) => {
    this.setState(
      {
        amount: updatedQuantity
      }
    )
  }

  changeItem = (updatedItem) => {
    let newProduct = {}
    this.state.products.forEach(item => {
      if (item.name === updatedItem) {
        newProduct = item
      }
    })
    this.setState(
      {
        item: newProduct
      }
    )
  }


  addItem = (e) => {
    e.preventDefault()

    const amount = this.state.amount
    const item = this.state.item
    const ID = this.state.currentID

    let appendObject = {}

    if (amount !== 0 && item !== {}) {
      appendObject = {
        id: ID,
        product: item,
        quantity: amount
      }
      this.setState(
        {
          currentID: this.state.currentID + 1,
          cartItemsList: this.state.cartItemsList.concat(appendObject)
        }
      )
    }   
  }

  render() {
    return (
      <div className="App">
        <CartHeader
        />
        <CartItems 
          list={this.state.cartItemsList}
        />
        <Form 
          list={this.state.products}
          addItem={this.addItem}
          changeQuantity={this.changeQuantity}
          changeItem={this.changeItem}
        />
        <CartFooter
          copyright="2018"
        />
      </div>
    );
  }
}

const CartItems = ({list = []}) => {
  let cartItemsList = list.map((item) => {
    return (
      <CartItem 
        key={item.id}
        product={item.product}
        name={item.product.name}
        priceInCents={item.product.priceInCents}
        quantity={item.quantity}
      />
    )
  })
  let total = list.reduce((acc, item) => {
    return acc + item.product.priceInCents * item.quantity
  }, 0)
  total = (total/100).toFixed(2)

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

        <div className="list-group-item">
          <div className="row">
            <div className="col-sm-8">Total Cost</div>
            <div className="col-sm-2">${total}</div>
            <div className="col-sm-2"></div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

const CartItem = ({name, priceInCents, quantity}) => {
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col-sm-8">{name}</div>
        <div className="col-sm-2">${(priceInCents / 100).toFixed(2)}</div>
        <div className="col-sm-2">{quantity}</div>
      </div>
    </div>
  )

}

const Form = ({list, addItem, changeQuantity, changeItem}) => {
  let formOptions = list.map((item, index) => {
    return (
      <FormOption 
        key={index}
        product={item}
      />
    )
  })

  return (
    <div className="container">
      <form onSubmit={addItem}>
        <div className="form-group">
          <label htmlFor="quantityInput">Quantity</label>
          <input type="number" className="form-control" id="quantityInput" placeholder="Enter the # of items" min="1" onChange={(e) => changeQuantity(e.target.value)}></input>
        </div>
        <div className="form-group">
          <label htmlFor="productInput">Products</label>
          <select className="form-control" id="productInput" defaultValue="Please Select an Item" onChange={(e) => changeItem(e.target.value)}>
            <option disabled>Please Select an Item</option>

            {formOptions}

          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Item</button>

      </form>
    </div>
  )
}

const FormOption = ({product}) => {
  return(
    <option 
      product ={product}
      value={product.name}
      id={product.id}
    >
      {product.name}  -  -  -  ${(product.priceInCents / 100).toFixed(2)}
    </option>
  )
}

const CartHeader = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="/#">Shopping Cart</a>
    </nav>
  )
}

const CartFooter = ({copyright}) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/#">&copy; {copyright}</a>
    </nav>
  )
}

export default App;
