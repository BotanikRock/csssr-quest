import Component from '../components/IssuesList';
import {connect} from 'react-redux';


const mapStateToProps = (store) => {
  const {issues} = store;
  const {issuesListOnPage, issuesPerPage} = issues;

  return {
    issues: issuesListOnPage,
    issuesPerPage,
  };
};

export default connect(mapStateToProps)(Component);
