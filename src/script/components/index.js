import React from 'react';
import {connect} from 'react-redux';
import GetIssues from '../containers/GetIssues';
import IssuesList from '../containers/IssuesList';
import Paginator from '../containers/Paginator';
import IssuesOnPageControl from '../containers/IssuesOnPageControl';

/**
 *
 */
class App extends React.Component {
  /**
   * @return {*}
   */
  render() {
    const {issues: {issuesCount, pageCount, issuesListOnPage}} = this.props;

    return (
      
      <div>
        <GetIssues/>
        {issuesCount > 0 ? <IssuesOnPageControl/> : null}
        {issuesListOnPage.length > 0 ? <IssuesList/> : null}
        {pageCount > 1 ? <Paginator/> : null}
      </div>
    );
  }
}

export default connect((store) => store)(App);
