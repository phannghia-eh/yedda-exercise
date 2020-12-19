import React from 'react'
import {connect} from 'react-redux'

import Header from '../components/layout/header'
import classess from 'classnames'

export default function (Component) {
  class Layout extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        sideBarMenuClose: false
      }
    }

    render() {
      if (this.props.location === '/82937hf89hfggag0a8g7300aega0g03ga40g')
        return <Component/>
      else return (
        <div
          className={classess('page-header-fixed page-sidebar-closed-hide-logo page-footer-fixed', {'page-sidebar-closed': this.state.sideBarMenuClose})}
          style={{background: '#e9ecf3'}}>
          <Header/>
          <div className="clearfix"/>
          {/*<Sidebar/>*/}
          <div className='page-container'>
            <Sidebar sideBarMenuClose={this.state.sideBarMenuClose}/>

            <div className="page-content-wrapper">
              <div className="page-content" style={{"marginLeft": "170px"}}>
                <Component {...this.props}/>
              </div>
            </div>

            <div className='page-footer'>
              <div className='page-footer-inner'>
                2019 Ⓒ VCopyright
              </div>
            </div>
          </div>
        </div>
      )
    }
  }

  const mapStateToProps = state => ({...state});

  return connect(mapStateToProps)(Layout)
}