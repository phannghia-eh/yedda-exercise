import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Modal, Table} from "reactstrap";
import {changeStateBasketModal} from "../actions/basket";

class Basket extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpenModal: false
    }
  }

  render() {
    const { basket, dispatch } = this.props
    return (
      <Modal show={true} onHide={() => dispatch(changeStateBasketModal(false))}>
        <Modal.Header closeButton>
          <Modal.Title>Basket Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {
              basket.items.map((item, key)=>{
                return (
                  <tr>
                    <th>{key}</th>
                    <th>{item.name}</th>
                    <th>{item.price}</th>
                    <th>{item.waranty}</th>
                  </tr>
                )
              })
            }
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary'>Checkout</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(Basket)