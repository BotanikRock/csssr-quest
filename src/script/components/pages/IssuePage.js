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
      <div className="wrapper article">
        <Link to='/' className='top-button'>На главную</Link>
        <h1 className="article__title">{title}</h1>
        <p className="article__body">{body}</p>
      </div>
    );
  }
}

export default connect((store) => (store))(IssuePage);
