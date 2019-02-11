import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
// import Calendar from 'rc-calendar';
import './CalendarDropdown.css';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

class CalendarDropdown extends React.Component {
  state = {
    calendarOpen: false,
    date: moment().format('DD/MM/YY'),
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

  handleDayClick = (day, { selected }) => {
    console.log(day, selected);
    this.setState({
      date: selected ? undefined : moment(day).format('DD/MM/YY'),
      calendarOpen: false,
    });
    this.props.toggleItem(this.state.day, 'calendar');
  };

  render() {
    const { calendarOpen, date } = this.state;

    return (
      <div className="ddWrapper">
        <div
          className="ddHeader"
          tabIndex={0}
          role="option"
          aria-selected="true"
          onClick={this.toggleList}
        >
          <div className="ddHeaderTitle"> {date} </div>
          {calendarOpen ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </div>
        {calendarOpen && (
          <DayPicker
            selectedDays={this.state.date}
            onDayClick={this.handleDayClick}
          />
        )}
      </div>
    );
  }
}

export default onClickOutside(CalendarDropdown);

CalendarDropdown.propTypes = {
  toggleItem: PropTypes.func.isRequired,
};
