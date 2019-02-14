import React from 'react';
import './CandidateForm.css';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import moment from 'moment';
import { RadioGroup, Radio } from 'react-radio-group';
import TitleInput from '../shared/TitleInput/TitleInput';
import TextInput from '../shared/TextInput/TextInput';
import DropDownList from '../shared/DropDrown/DropDown';
import CalendarDropDown from '../shared/CalendarDropDown/CalendarDropDown';
import { options } from '../../constants/dropDown';

const initState = {
  candidate: {
    title: 'Mr.',
    callingCode: '+66',
    firstName: '',
    lastName: '',
    birthDate: moment().format('MM/DD/YY'),
    national: 'Thai',
    phone: '',
    passport: '',
    salary: '',
    gender: '',
    one: '',
    two: '',
    three: '',
    four: '',
    five: '',
  },
};
class Candidate extends React.Component {
  state = initState;

  // componentDidUpdate(prevProps) {
  //   console.log(this.props);
  // }

  putFormTORedux = (key, value) => {
    this.props.setCandidateForm({ key, value });
  };

  ToggleItem = async (value, key) => {
    await this.setState(prevState => ({
      candidate: {
        ...prevState.candidate,
        [key]: value,
      },
    }));
    await this.putFormTORedux(key, value);
  };

  handleChange = async value => {
    await this.setState(prevState => ({
      candidate: {
        ...prevState.candidate,
        gender: value,
      },
    }));
    await this.putFormTORedux('gender', value);
  };

  onChange = async event => {
    const target = get(event, 'target', null);
    if (target) {
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = get(target, 'name', null);
      if (name) {
        await this.setState(prevState => ({
          candidate: {
            ...prevState.candidate,
            [name]: value,
          },
        }));
        await this.putFormTORedux(name, value);
      } else {
        console.log('Name Is Null');
      }
    } else {
      console.log('Target Is Null');
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { candidate } = this.state;
    const { setCandidate, forms, pullOutCandidate } = this.props;
    const FormatResources = {
      title: candidate.title,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      birthDate: candidate.birthDate,
      national: candidate.national,
      phone: candidate.callingCode.concat(candidate.phone),
      passport: candidate.passport,
      salary: candidate.salary,
      gender: candidate.gender,
      callingCode: candidate.callingCode,
      dailNumber: candidate.phone,
      citizenId: candidate.one
        .concat([
          candidate.two,
          candidate.three,
          candidate.four,
          candidate.five,
        ])
        .replace(/,/g, ''),
    };
    if (forms.edit === false) {
      await setCandidate(FormatResources);
      await this.putFormTORedux(true);
    } else {
      const selected = { [forms.id]: true };
      await pullOutCandidate(selected);
      await setCandidate(FormatResources);
      await this.putFormTORedux(true);
    }

    // return false;
  };

  render() {
    const { national, callingCode, forms } = this.props;
    return (
      <div className="candidateForm">
        <form onSubmit={this.handleSubmit}>
          <div className="Container">
            <TitleInput text="Title:" isRequired />
            <DropDownList
              title={forms.title}
              list={options}
              toggleItem={this.ToggleItem}
            />
            <TitleInput text="FirstName:" isRequired />
            <TextInput
              type="text"
              name="firstName"
              placeholder="First Name"
              title="Enter your First Name"
              pattern="^[a-zA-Zก-ํ]+$"
              onChange={this.onChange}
              value={forms.firstName}
              isRequired
            />
            <TitleInput text="LastName:" isRequired />
            <TextInput
              type="text"
              name="lastName"
              placeholder="LastName"
              title="Enter your Last Name"
              pattern="^[a-zA-Zก-ํ]+$"
              onChange={this.onChange}
              value={forms.lastName}
              isRequired
            />
          </div>
          <div className="ContainerSec">
            <TitleInput text="BirthDay:" isRequired />
            <CalendarDropDown toggleItem={this.ToggleItem} />
            <TitleInput text="Nationality:" />
            <DropDownList
              title={forms.national}
              list={national}
              toggleItem={this.ToggleItem}
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
              value={forms.one}
              onChange={this.onChange}
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
              value={forms.two}
              onChange={this.onChange}
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
              value={forms.three}
              onChange={this.onChange}
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
              value={forms.four}
              onChange={this.onChange}
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
              value={forms.five}
              onChange={this.onChange}
            />
          </div>
          <div className="ContainerSec">
            <TitleInput text="Gender:" />
            <div className="RadioGroup">
              <RadioGroup
                name="fruit"
                selectedValue={forms.gender}
                onChange={this.handleChange}
              >
                <Radio value="Male" /> Male
                <Radio value="Female" /> Female
                <Radio value="Unsex" /> Unsex
              </RadioGroup>
            </div>
          </div>
          <div className="ContainerFour">
            <TitleInput text="Mobile Phone:" isRequired />
            <DropDownList
              title="66"
              list={callingCode}
              flag="https://restcountries.eu/data/tha.svg"
              toggleItem={this.ToggleItem}
            />
            __
            <TextInput
              type="text"
              name="phone"
              placeholder="phone number"
              title="Enter your phone"
              pattern="^[0-9]{10}$"
              className="phone"
              onChange={this.onChange}
              value={forms.phone}
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
              value={forms.passport}
              onChange={this.onChange}
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
                value={forms.salary}
                onChange={this.onChange}
              />{' '}
              THB
            </div>
            <input className="Submit" type="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
Candidate.propTypes = {
  callingCode: PropTypes.array,
  national: PropTypes.array,
  setCandidate: PropTypes.func,
  setCandidateForm: PropTypes.func,
  forms: PropTypes.object,
};
export default Candidate;
