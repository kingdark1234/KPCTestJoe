import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import './CalendarDropdown.css';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import YearMonthForm from './YearMonthForm';

class CalendarDropdown extends React.Component {
  state = {
    calendarOpen: false,
    day: new Date(),
    month: '',
  };

  handleClickOutside = () => {
    this.setState({
      calendarOpen: false,
    });
  };

  toggleList = () => {
    this.setState(prevState => ({
      calendarOpen: !prevState.calendarOpen,
    }));
  };

  handleDayClick = day => {
    this.setState({
      day,
      calendarOpen: false,
    });
    this.props.toggleItem(moment(day).format('MM/DD/YY'), 'birthDate');
  };

  handleYearMonthChange = month => {
    this.setState({
      month,
    });
  };

  render() {
    const { calendarOpen, day, month } = this.state;
    const currentYear = new Date().getFullYear();
    const fromMonth = new Date(currentYear - 120, 0);
    const toMonth = new Date(currentYear, 11);
    return (
      <div className="ddWrapper">
        <div
          className="ddHeader"
          tabIndex={0}
          role="option"
          aria-selected="true"
          onClick={this.toggleList}
        >
          <div className="ddHeaderTitle">
            {' '}
            {moment(day).format('MM/DD/YY')}{' '}
          </div>
          {calendarOpen ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </div>
        {calendarOpen && (
          <div className="picker">
            <DayPicker
              className="picker"
              canChangeMonth={false}
              selectedDays={day}
              onDayClick={this.handleDayClick}
              month={month}
              fromMonth={fromMonth}
              toMonth={toMonth}
              captionElement={({ date, localeUtils }) => (
                <YearMonthForm
                  date={date}
                  localeUtils={localeUtils}
                  onChange={this.handleYearMonthChange}
                  fromMonth={fromMonth}
                  toMonth={toMonth}
                />
              )}
            />
          </div>
        )}
      </div>
    );
  }
}

export default onClickOutside(CalendarDropdown);

CalendarDropdown.propTypes = {
  toggleItem: PropTypes.func.isRequired,
};
