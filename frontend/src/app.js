import React, {Fragment} from 'react'
import {Route} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import Dashboard from "./components/dashboard";
import Basket from "./components/basket";
import Layout from "./hoc/layout";
import {withRouter} from "react-router-dom";
import Header from "./components/header";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideBarMenuClose: false,
      routes: [
        {name: 'Dashboard', exact: true, path: '/', component: Layout(Dashboard)},
        {name: 'Basket', exact: true, path: '/basket', component: Layout(Basket)}
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
      <Fragment>
        <Header/>
        {this.getRoutes()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default withRouter(connect(mapStateToProps)(App))