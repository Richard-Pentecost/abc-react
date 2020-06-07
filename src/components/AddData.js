import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataForm from './DataForm';
import * as actions from '../store/actions';
import '../style/AddData.css';

class AddData extends Component {

  componentWillUnmount() {
    this.props.onClearForm();
  };

  handleInputChange = event => {    
    const { name, value } = event.target; 
    this.props.onInputChange({ name, value})
  };

  handleDateChange = date => {
    this.props.onInputChange({ name: 'date', value: date });
  };

  handleSave = event => {
    event.preventDefault();
    const { date, product, quantity, meterReading, initialFloat,
      waterUsage, pumpDial, float, reading, comments } = this.props.data;
    const data = { date, product, quantity, meterReading, initialFloat,
      waterUsage, pumpDial, float, reading, comments };
    const id = this.props.location.state.id;
    this.props.onAddData(data, id);
    this.props.history.goBack();
  };

  

  render() {
    // console.log(this.props.data.date);
    return (
      <div className='formContainer'>
        <DataForm 
          data={this.props.data}
          handleInputChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          handleSubmitForm={this.handleSave}
          handleCancel={() => this.props.history.goBack()}
          btnText='Add'
        />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return { data: state.dataForm };
}

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.dataInputChange({ prop: name, value })),
    onAddData: (data, id) => dispatch(actions.addData(data, id)),
    onClearForm: () => dispatch(actions.clearDataForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
