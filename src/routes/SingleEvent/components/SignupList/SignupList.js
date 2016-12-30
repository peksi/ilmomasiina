import React from 'react';
import _ from 'lodash';
import './SignupList.scss';

export class SignupList extends React.Component {
  render() {
    const TableRow = ({ columns, index }) =>
      <tr>
        <td>{index}.</td>
        {columns.map(column => <td>{column}</td>)}
      </tr>;

    return (
      <div>
        {this.props.title ? <h3>{this.props.title}</h3> : ''}
        { !this.props.rows.length ? <p>Ei ilmoittautumisia.</p> :
        <table className='table table-condensed table-responsive'>
          <thead>
            <tr className='active'>
              <th>Sija</th>
              {this.props.headings.map(h => <th>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.rows.map((row, i) => <TableRow columns={_.values(row)} index={i + 1} />)}
          </tbody>
        </table>
         }
      </div>
    );
  }
}

SignupList.propTypes = {
  title: React.PropTypes.string,
  headings: React.PropTypes.string.isRequired,
  rows: React.PropTypes.array.isRequired,
};

export default SignupList;
