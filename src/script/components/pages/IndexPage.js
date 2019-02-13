import React from 'react';
import {connect} from 'react-redux';
import GetIssues from '../../containers/GetIssues';
import IssuesList from '../../containers/IssuesList';
import Paginator from '../../containers/Paginator';
import IssuesOnPageControl from '../../containers/IssuesOnPageControl';

/**
 *
 */
class IndexPage extends React.Component {
  /**
   * @return {*}
   */
  render() {
    const {issues: {issuesCount, pageCount, issuesListOnPage}} = this.props;

    return (
      <div>
        <GetIssues/>
        <div className="wrapper">
          {issuesListOnPage.length > 0 ? <IssuesList/> : null}
          {issuesCount > 0 ? <IssuesOnPageControl/> : null}
          {pageCount > 1 ? <Paginator/> : null}
        </div>
      </div>
    );
  }
}

export default connect((store) => store)(IndexPage);
