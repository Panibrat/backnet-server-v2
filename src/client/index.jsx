import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import { LightsPage } from './components/Pages/LightsPage';
import reducers from './store/reducers/index';
import Layout from './components/Layout/Layout';
import { HeatFloorsPage } from './components/Pages/HeatFloorsPage';
import { HeatingRadiatorsPage } from './components/Pages/HeatingRadiatorsPage';
import { AhuPage } from './components/Pages/AHU';
import { DampersPage } from './components/Pages/Dampers';
import { BoilerPage } from './components/Pages/BoilerPage';
import { HeatStationPage } from './components/Pages/HeatStationPage';
import { ConsumptionPage } from './components/Pages/ConsumptionPage';
import ChartPage from './components/Chart/ChartPage/ChartPage';
import ConsumptionChart from './components/Chart/ConsumptionChart/ConsumptionChart';
import PlansPage from './components/Pages/PlansPage/PlansPage';
import { FirstFloorItem } from './components/Pages/PlansPage/FirstFloorItem';
import { SecondFloorItem } from './components/Pages/PlansPage/SecondFloorItem';
import Gates from './components/Pages/Gates/Gates';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middeleware = applyMiddleware(
    thunk,
    // logger
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
          <Switch>
            <Route path="/hf" component={HeatFloorsPage} />
            <Route path="/so" component={HeatingRadiatorsPage} />
            <Route path="/dampers" component={DampersPage} />
            <Route path="/air-unit" component={AhuPage} />
            <Route path="/boiler" component={BoilerPage} />
            <Route path="/heat-station" component={HeatStationPage} />
            <Route path="/consumption" component={ConsumptionPage} />
            <Route path="/chart" component={ChartPage} />
            <Route path="/consumption-chart" component={ConsumptionChart} />
            <Route path="/plans" component={PlansPage} />
            <Route path="/1-floor" component={FirstFloorItem} />
            <Route path="/2-floor" component={SecondFloorItem} />
            <Route path="/gates" component={Gates} />
            <Route path="/lights" component={LightsPage} />
            <Route path="*" component={PlansPage} />
          </Switch>
        </Layout>
      </React.Fragment>
    </Router>
  </Provider>
);

ReactDom.render(<App />, document.getElementById('app'));
