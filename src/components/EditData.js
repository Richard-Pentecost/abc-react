import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DataForm from './DataForm';
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
    const farmId = this.props.location.state.input.farmId;
    const dataId = this.props.location.state.input._id;
    this.props.onEditData(data, farmId, dataId);
    this.props.history.goBack();
  }

  render() {
    return (
      <div className='formContainer'>
        <DataForm 
          data={this.props.data}
          handleInputChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          handleSubmitForm={this.handleSave}
          handleCancel={() => this.props.history.goBack()}
          btnText='Save'
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
    onEditData: (data, farmId, dataId) => dispatch(actions.editData(data, farmId, dataId)),
    onClearForm: () => dispatch(actions.clearDataForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditData);
