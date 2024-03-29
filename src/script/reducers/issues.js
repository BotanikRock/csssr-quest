import {
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_FAIL,
  GET_REPOS_REQUEST,
  GET_REPOS_SUCCESS,
  GET_REPOS_FAIL,
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

  proposedRepos: [],

  isRequesting: false,
  isError: false,
  error: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ISSUES_REQUEST:
      return {...state, isRequesting: true, isError: false};
    case GET_ISSUES_SUCCESS:
      const {payload} = action;
      const {issuesCount, issuesPerPage} = payload;
      const pageCount = Math.ceil(issuesCount / issuesPerPage);

      return {...state, ...payload, pageCount, proposedRepos: [],
        isRequesting: false, isError: false};
    case GET_ISSUES_FAIL:
      const {payload: {error: errorIssues}} = action;

      return {...state,
        isRequesting: false, isError: true, error: errorIssues};
    case GET_REPOS_REQUEST:
      return {...state, isRequesting: true, isError: false};
    case GET_REPOS_SUCCESS:
      return {...state, proposedRepos: action.payload,
        isRequesting: false, isError: false};
    case GET_REPOS_FAIL:
      const {payload: {error: errorRepos}} = action;

      return {...state,
        isRequesting: false, isError: true, error: errorRepos};
    default:
      return state;
  }
};

export default reducer;
