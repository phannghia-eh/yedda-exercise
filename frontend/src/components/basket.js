import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Button, ButtonGroup, Table} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"
import {fetchProductList} from "../actions/product";
import {fetchCurrentBasket, removeProduct} from "../actions/basket";
import history from "../history";

class Basket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpenModal: false
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchProductList())
    this.props.dispatch(fetchCurrentBasket())
  }

  render() {
    const {basket, product, dispatch} = this.props
    const items = this.mergeProducts(basket.items, product.items)
    return (
      <Fragment>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th className='text-center'>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Cost</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            items.map((item, key) => {
              return (
                <tr>
                  <th className='text-center'>{key + 1}</th>
                  <th>{item.name}</th>
                  <th>{item.price}</th>
                  <th>{item.waranty}</th>
                  <th>${(Number.parseFloat(item.price.slice(1)) * item.waranty).toFixed(2)}</th>
                  <th><Button className='alert-danger' onClick={() => dispatch(removeProduct(item.id))}>Remove</Button></th>
                </tr>
              )
            })
          }
          </tbody>
          <tfoot>
          <tr>
            <th colSpan={4} className='text-center'>Total</th>
            <th>${this.calculateTotalCost(items)}</th>
          </tr>
          </tfoot>
        </Table>
        <ButtonGroup>
          <Button>Check out</Button>
          <Button onClick={() => history.goBack()}>Back</Button>
        </ButtonGroup>
      </Fragment>
    )
  }

  mergeProducts(basket, products) {
    return basket.map(item => {
      const product = products.find(i => i.id === item.product_id)
      return Object.assign({...product}, {waranty: item.waranty})
    })
  }

  calculateTotalCost(items) {
    if (items.length === 0)
      return 0
    return items.reduce((sum = 0, item) => {
      return +sum + (Number.parseFloat(item.price.slice(1)) * item.waranty)
    }, 0).toFixed(2)
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(Basket)