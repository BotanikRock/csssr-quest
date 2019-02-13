import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

/**
 *
 */
class IssuePage extends React.Component {
  /**
   * @return {*}
   */
  render() {
    const {body, title} = this.props.location.state.issue;

    return (
      <div><Link to='/'>На главную</Link>
        <h1>{title}</h1>
        <p>{body}</p></div>
    );
  }
}

export default connect((store) => (store))(IssuePage);
