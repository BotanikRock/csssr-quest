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

    const list = issuesListOnPage.length > 0 ?
      <div key="list" className="wrapper">
        <div className="list-container">
          <IssuesList/>
          <div className="list-container__controls">
            {pageCount > 1 ? <Paginator/> : null}
            {issuesCount > 0 ? <IssuesOnPageControl/> : null}
          </div>
        </div>
      </div> : null;

    return [<GetIssues key="form"/>, list];
  }
}

export default connect((store) => store)(IndexPage);
