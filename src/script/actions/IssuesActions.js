const GET_ISSUES_REQUEST = 'GET_ISSUES_REQUEST';
const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
const GET_ISSUES_FAIL = 'GET_ISSUES_FAIL';

/**
 * Чтобы не делать сильную вложенность, как эксперимент сделал класс,
 * при создании экземпляра которого в конуструкторе задается диспатч
 */
class IssueRequester {
  /**
   * @param {*} requestInfo
   * @param {*} dispatch
   */
  constructor(requestInfo, dispatch) {
    this.requestInfo = requestInfo;
    this.dispatch = dispatch;
  }

  /**
   *
   */
  send() {
    this.dispatch({
      type: GET_ISSUES_REQUEST,
    });

    const {repo, pageNumber, issuesPerPage} = this.requestInfo;

    const [repoOwner, repoName] = repo.split('/');
    const urlRepo = `https://api.github.com/repos/${repoOwner}/${repoName}`;
    const urlIssues = `${urlRepo}/issues?page=${pageNumber}&per_page=${issuesPerPage}`;

    Promise.all([fetch(urlIssues), fetch(urlRepo)]).then((responses) => {
      const responseStatuses = responses.map(({ok}) => ok);
      const responseProceed = responses.map((resp) => resp.json());

      if (responseStatuses.includes(false)) {
        this.handleError(responseProceed);
      } else {
        this.handleResponse(responseProceed);
      }
    });
  }

  /**
   *
   * @param {*} responsePromises
   */
  handleResponse(responsePromises) {
    Promise.all(responsePromises).then((responses) => {
      const {repo, pageNumber, issuesPerPage} = this.requestInfo;

      const payload = responses.reduce((acc, resp) => {
        if (Array.isArray(resp)) {
          return {...acc, issuesListOnPage: resp};
        }

        return {...acc, issuesCount: resp.open_issues_count};
      }, {repoName: repo, pageNumber, issuesPerPage});

      this.dispatch({type: GET_ISSUES_SUCCESS, payload});
    });
  }

  /**
   *
   * @param {*} responsePromises
   */
  handleError(responsePromises) {
    this.dispatch({
      type: GET_ISSUES_FAIL,
    });
  }
};


const _requestIssues = (requestInfo, dispatch) => {
  const requester = new IssueRequester(requestInfo, dispatch);

  requester.send();
};


const getIssues = (repo, pageNumber = 1, issuesPerPage = 10) =>
  (dispatch) => {
    const requestInfo = {repo, pageNumber, issuesPerPage};

    _requestIssues(requestInfo, dispatch);
  };

const getPage = (pageNumber) => (dispatch, getState) => {
  const {issues: {repoName: repo, issuesPerPage}} = getState();

  _requestIssues({repo, pageNumber, issuesPerPage}, dispatch);
};

const changeIssuesPerPage = (issuesPerPage) => (dispatch, getState) => {
  const {issues: {repoName: repo}} = getState();

  _requestIssues({repo, pageNumber: 1, issuesPerPage}, dispatch);
};


export {
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_FAIL,
  getIssues,
  getPage,
  changeIssuesPerPage,
};
