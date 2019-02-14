import React from 'react';
import PropTypes from 'prop-types';

export default function YearMonthForm({
  date,
  localeUtils,
  onChange,
  fromMonth,
  toMonth,
}) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

YearMonthForm.propTypes = {
  date: PropTypes.string.isRequired,
  localeUtils: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  fromMonth: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]),
  toMonth: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};
