import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DataForm from './DataForm';
import Alert from './Alert';
import * as actions from '../store/actions';
import '../style/AddData.scss';

class EditData extends Component {
  constructor(props) {
    super(props);
    const selectedData = this.props.location.state.input.data;
    _.each(selectedData, (value, name) => {
      this.props.onInputChange({ name, value });
    });
  };

  componentWillUnmount() {
    this.props.onClearForm();
    this.props.onClearSuccessFlag();
  };

  componentDidUpdate() {
    if (this.props.addDataSuccess) {
      this.props.history.goBack();
    };
  };

  handleInputChange = event => {    
    const { name, value } = event.target; 
    this.props.onClearError();
    this.props.onInputChange({ name, value})
  };

  handleDateChange = date => {
    this.props.onClearError();
    this.props.onInputChange({ name: 'date', value: date });
  };
  
  handleSave = event => {
    event.preventDefault();
    const { date, product, quantity, meterReading, initialFloat,
      waterUsage, pumpDial, float, reading, comments } = this.props.data;
    const data = { date, product, quantity, meterReading, initialFloat,
      waterUsage, pumpDial, float, reading, comments };
    const farmId = this.props.location.state.input.farmId;
    const dataId = this.props.location.state.input._id;
    this.props.onEditData(data, farmId, dataId);
  }

  handleCancel = event => {
    event.preventDefault();
    this.props.history.goBack();
  }

  render() {
    let errorAlert = null;
    if (this.props.error) {
      errorAlert = <Alert message={this.props.errorMessage} />
    };

    return (
      <div className='formContainer'>
        <DataForm 
          data={this.props.data}
          handleInputChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          handleSubmitForm={this.handleSave}
          handleCancel={this.handleCancel}
          btnText='Save'
        />
        {errorAlert}
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { error, errorMessage, addDataSuccess } = state.data;
  return { 
    error, errorMessage, addDataSuccess,
    data: state.dataForm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.dataInputChange({ prop: name, value })),
    onEditData: (data, farmId, dataId) => dispatch(actions.editData(data, farmId, dataId)),
    onClearForm: () => dispatch(actions.clearDataForm()),
    onClearSuccessFlag: () => dispatch(actions.clearDataSuccessFlag()),
    onClearError: () => dispatch(actions.clearDataErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditData);
