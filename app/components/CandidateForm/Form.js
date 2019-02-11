import React from 'react';
import PropTypes from 'prop-types';
import TitleInput from '../shared/TitleInput/TitleInput';
import TextInput from '../shared/TextInput/TextInput';
import './Form.css';
import DropDownList from '../shared/DropDrown/DropDown';
import CalendarDropDown from '../shared/CalendarDropDown/CalendarDropDown';
import RadioInput from '../shared/RadioInput/RadioInput';
import { options } from '../../constants/dropDown';

export default class Form extends React.Component {
  toggleSelected = (value, key) => {
    const { saveTitle } = this.props;
    const temp = value;
    switch (key) {
      case 'title':
        saveTitle(temp);
        break;

      default:
        console.log('No Action');
        break;
    }
  };

  handleSubmit = e => {
    alert('FORM====>', e.target);
    console.log('FORM====>', e.target);
    e.preventDefault();
    // login({ email, password })
  };

  render() {
    const { national, callingCode } = this.props;
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <div className="Container">
          <TitleInput text="Title:" isRequired />
          <DropDownList
            title={this.props.title}
            list={options}
            toggleItem={this.toggleSelected}
          />
          <TitleInput text="FirstName:" isRequired />
          <TextInput
            type="text"
            name="FirstName"
            placeholder="First Name"
            title="Enter your First Name"
            pattern="^[a-zA-Z]+$"
            isRequired
          />
          <TitleInput text="LastName:" isRequired />
          <TextInput
            type="text"
            name="LastName"
            placeholder="LastName"
            title="Enter your Last Name"
            pattern="^[a-zA-Z]+$"
            isRequired
          />
        </div>
        <div className="ContainerSec">
          <TitleInput text="BirthDay:" isRequired />
          <CalendarDropDown toggleItem={this.toggleSelected} />
          <TitleInput text="Nationality:" />
          <DropDownList
            title="-- Please Select --"
            list={national}
            toggleItem={this.toggleSelected}
          />
        </div>
        <div className="ContainerThird">
          <TitleInput text="CitizenID:" />
          <TextInput
            type="text"
            name="one"
            placeholder=""
            title="Enter your ID"
            className="one"
            pattern="^[0-9]{1}$"
            maxlength="1"
          />
          ____
          <TextInput
            type="text"
            name="two"
            placeholder=""
            title="Enter your ID"
            className="five"
            pattern="^[0-9]{4}$"
            maxlength="4"
          />
          ____
          <TextInput
            type="text"
            name="three"
            placeholder=""
            title="Enter your ID"
            className="five"
            pattern="^[0-9]{5}$"
            maxlength="5"
          />
          ____
          <TextInput
            type="text"
            name="four"
            placeholder=""
            title="Enter your ID"
            className="two"
            pattern="^[0-9]{2}$"
            maxlength="2"
          />
          ____
          <TextInput
            type="text"
            name="five"
            placeholder=""
            title="Enter your ID"
            className="one"
            pattern="^[0-9]{1}$"
            maxlength="1"
          />
        </div>
        <div className="ContainerSec">
          <TitleInput text="Gender:" />
          <div className="RadioGroup">
            <RadioInput value="male" />
            <RadioInput value="female" />
            <RadioInput value="unsex" />
          </div>
        </div>
        <div className="ContainerFour">
          <TitleInput text="Mobile Phone:" isRequired />
          <DropDownList
            title="66"
            list={callingCode}
            flag="https://restcountries.eu/data/tha.svg"
            toggleItem={this.toggleSelected}
          />
          __
          <TextInput
            type="text"
            name="phone"
            placeholder="phone number"
            title="Enter your phone"
            pattern="^[0-9]{10}$"
            className="phone"
            isRequired
          />
        </div>
        <div className="ContainerFive">
          <TitleInput text="Passport No:" />
          <TextInput
            type="text"
            name="passport"
            placeholder="passport number"
            title="Enter your passport number"
            pattern="^[a-zA-Z0-9]+$"
            className="phone"
          />
        </div>
        <div className="ContainerSix">
          <div className="ContainerFive">
            <TitleInput text="Expected Salary:" />
            <TextInput
              type="text"
              name="salary"
              placeholder="Expected Salary"
              title="Enter your expected salary"
              pattern="^[a-zA-Z0-9]+$"
              className="phone"
            />
            THB
          </div>
          <input className="Submit" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  callingCode: PropTypes.array.isRequired,
  national: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  saveTitle: PropTypes.func.isRequired,
};
