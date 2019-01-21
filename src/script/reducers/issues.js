import {
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_FAIL,
} from '../actions/IssuesActions';

const initialState = {
  repoName: '',
  issuesListOnPage: [],
  pageNumber: 1,
  issuesPerPage: 10,
  maxIssuesPerPage: 100,
  minIssuesPerPage: 10,

  issuesCount: 0,
  pageCount: 0,

  isRequesting: false,
  isError: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ISSUES_REQUEST:
      return {...state, isRequesting: true, isError: false};
    case GET_ISSUES_SUCCESS:
      const {payload} = action;
      const {issuesCount, issuesPerPage} = payload;
      const pageCount = Math.ceil(issuesCount / issuesPerPage);

      return {...state, ...payload, pageCount,
        isRequesting: false, isError: false};
    case GET_ISSUES_FAIL:
      return {...state,
        isRequesting: false, isError: true};
    default:
      return state;
  }
};

export default reducer;
