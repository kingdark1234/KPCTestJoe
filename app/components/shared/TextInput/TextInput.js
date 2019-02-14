import React from 'react';
import PropTypes from 'prop-types';
import './TextInput.css';

export default function TextInput(props) {
  const {
    pattern,
    type,
    name,
    placeholder,
    title,
    isRequired,
    maxlength = '',
    className = 'TextField',
    onChange,
    value,
  } = props;
  return isRequired ? (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      title={title}
      pattern={pattern} // "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$"
      className={className}
      maxLength={maxlength}
      onChange={onChange}
      value={value}
      required
    />
  ) : (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      title={title}
      pattern={pattern}
      className={className}
      maxLength={maxlength}
      onChange={onChange}
      value={value}
    />
  );
}

TextInput.defaultProps = {
  pattern: '',
  isRequired: false,
  className: 'TextField',
};

TextInput.propTypes = {
  onChange: PropTypes.func,
  maxlength: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pattern: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
};
