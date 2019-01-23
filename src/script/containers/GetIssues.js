import Component from '../components/GetIssues';
import {getIssues, getRepoListByUser} from '../actions/IssuesActions';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  const {issues: {repoName, proposedRepos, isRequesting, isError}} = store;

  return {
    repoName, isRequesting, isError, proposedRepos,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getIssues: (repoName) => dispatch(getIssues(repoName)),
  getRepoListByUser: (userName) => dispatch(getRepoListByUser(userName)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
