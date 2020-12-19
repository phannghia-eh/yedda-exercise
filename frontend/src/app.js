import React from 'react'
import {Route} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Dashboard from "./components/dashboard";
import Basket from "./components/basket";
import {withRouter} from "react-router-dom";
import Header from "./components/layout/header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarMenuClose: false,
      routes: [
        {name: 'Dashboard', exact: true, path: '/', component: Dashboard},
      ]
    };
  }

  getRoutes() {
    return this.state.routes.map((r, i) => {
      return <Route
        key={i}
        name={r.name}
        path={r.path}
        exact={r.exact}
        render={props => <r.component key={props.location.pathname} {...props}/>}
      />
    });
  }

  render() {
    return (
      <div>
        <Header/>
        {this.getRoutes()}
        <Basket/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default withRouter(connect(mapStateToProps)(App))