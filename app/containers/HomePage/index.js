/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Header from '../../components/Header/Header';
import CandidateForm from '../../components/CandidateForm/CandidateForm';
import './indexStyle.css';
import { getNanional, getCallingCode } from '../../redux/action';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  async componentDidMount() {
    await this.props.getNanional();
    await this.props.getCallingCode();
  }

  render() {
    const { options } = this.props;
    return (
      <div className="Content">
        <Header />
        <CandidateForm
          national={get(options, 'national', [])}
          callingCode={get(options, 'callingCode', [])}
        />
      </div>
    );
  }
}
HomePage.defaultProps = {
  options: {},
};
HomePage.propTypes = {
  options: PropTypes.object,
  getNanional: PropTypes.func,
  getCallingCode: PropTypes.func,
};
export const mapStateToProps = state => ({
  options: state.get('options'),
});

export const mapDispatchToProps = dispatch => ({
  getNanional: () => dispatch(getNanional()),
  getCallingCode: () => dispatch(getCallingCode()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
