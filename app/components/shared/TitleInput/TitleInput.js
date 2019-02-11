import React from 'react';
import PropTypes from 'prop-types';
import './TitleInput.css';

export default function TitleInput(props) {
  const { text, isRequired } = props;
  const Mark = isRequired ? <span className="RequireMark">*</span> : '';
  return (
    <div>
      <h3 className="InputTitle">
        {text}
        {Mark}
      </h3>
    </div>
  );
}

TitleInput.defaultProps = {
  isRequired: false,
};

TitleInput.propTypes = {
  text: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};
