import React from 'react';

/**
 * @param {*} event
 */
class GetIssues extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.repoName,
    };
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleSearch = (event) => {
    event.preventDefault();

    if (this.props.isRequesting) {
      return;
    }

    const repoName = this.state.inputValue;

    if (repoName === '' || repoName === this.props.repoName) {
      return;
    }

    this.props.getIssues(repoName);
  }

  /**
   * @return {*}
   */
  render() {
    const inputID = 'repoName';

    return (
      <form onSubmit={this.handleSearch}>
        <label htmlFor={inputID}>Имя репозитория</label>
        <input className="form-control"
          id={inputID}
          onChange={this.handleChange}
          value={this.state.inputValue}/>
        <button type="submit">Поиск</button>
      </form>
    );
  }
}

export default GetIssues;
