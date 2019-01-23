const GET_ISSUES_REQUEST = 'GET_ISSUES_REQUEST';
const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
const GET_ISSUES_FAIL = 'GET_ISSUES_FAIL';

const GET_REPOS_REQUEST = 'GET_REPOS_REQUEST';
const GET_REPOS_SUCCESS = 'GET_REPOS_SUCCESS';
const GET_REPOS_FAIL = 'GET_REPOS_FAIL';

/**
 *
 */
class Requester {
  /**
   * @param {*} requestInfo
   * @param {*} dispatch
   */
  constructor(requestInfo, dispatch) {
    this.requestInfo = requestInfo;
    this.dispatch = dispatch;
  }
}

/**
 * Чтобы не делать сильную вложенность, как эксперимент сделал класс,
 * при создании экземпляра которого в конуструкторе задается диспатч
 */
class IssueRequester extends Requester {
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

/**
 * На каждый "запрос" по классу, а почему бы нет?
 */
class RepoRequester extends Requester {
  /**
   *
   */
  send() {
    this.dispatch({
      type: GET_REPOS_REQUEST,
    });

    const {userName} = this.requestInfo;

    const url = `https://api.github.com/users/${userName}/repos`;

    fetch(url).then((body) => body.json()).
        then((repoData) => {
          this.handleResponse(repoData);
        });
  }

  /**
   * @param {*} repoData
   */
  handleResponse(repoData) {
    const reposWithIssues = repoData.reduce((acc, repo) => {
      if (repo.open_issues_count < 1) {
        return acc;
      }

      return [...acc, repo.full_name];
    }, []);

    this.dispatch({
      type: GET_REPOS_SUCCESS,
      payload: reposWithIssues,
    });
  }
}


const _requestIssues = (requestInfo, dispatch) => {
  const requester = new IssueRequester(requestInfo, dispatch);

  requester.send();
};

const _requestRepos = (requestInfo, dispatch) => {
  const requester = new RepoRequester(requestInfo, dispatch);

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

const getRepoListByUser = (userName) => (dispatch) => {
  _requestRepos({userName}, dispatch);
};


export {
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_FAIL,
  getIssues,
  getPage,
  changeIssuesPerPage,
  GET_REPOS_REQUEST,
  GET_REPOS_SUCCESS,
  GET_REPOS_FAIL,
  getRepoListByUser,
};
