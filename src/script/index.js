import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';
import createStore from './helpers/store';
import reducers from './reducers';
import middlewares from './middlewares';
import App from './components/app';

const store = createStore(reducers, middlewares);

render(
    <Router>
      <Provider store={store}>
        <App/>
      </Provider>
    </Router>,
    document.getElementById('root')
);
