import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import './DropDown.css';
import { get, isArray, head, isEmpty } from 'lodash';

class DropDownList extends React.Component {
  state = {
    listOpen: false,
    headerTitle: this.props.title,
    flag: this.props.flag,
  };

  componentDidUpdate(prevProps) {
    const { title } = this.props;
    if (prevProps.title !== title) {
      this.setState({ headerTitle: title });
    }
  }

  handleClickOutside = () => {
    this.setState({
      listOpen: false,
    });
  };

  toggleList = () => {
    this.setState(prevState => ({
      listOpen: !prevState.listOpen,
    }));
  };

  onSelected = (value, key, flag) => () => {
    this.setState({
      headerTitle: value,
      listOpen: false,
      flag,
    });
    this.props.toggleItem(value, key);
  };

  mappingItem = item => {
    const title = get(item, 'title', '');
    const titleText = isArray(title) ? head(title) : title;
    const flag = get(item, 'flag', '');
    return (
      <li
        className="dd-list-item"
        role="menuitem"
        key={item.id}
        onClick={this.onSelected(titleText, item.key, flag)}
      >
        {!isEmpty(flag) && <img src={flag} alt="flag" className="images" />}
        {!isEmpty(flag) ? ` +${titleText}` : titleText}
      </li>
    );
  };

  render() {
    const { list } = this.props;
    const { listOpen, headerTitle } = this.state;

    return (
      <div className="ddWrapper">
        <div
          className="ddHeader"
          tabIndex={0}
          role="option"
          aria-selected="true"
          onClick={this.toggleList}
        >
          {!isEmpty(this.state.flag) ? (
            <div className="ddHeaderTitle">
              <img src={this.state.flag} alt="flagHead" className="images" />{' '}
              {`+${headerTitle}`}
            </div>
          ) : (
            <div className="ddHeaderTitle"> {headerTitle} </div>
          )}
          {listOpen ? (
            <FontAwesome name="angle-up" size="2x" />
          ) : (
            <FontAwesome name="angle-down" size="2x" />
          )}
        </div>
        {listOpen && <ul className="ddList">{list.map(this.mappingItem)}</ul>}
      </div>
    );
  }
}

export default onClickOutside(DropDownList);

DropDownList.defaultProps = {
  title: '',
  flag: '',
};

DropDownList.propTypes = {
  title: PropTypes.string,
  flag: PropTypes.string,
  list: PropTypes.array.isRequired,
  toggleItem: PropTypes.func.isRequired,
};
