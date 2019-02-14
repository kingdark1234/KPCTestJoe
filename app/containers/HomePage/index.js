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
import {
  getNanional,
  getCallingCode,
  setCandidates,
  getCandidates,
  setCandidatesForm,
  pullOutCandidates,
  deleteAllCandidates,
  selectEditCandidate,
} from '../../redux/action';
import CandidateTable from '../../components/CandidateTable/CandidateTable';

/* eslint-disable react/prefer-stateless-function */
class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      candidates: this.props.candidates,
    };
  }

  async componentDidMount() {
    await this.props.getNanional();
    await this.props.getCallingCode();
    await this.props.getCandidates();
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ candidates: nextProps.candidates });
  };

  render() {
    const {
      options,
      setCandidate,
      setCandidateForm,
      forms,
      pullOutCandidate,
      deleteAllCandidate,
      selectEditCandidates,
    } = this.props;
    const { candidates } = this.state;
    return (
      <div className="Content">
        <Header />
        <CandidateForm
          national={get(options, 'national', [])}
          callingCode={get(options, 'callingCode', [])}
          setCandidate={setCandidate}
          setCandidateForm={setCandidateForm}
          forms={forms}
          pullOutCandidate={pullOutCandidate}
        />
        <CandidateTable
          candidates={candidates}
          pullOutCandidate={pullOutCandidate}
          deleteAllCandidate={deleteAllCandidate}
          selectEditCandidates={selectEditCandidates}
        />
      </div>
    );
  }
}
HomePage.defaultProps = {
  options: {},
};
HomePage.propTypes = {
  candidates: PropTypes.object,
  options: PropTypes.object,
  getNanional: PropTypes.func,
  getCallingCode: PropTypes.func,
  setCandidate: PropTypes.func,
  getCandidates: PropTypes.func,
  setCandidateForm: PropTypes.func,
  forms: PropTypes.object,
  pullOutCandidate: PropTypes.func,
  deleteAllCandidate: PropTypes.func,
  selectEditCandidates: PropTypes.func,
};
export const mapStateToProps = state => ({
  options: state.get('options'),
  candidates: state.get('candidates'),
  forms: state.get('form'),
});

export const mapDispatchToProps = dispatch => ({
  getNanional: () => dispatch(getNanional()),
  getCallingCode: () => dispatch(getCallingCode()),
  setCandidate: payload => dispatch(setCandidates(payload)),
  getCandidates: () => dispatch(getCandidates()),
  setCandidateForm: payload => dispatch(setCandidatesForm({ ...payload })),
  pullOutCandidate: payload => dispatch(pullOutCandidates({ ...payload })),
  deleteAllCandidate: () => dispatch(deleteAllCandidates()),
  selectEditCandidates: payload => dispatch(selectEditCandidate(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
