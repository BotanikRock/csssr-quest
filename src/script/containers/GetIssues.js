import Component from '../components/GetIssues';
import {getIssues} from '../actions/IssuesActions';
import {connect} from 'react-redux';

const mapStateToProps = (store) => {
  const {issues: {repoName, isRequesting}} = store;

  return {
    repoName, isRequesting,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getIssues: (repoName) => dispatch(getIssues(repoName)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
