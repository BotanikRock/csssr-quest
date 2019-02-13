import React from 'react';
import {Link} from 'react-router-dom';

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

    const issuesList = issues.map(({
      number, title, created_at: createdAt, body,
      user: {
        avatar_url: avatarUrl, login, html_url: url,
      },
    }) =>
      <tr className="issue-list__row issue-item" key={number}>
        <td>{number}</td>
        <td><Link to={{
          pathname: `/${title.toLowerCase().replace(/ /g, '-')}`,
          state: {issue: {body, title}},
        }}>{title}</Link></td>
        <td>{new Date(createdAt).toUTCString()}</td>
        <td><a href={url}>
          <img src={avatarUrl} height="40" width="40"/><br/>
          {login}
        </a></td>
      </tr>
    );

    return (
      <table className="issue-list">
        <tbody>
          <tr className="issue-list__legend" key="legend">
            <th>Номер</th>
            <th>Заголовок</th>
            <th>Дата создания</th>
            <th>Автор</th>
          </tr>
          {issuesList}
        </tbody>
      </table>
    );
  }
}

export default IssuesList;
