import React from 'react'
import {connect} from 'react-redux'
import {Container} from "reactstrap";

export default function (Component) {
  class Layout extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <main role='main'>
          <div className='album py-5 bg-light'>
            <Container>
              <Component/>
            </Container>
          </div>
        </main>
      )
    }
  }

  const mapStateToProps = state => ({...state});

  return connect(mapStateToProps)(Layout)
}