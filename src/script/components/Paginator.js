import React from 'react';

/**
 *
 */
class Paginator extends React.Component {
  /**
   * @param {*} event
   */
  onChangePage = (event) => {
    const page = Number(event.target.value);

    this.props.getPage(page);
  }

  /**
   * @return {*}
   */
  render() {
    const {selectedPage, pageCount} = this.props;

    if (!pageCount || pageCount < 2) {
      return null;
    }

    const pageOptions = Array(pageCount).
        fill(undefined).
        map((_, index) => {
          const pageNum = index + 1;

          return (<option key={pageNum} value={pageNum}>{pageNum}</option>);
        });

    return (
      <div>
        <select value={selectedPage}
          onChange={this.onChangePage}
          disabled={this.props.isRequesting}>{pageOptions}</select>
      </div>
    );
  }
}

export default Paginator;
