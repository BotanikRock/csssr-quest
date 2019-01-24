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

    const issuesList = issues.map(({
      number, title, created_at: createdAt,
      user: {
        avatar_url: avatarUrl, login, html_url: url,
      },
    }) =>
      <tr key={number}>
        <td>{number}</td>
        <td>{title}</td>
        <td>{createdAt}</td>
        <td><a href={url}>
          <img src={avatarUrl} height="40" width="40"/><br/>
          {login}
        </a></td>
      </tr>
    );

    return (
      <div>
        <table>
          <tbody>
            <tr key="legend">
              <th>Номер</th>
              <th>Заголовок</th>
              <th>Дата создания</th>
              <th>Автор</th>
            </tr>
            {issuesList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default IssuesList;
