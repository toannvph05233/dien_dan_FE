// reducers/index.js
import { combineReducers } from 'redux';
import dataReducer from './dataReducer';

const rootReducer = combineReducers({
    data: dataReducer,
});

export default rootReducer;
