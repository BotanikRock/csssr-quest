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
  getStatus() {
    if (!this.props.isRequesting && !this.props.isError) {
      return null;
    }

    if (this.props.isRequesting) {
      return (<div>Идёт запрос...</div>);
    }

    if (this.props.isError) {
      return (<div>Упс! Что-то пошло не так...</div>);
    }
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
        {this.getStatus()}
      </form>
    );
  }
}

export default GetIssues;
