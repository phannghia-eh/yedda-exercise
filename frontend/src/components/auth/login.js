import React, {Component} from 'react';
import '../../assets/css/icons/icomoon/styles.css'
import '../../assets/css/bootstrap.css'
import '../../assets/css/core.css'
import '../../assets/css/components.css'
import '../../assets/css/colors.css'
import {connect} from "react-redux";
import {login, verifyAccessToken} from "../../actions/basket";
import {ToastContainer} from 'react-toastify'
import {Link} from "react-router";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(verifyAccessToken())
  }

  handleChangeUsername(e) {
    this.setState({
      username: this.refs.username.value
    })
  }

  handleChangePassword(e) {
    this.setState({
      password: this.refs.password.value
    })
  }

  handleOnSubmit(e) {
    e.preventDefault()
    this.props.dispatch(login(this.state.username, this.state.password))
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
                      <h5 class="content-group">Login to your account <small
                        class="display-block"></small></h5>
                    </div>

                    <div class="form-group has-feedback has-feedback-left">
                      <input type="text" class="form-control" placeholder="Username"
                             ref="username" onChange={e => this.handleChangeUsername(e)}/>
                      <div class="form-control-feedback">
                        <i class="icon-user text-muted"></i>
                      </div>
                    </div>

                    <div class="form-group has-feedback has-feedback-left">
                      <input type="password" class="form-control" placeholder="Password"
                             ref="password" onChange={e => this.handleChangePassword(e)}/>
                      <div class="form-control-feedback">
                        <i class="icon-lock2 text-muted"></i>
                      </div>
                    </div>

                    <div class="form-group">
                      <button type="submit" class="btn bg-blue-400 btn-block"
                              onClick={e => this.handleOnSubmit(e)}>Sign in <i
                        class="icon-circle-right2 position-right"></i></button>
                      <div className='text-center'>
                        <Link to='/register'>Register new account</Link>
                      </div>
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
    state: state.auth.state,
  }
}

export default connect(mapStateToProps)(Login)