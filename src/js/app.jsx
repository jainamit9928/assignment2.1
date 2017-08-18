import React from 'react'
import RouterComponent from './components/router.component'
import  NavBar from "./components/navbar.component"
import {Provider} from 'react-redux'
import {combineReducers, createStore, applyMiddleware} from 'redux'
import techinfomasterReducer from "./reducers"
import rootSaga from "./sagas/saga.js";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(techinfomasterReducer,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
const App = () => (
  <div>
        <nav>
          <NavBar />
        </nav>
     
    <div className='row'>
      <div className='col-md-12'>
        <main>
          <Provider store={ store }>
          <RouterComponent />
          </Provider>
        </main>
      </div>
   </div>
   </div>


    )
export default App;


