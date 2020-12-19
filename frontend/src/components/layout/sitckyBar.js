import {connect} from "react-redux";
import React, {Component} from 'react'
import Socket from '../socket'
import {clearAllCurrentInteractSelectedDevice} from "../../actions/device";

class StickyBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {interact} = this.props.device
    return (
      <div className="fab-menu fab-menu-fixed fab-menu-bottom-right p-5">
        <div className="panel">
          <div className="panel-body text-center">
            <div className="row">
              <div className="col-md-4">
                <p>Selected</p>
              </div>
              <div className="col-md-8">
                <button className="btn btn-default btn-lg">INTERACT</button>
              </div>
            </div>

            <div className='row'>
              <div className="col-md-4">
                <p>{interact.current.length}</p>
              </div>
              <div className="col-md-8">
                <button className="btn btn-info btn-sm" onClick={()=>this.handleOnClearSelectedDevice()}>CLEAR</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleOnClearSelectedDevice() {
    this.props.dispatch(clearAllCurrentInteractSelectedDevice())
  }
}

const mapStateToProps = state => ({
  device: state.device
})

export default connect(mapStateToProps)(StickyBar)