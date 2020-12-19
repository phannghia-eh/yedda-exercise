import React, {Component} from 'react';
import '../../assets/css/icons/icomoon/styles.css'
import '../../assets/css/bootstrap.css'
import '../../assets/css/core.css'
import '../../assets/css/components.css'
import '../../assets/css/colors.css'
import {connect} from "react-redux";
import {ToastContainer, toast} from 'react-toastify'
import {registration} from "../../actions/basket";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  handleOnSubmit(e) {
    e.preventDefault()
    switch (this.verifyForm()) {
      case 0:
        this.props.dispatch(registration(this.refs.username.value, this.refs.email.value, this.refs.password.value))
        break;
      case 1:
        return toast.warn('RETYPE PASSWORD IS NOT CORRECT')
      case 2:
        return toast.warn('EMAIL IS NOT VALID')
      case 3:
        return toast.warn('USERNAME IS NOT VALID')
      case 4:
        return toast.warn('PASSWORD IS NOT VALID')
    }
  }

  verifyForm() {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (this.refs.password.value != this.refs.reTypePassword.value)
      return 1
    if(!emailRegex.test(this.refs.email.value))
      return 2
    if(!this.refs.username.value)
      return 3
    if(!this.refs.email.value)
      return 4
    return 0
  }

  render() {
    return (
      <div className="login login-container">
        <ToastContainer/>
        <div class="page-container">
          <div class="page-content">
            <div class="content-wrapper">
              <div class="content">
                <form>
                  <div class="panel panel-body login-form">
                    <div class="text-center">
                      <div class="icon-object border-slate-300 text-slate-300"><i
                        class="icon-reading"></i></div>
                      <h4 class="content-group">Register Your Account<small
                        class="display-block">Explore IOT power by youself</small></h4>
                    </div>

                    <div class="form-group has-feedback has-feedback-left">
                      <input type="text" class="form-control" placeholder="Username"
                             ref="username"/>
                      <div class="form-control-feedback">
                        <i class="icon-user text-muted"></i>
                      </div>
                    </div>

                    <div class="form-group has-feedback has-feedback-left">
                      <input type="password" class="form-control" placeholder="Password"
                             ref="password"/>
                      <div class="form-control-feedback">
                        <i class="icon-lock2 text-muted"></i>
                      </div>
                    </div>

                    <div class="form-group has-feedback has-feedback-left">
                      <input type="password" class="form-control" placeholder="Re-type Password"
                             ref="reTypePassword"/>
                      <div class="form-control-feedback">
                        <i class="icon-lock text-muted"></i>
                      </div>
                    </div>

                    <div className="form-group has-feedback has-feedback-left">
                      <input type="text" className="form-control" placeholder="email"
                             ref="email"/>
                      <div className="form-control-feedback">
                        <i className="icon-mail5 text-muted"></i>
                      </div>
                    </div>

                    <div class="form-group">
                      <button type="submit" class="btn bg-blue-400 btn-block"
                              onClick={e => this.handleOnSubmit(e)}>Sign in <i
                        class="icon-circle-right2 position-right"></i></button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    token: state.auth.token,
    state: state.auth.state
  }
}

export default connect(mapStateToProps)(Register)