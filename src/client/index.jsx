import * as React from "react";
import * as ReactDom from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';

import CssBaseline from '@material-ui/core/CssBaseline';

import reducers from './reducers/index';

import Layout from './components/Layout/Layout';
import AnalogInputsPage from './components/AnalogInputsPage/AnalogInputsPage';
import AnalogValuePage from './components/AnalogValuePage/AnalogValuePage';
import AnalogOutputPage from './components/AnalogOutputPage/AnalogOutputPage';
import BinaryInputPage from './components/BinaryInputPage/BinaryInputPage';
import BinaryOutputPage from './components/BinaryOutputPage/BinaryOutputPage';
import BinaryValuePage from "./components/BinaryValuePage/BinaryValuePage";
import { AllPointsPage } from './components/AllPointsPage/AllPointsPage';

import HeatFloorRightPage from './components/Pages/HeatFloorRight/HeatFloorRight';
import HeatingRadiatorsRightPage from './components/Pages/HeatingRadiatorsRightPage/HeatingRadiatorsRightPage';
import AhuPage from './components/Pages/AHU/AhuPage';
import DampersPage from './components/Pages/Dampers/DampersPage';

import { Menu } from './components/Menu/Menu';

import styles from './Styles.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middeleware = applyMiddleware(
    thunk,
    //logger
);
export const store = createStore(reducers, composeEnhancers(middeleware));
store.subscribe(function() {
    // console.log('state:\n', store.getState());
});

const App = () => (
    <Provider store={store}>
        <Router>
            <React.Fragment>
                <CssBaseline />
                <Layout>
                    <Menu/>
                    <Switch>
                        <Route path="/analogInputs" component={AnalogInputsPage} />
                        <Route path="/analogOutputs" component={AnalogOutputPage} />
                        <Route path="/analogValues" component={AnalogValuePage} />
                        <Route path="/binaryInputs" component={BinaryInputPage} />
                        <Route path="/binaryOutputs" component={BinaryOutputPage} />
                        <Route path="/binaryValues" component={BinaryValuePage} />
                        <Route path="/hf-right" component={HeatFloorRightPage} />
                        <Route path="/so-right" component={HeatingRadiatorsRightPage} />
                        <Route path="/dampers" component={DampersPage} />
                        <Route path="/air-unit" component={AhuPage} />
                        <Route path="/allPoints" component={AllPointsPage} />
                        <Route path="*" component={AnalogInputsPage} />
                    </Switch>
                </Layout>
            </React.Fragment>
        </Router>
    </Provider>
);

ReactDom.render(<App />, document.getElementById("app"));
