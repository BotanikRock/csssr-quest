import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './helpers/store';
import reducers from './reducers';
import middlewares from './middlewares';
import App from './components';

const store = createStore(reducers, middlewares);

render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('root')
);
