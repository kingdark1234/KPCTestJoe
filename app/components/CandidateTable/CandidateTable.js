import React from 'react';
import './CandidateTable.css';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class CandidateTable extends React.Component {
  state = {
    selected: {},
    selectAll: 0,
  };

  columns = [
    {
      id: 'checkbox',
      accessor: '',
      Cell: ({ original }) => (
        <input
          type="checkbox"
          className="checkbox"
          checked={this.state.selected[original.id] === true}
          onChange={() => this.toggleRow(original.id)}
        />
      ),
      Header: () => (
        <input
          type="checkbox"
          className="checkbox"
          checked={this.state.selectAll === 1}
          ref={input => {
            if (input) {
              input.indeterminate = this.state.selectAll === 2;
            }
          }}
          onChange={() => this.toggleSelectAll()}
        />
      ),
      sortable: false,
      width: 45,
      className: 'contentInput',
    },
    {
      id: 'id',
      Header: 'Id',
      accessor: 'id',
      show: false,
    },
    {
      id: 'name',
      Header: 'Name',
      accessor: d => `${d.firstName}  ${d.lastName}`,
      className: 'contentInput',
    },
    {
      id: 'gender',
      Header: 'Gender',
      accessor: 'gender',
      className: 'contentInput',
    },
    {
      id: 'phone',
      Header: 'MobilePhone',
      accessor: 'phone',
      className: 'contentInput',
    },
    {
      id: 'national',
      Header: 'Nationality',
      accessor: 'national',
      className: 'contentInput',
    },
    {
      id: 'checkbox',
      accessor: '',
      Header: '',
      Cell: ({ original }) => (
        <div className="contentInput">
          <div
            className="deleteInput"
            role="button"
            onClick={() => this.editRow(original.id)}
          >
            Edit
          </div>
          /
          <div
            className="deleteInput"
            role="button"
            onClick={() => this.deleteRow(original.id)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  editRow = id => {
    this.props.selectEditCandidates(id);
  };

  deleteRow = value => {
    const selected = { [value]: true };
    this.props.pullOutCandidate(selected);
  };

  deleteMultiRow = () => {
    const { selected, selectAll } = this.state;
    if (selectAll === 2) {
      this.props.pullOutCandidate(selected);
    } else if (selectAll === 1) {
      window.localStorage.removeItem('candidate');
      this.props.deleteAllCandidate();
    }
  };

  toggleRow = id => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[id] = !this.state.selected[id];
    this.setState({
      selected: newSelected,
      selectAll: 2,
    });
  };

  toggleSelectAll = () => {
    const newSelected = {};

    if (this.state.selectAll === 0) {
      this.props.candidates.candidates.forEach(x => {
        newSelected[x.id] = true;
      });
    }

    this.setState(prevState => ({
      selected: newSelected,
      selectAll: prevState.selectAll === 0 ? 1 : 0,
    }));
  };

  render() {
    const { candidates } = this.props;
    return (
      <div>
        <button type="button" className="Button" onClick={this.deleteMultiRow}>
          Delete
        </button>
        <ReactTable
          data={candidates.candidates}
          columns={this.columns}
          defaultPageSize={5}
          showPaginationTop
          showPaginationBottom={false}
        />
      </div>
    );
  }
}
CandidateTable.propTypes = {
  pullOutCandidate: PropTypes.func,
  candidates: PropTypes.object,
  deleteAllCandidate: PropTypes.func,
  selectEditCandidates: PropTypes.func,
};
export default CandidateTable;
