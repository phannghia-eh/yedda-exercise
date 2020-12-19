import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Col, Container, Navbar, Row} from "reactstrap";
import {toast} from "react-toastify";
import {changeStateBasketModal} from "../../actions/basket";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownUser: false
    }
  }

  render() {
    const {basket, dispatch} = this.props
    return (
      <header>
        <Navbar sticky='top' color="dark" dark>
          <Container fluid>
            <Row className='w-100'>
              <Col md={2}/>
              <Col md={8}/>
              <Col className='text-white'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                     onClick={() => dispatch(changeStateBasketModal(true))}
                >
                  <circle cx="10" cy="20.5" r="1"/>
                  <circle cx="18" cy="20.5" r="1"/>
                  <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/>
                </svg> <small>{basket.items.length}</small>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  ...state
});

export default withRouter(connect(mapStateToProps)(Header))