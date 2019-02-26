import React from 'react';
import {Link} from 'react-router-dom';

/**
 *
 */
class IssuesList extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.cellNames = ['Номер', 'Заголовок', 'Дата создания', 'Автор'];
  }


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
    }) => {
      const cells = [number,
        <Link to={{
          pathname: `/${title.toLowerCase().replace(/ /g, '-')}`,
          state: {issue: {body, title}},
        }}>{title}</Link>,
        new Date(createdAt).toUTCString(),
        <a href={url}>
          <img src={avatarUrl} height="40" width="40"/><br/>
          {login}
        </a>,
      ];

      return (<tr className="issue-list__row issue-item" key={number}>
        {cells.map((cell, i) => <td key={i} className="issue-list__cell"
          data-title={this.cellNames[i]}>{cell}</td>)}
      </tr>);
    });

    return (
      <table className="issue-list">
        <tbody>
          <tr className="issue-list__legend" key="legend">
            {this.cellNames.map((name, i) => <th className="issue-list__th" key={i}>{name}</th>)}
          </tr>
          {issuesList}
        </tbody>
      </table>
    );
  }
}

export default IssuesList;
