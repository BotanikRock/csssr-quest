import Component from '../components/Paginator';
import {getPage} from '../actions/IssuesActions';
import {connect} from 'react-redux';


const mapStateToProps = (store) => {
  const {issues} = store;
  const {pageNumber, pageCount, isRequesting} = issues;

  return {
    selectedPage: pageNumber,
    pageCount, isRequesting,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPage: (pageNumber) => dispatch(getPage(pageNumber)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);
