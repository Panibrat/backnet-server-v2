import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';

import reducers from './reducers/index';

import  AnalogInputsPage  from './components/AnalogInputsPage/AnalogInputsPage';
import  AnalogValuePage  from './components/AnalogValuePage/AnalogValuePage';
import  AnalogOutputPage  from './components/AnalogOutputPage/AnalogOutputPage';
import { Menu } from './components/Menu/Menu';

import styles from './Styles.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middeleware = applyMiddleware(
    thunk,
    logger
);
const store = createStore(reducers, composeEnhancers(middeleware));
store.subscribe(function() {
    console.log('state:\n', store.getState());
});

const App = () => (
    <Provider store = {store} >
        <Router>
            <main className={styles.container}>
                <Menu />
                <Switch>
                    <Route path='/analogInputs' component={AnalogInputsPage} />
                    <Route path='/analogOutputs' component={AnalogOutputPage} />
                    <Route path='/analogValues' component={AnalogValuePage} />
                    <Route path='*' component={AnalogInputsPage} />
                </Switch>
            </main>
        </Router>
    </Provider>
);

ReactDom.render(<App />, document.getElementById("app"));

