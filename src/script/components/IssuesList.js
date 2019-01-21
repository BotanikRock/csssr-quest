import React from 'react';

/**
 *
 */
class IssuesList extends React.Component {
  /**
     * @return {*}
     */
  render() {
    const {issues} = this.props;

    if (!issues || issues.length < 1) {
      return null;
    }

    const issuesList = issues.map(({number, title, created_at: createdAt}) =>
      <tr key={number}>
        <td>{number}</td>
        <td>{title}</td>
        <td>{createdAt}</td>
      </tr>
    );

    return (
      <div>
        <table>
          <tbody>
            <tr key="legend">
              <th>1</th>
              <th>2</th>
              <th>3</th>
            </tr>
            {issuesList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default IssuesList;
