if (typeof process.env.JEST === "undefined") {
  require('../../stylesheets/application.scss');
}
require('../shared/init');
import React from 'react';
import Router from 'react-router';
import routes from '../shared/routes';

import performRouteHandlerStaticMethod from '../shared/performRouteHandlerStaticMethod';


import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../shared/reducers';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const promiseMW = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action);
  }

  return Promise.resolve(action).then(store.dispatch);
};
const dispatchMW = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action);


const reducer = combineReducers(reducers);
let createStoreWithMiddleware = applyMiddleware(promiseMW, dispatchMW)(createStore);
let store = createStoreWithMiddleware(reducer);

let history = createBrowserHistory();
let targetEl = document.getElementById('main');
React.render(
  (
  <Provider store={store}>
    {() => <Router history={history}>{routes}</Router>}
  </Provider>
  )
  , targetEl
);


// Router.run(routes, Router.HistoryLocation, (Handler, state) => {
//
//   async function run() {
//     /**
//      * Like we did on the server, wait for data to be fetched before rendering.
//      */
//     await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', state);
//
//     React.render(
//       <Provider store={store}>
//         {() => <Handler {...state} />}
//       </Provider>,
//       document.getElementById('main'));
//   }
//
//   /**
//    * Don't gobble errors. (This is the worst feature of promises, IMO.)
//    */
//   run().catch(error => {
//     throw error;
//   });
// });
