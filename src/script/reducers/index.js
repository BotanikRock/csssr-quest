import {combineReducers} from 'redux';
import issuesReducer from './issues';


const reducers = combineReducers({
  issues: issuesReducer,
});

export default reducers;
