import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';
import Form from './Form';

class Candidate extends React.Component {
  state = {
    title: 'Mr.',
  };

  saveTitle = title => {
    this.setState({
      title,
    });
  };

  render() {
    const { title } = this.state;
    const { national, callingCode } = this.props;
    return (
      <div className="candidateForm">
        <Form
          saveTitle={this.saveTitle}
          national={national}
          callingCode={callingCode}
          title={title}
        />
      </div>
    );
  }
}
Candidate.propTypes = {
  callingCode: PropTypes.array,
  national: PropTypes.array,
};
export default Candidate;
