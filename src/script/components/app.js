import React from 'react';
import {Route, Switch} from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import IssuePage from './pages/IssuePage';

/**
 *
 */
class App extends React.Component {
  /**
   * @return {*}
   */
  render() {
    return (
      <Switch>
        <Route path="/:slug" component={IssuePage}/>
        <Route path="/" component={IndexPage}/>
      </Switch>
    );
  }
}

export default App;
