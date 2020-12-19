import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, ButtonGroup, Card, CardBody, CardImg, CardText, Col, Container, Row} from "reactstrap";
import {fetchProductList} from "../actions/product";
import {addProductToCart, fetchCurrentBasket} from "../actions/basket";
import Basket from "./basket";

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchProductList())
    this.props.dispatch(fetchCurrentBasket())
  }

  render() {
    let {product, dispatch} = this.props
    return (
      <main role='main'>
        {/*<Basket/>*/}
        <div className='album py-5 bg-light'>
          <Container>
            <Row>
              {
                product.items.map((item, key) => {
                  return (
                    <Col md='4' sm='6' lg='3' key={key}>
                      <Card className='mb-4 box-shadow'>
                        <CardImg
                          top
                          width='100%'
                          src={item.image}
                        />
                        <CardBody>
                          <CardText>{item.description}</CardText>
                          <CardText>Available: {item.stock}</CardText>
                          <div className='d-flex justify-content-between align-items-center'>
                            <p className='text-muted text-center mt-auto mb-auto'>{item.price}</p>
                            <ButtonGroup>
                              <Button
                                outline
                                color='secondary'
                                size='sm'
                                onClick={() => dispatch(addProductToCart(item))}
                              >
                                Add to cart
                              </Button>
                            </ButtonGroup>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  )
                })
              }
            </Row>
          </Container>
        </div>
      </main>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})

export default connect(mapStateToProps)(Dashboard)