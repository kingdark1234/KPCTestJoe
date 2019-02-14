import React from 'react';
import PropTypes from 'prop-types';
import './RadioInput.css';

export default function RadioInput(props) {
  const { value, checked, onChange } = props;
  return (
    <div className="radio">
      <label>
        <input
          name="gender"
          type="radio"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        &nbsp;&nbsp;
        {value}
      </label>
    </div>
  );
}

RadioInput.propTypes = {
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
