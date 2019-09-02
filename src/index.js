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
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    //take every's go here
    yield takeEvery('GET_MOVIES', getMovies)
    yield takeEvery('GET_DETAILS', getDetails)
    yield takeEvery('CHANGE_INFO', changeInfo)
}

//LIST OF SAGAS
//this saga gets the edits from the Edit component
function* changeInfo(action) {
    console.log('change info saga', action.payload);
    let id = action.payload.id
    try {
        let response = yield axios.put(`/api/edit/${id}`, action.payload)
        console.log('saga change info response', response.data);
        yield put({
            type: 'SET_DETAILS',
            payload: response.data.id
        })
    }
    catch (error) {
        console.log('error in change info saga', error);
    }
}

// this saga gets the details for the single clicked movie by using ID from click handler
// on the Details component
function* getDetails(action) {
    console.log('get details saga', action.payload);
    let id = action.payload;
    try {
        let response = yield axios.get(`/api/details/${id}`)
        console.log('saga get details response', response.data);
        yield put({
            type: 'SET_DETAILS',
            payload: response.data
        })
        //ID is held in redux using this saga and attached reducer
        yield put({
            type: 'SET_ID',
            payload: id
        })
    } catch (error) {
        console.log('error in get details saga', error);
    }
}

//this saga gets the full list of movies from the DB and sends to reducer to be sent to Home
function* getMovies(action) {
    try {
        let response = yield axios.get(`/api/movies`)
        console.log('saga get movies response', response.data);
        yield put({
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
// Used to store full list of movies returned from the DB on the Home page
//holds id in redux
const idHolder = (state = 0, action) => {
    switch (action.type) {
        case 'SET_ID':
            return action.payload;
        default:
            return state;
    }
}
//used for movies list on load of homepage
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// used for details of what movie was clicked on Home page for Details
// also used in Edit component
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres for Details component
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
        details,
        idHolder
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
