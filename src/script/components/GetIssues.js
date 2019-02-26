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
    const {isRequesting, isError, error} = this.props;

    if (!isRequesting && !isError) {
      return null;
    }

    const params = {class: 'main-form__alert'};

    if (isRequesting) {
      params.text = 'Идёт запрос...';
      params.class += ' main-form__alert--process';
    }

    if (isError) {
      params.text = error;
      params.class += ' main-form__alert--error';
    }

    return (<div className={params.class}>{params.text}</div>);
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

      additionalComponent =
        <button className="main-form__submit" type="submit">Поиск</button>;
    }

    return (
      <div className="main-form__inner">
        <input className="main-form__input" {...inputParams}/>
        {additionalComponent}
      </div>
    );
  }

  /**
   * @return {*}
   */
  render() {
    const inputID = 'repoName';

    const input = this.getInput(inputID);

    return (
      <form className="main-form" onSubmit={this.handleSearch}>
        <label className="main-form__label" htmlFor={inputID}>
          Введите имя репозитория
        </label>
        {input}
        {this.getStatus()}
      </form>
    );
  }
}

export default GetIssues;
