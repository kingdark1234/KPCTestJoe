import React from 'react';
import PropTypes from 'prop-types';
import './RadioInput.css';

export default function TitleInput(props) {
  const { value } = props;
  return (
    <div className="radio">
      <label>
        <input type="radio" value={value} />
        &nbsp;&nbsp;
        {value}
      </label>
    </div>
  );
}

TitleInput.propTypes = {
  value: PropTypes.string.isRequired,
};
