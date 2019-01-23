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

  /**
   *
   * @param {*} prevProps
   * @param {*} prevState
   */
  componentDidUpdate(prevProps) {
    const {repoName: prevRepo} = prevProps;
    const {repoName: currentRepo} = this.props;

    if (prevRepo !== currentRepo) {
      this.setState({
        inputValue: currentRepo,
      });
    }
  }

  handleChange = (event) => {
    const inputValue = event.target.value;

    this.setState({
      inputValue,
    });

    const lastChar = inputValue.slice(-1);

    if (lastChar === '/') {
      this.props.getRepoListByUser(inputValue.slice(0, -1));
    }
  }

  handleProposeChoose = (event) => {
    const repoName = event.target.value;

    this.props.getIssues(repoName);
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
   * @param {*} id
   * @return {*}
   */
  getInput(id) {
    const hasProposesRepos = this.props.proposedRepos.length > 0;

    const inputParams = {
      id, value: this.state.inputValue, disabled: this.props.isRequesting,
    };

    let additionalComponent;

    const datalistId = 'repos';

    if (hasProposesRepos) {
      inputParams.onChange = this.handleProposeChoose;
      inputParams.list = datalistId;

      additionalComponent =
        <datalist id={datalistId}>
          {this.props.proposedRepos.map((repo, index) =>
            <option key={index} value={repo}/>)}
        </datalist>;
    } else {
      inputParams.onChange = this.handleChange;

      additionalComponent = <button type="submit">Поиск</button>;
    }

    return [<input {...inputParams}/>, additionalComponent];
  }

  /**
   * @return {*}
   */
  render() {
    const inputID = 'repoName';

    const input = this.getInput(inputID);

    return (
      <form onSubmit={this.handleSearch}>
        <label htmlFor={inputID}>Имя репозитория</label>
        {input}
        {this.getStatus()}
      </form>
    );
  }
}

export default GetIssues;
