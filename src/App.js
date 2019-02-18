import React, { Component } from 'react';
// Note: selection = document.querySelector('selection dropdown')
// Note: selection.selectedOptions is an array
// Note: selection.selectedOptions[0] is the first (and only unless multi-select) option
// Note: selection.selectedOptions[0].id will give you corresponding product id

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
    cartItemsList: [
      {id: 1, product: {id: 40, name: 'Mediocre Iron Watch', priceInCents: 399}, quantity: 1},
      {id: 2, product: {id: 41, name: 'Heavy Duty Concrete Plate', priceInCents: 499}, quantity: 2},
      {id: 3, product: {id: 42, name: 'Intelligent Paper Knife', priceInCents: 1999}, quantity: 1}
    ]
    
  }


  addItem = (e) => {
    e.preventDefault()

    const productInput = document.querySelector('#productInput')
    const product = productInput.selectedOptions[0]
    const productID = Number(product.id)

    const amountInput = document.querySelector('#quantityInput')
    const amount = Number(amountInput.value)

    let appendObject = {}

    if (amount && product.id) {
      let productReference = this.state.products.filter(x => x.id === productID)[0]
      appendObject =
      {
        id: this.state.cartItemsList.length,
        product: productReference,
        quantity: amount
      }
    }
    console.log(appendObject)
    this.setState((prevState) => ({cartItemsList: this.state.cartItemsList.concat(appendObject)}))
    
  }

  render() {



    return (
      <div className="App">
        <CartHeader />
        <CartItems list={this.state.cartItemsList}/>
        <Form list={this.state.products} addItem={this.addItem}/>
        <CartFooter copyright="2018"/>
      </div>
    );
  }
}

const CartItems = ({list = []}) => {
  let cartItemsList = list.map((item) => {
    return (
      <CartItem key={item.id} product={item.product} name={item.product.name} priceInCents={item.product.priceInCents} quantity={item.quantity} />
    )
  })
  console.log(list)
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

const Form = ({list, addItem}) => {
  let formOptions = list.map((item, index) => {
    return (
      <FormOption key={index} product={item}/>
    )
  })

  return (
    <div className="container">
      <form onSubmit={addItem}>
        <div className="form-group">
          <label htmlFor="quantityInput">Quantity</label>
          <input type="number" className="form-control" id="quantityInput" placeholder="Enter the # of items" min="1"></input>
        </div>
        <div className="form-group">
          <label htmlFor="productInput">Products</label>
          <select className="form-control" id="productInput" defaultValue="Please Select an Item">
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
    <option value={product.name} id={product.id}>{product.name}  -  -  -  ${(product.priceInCents / 100).toFixed(2)}</option>
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
