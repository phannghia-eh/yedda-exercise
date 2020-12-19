import React, {Component} from 'react';
import {connect} from "react-redux";
import {logout} from "../../actions/basket";
import axios from "axios/index";

class Logout extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['x-api-token']
    this.props.dispatch(logout())
    return null
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(Logout)