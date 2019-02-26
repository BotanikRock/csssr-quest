/* eslint-disable no-invalid-this */
import React from 'react';

/**
 *  @param {*} event
 */
class IssuesOnPageControl extends React.Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);

    this.state = {
      inputValue: this.props.issuesPerPage,
    };
  }

  /**
   * @param {*} value
   */
  fixInputValue(value) {
    value = Number(value);

    const {minIssuesPerPage: min, maxIssuesPerPage: max} = this.props;

    if (!Number.isInteger(value)) {
      value = min;
    }

    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    this.setState({
      inputValue: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.props.isRequesting) {
      return;
    }

    const {inputValue: value} = this.state;

    if (!Number.isInteger(value)) {
      return;
    }

    this.fixInputValue(value);

    this.props.changeIssuesPerPage(value);
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleBlur = (event) => {
    this.fixInputValue(event.target.value);
  }

  /**
   * @return {*}
   */
  render() {
    return (
      <form className="counter-form" onSubmit={this.handleSubmit}>
        <label className="counter-form__label">Элементов:</label>
        <div className="counter-form__wrapper">
          <input className="counter-form__input" type="number"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.state.inputValue}/>
          <button className="counter-form__submit" type="submit">Поменять</button>
        </div>
      </form>
    );
  }
}

export default IssuesOnPageControl;
