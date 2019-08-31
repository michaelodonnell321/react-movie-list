import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import {takeEvery, put} from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    //take every's go here
    yield takeEvery('GET_MOVIES', getMovies)
    yield takeEvery('GET_DETAILS', getDetails)
}

//LIST OF SAGAS
function* getDetails(action) {
    console.log('get details saga', action.payload);
    let id = action.payload;
    try {
        let response = yield axios.get(`/api/details/${id}`)
        console.log('saga get details response', response.data);
        yield put ({
            type: 'SET_DETAILS',
            payload: response.data
        })
    } catch (error) {
        console.log('error in get details saga', error);
    }
}

function* getMovies(action) {
    try {
        let response = yield axios.get(`/api/movies`)
        console.log('saga get movies response', response.data);
        yield put ({
            type: 'SET_MOVIES',
            payload: response.data
        })
    } catch (error) {
        console.log('error in get movies saga:', error);
    }
}
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

//////////////////////////////////////////////

// REDUCERS HERE
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();
