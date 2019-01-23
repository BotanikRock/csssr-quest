import Component from '../components/IssuesOnPageControl';
import {changeIssuesPerPage} from '../actions/IssuesActions';
import {connect} from 'react-redux';


const mapStateToProps = (store) => {
  const {issues} = store;
  const {
    issuesPerPage, maxIssuesPerPage, minIssuesPerPage, isRequesting,
  } = issues;

  return {
    issuesPerPage, maxIssuesPerPage, minIssuesPerPage, isRequesting,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeIssuesPerPage: (issuesPerPage) =>
    dispatch(changeIssuesPerPage(issuesPerPage)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);

