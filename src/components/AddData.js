import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DataForm from './DataForm';
import Alert from './Alert';
import Loading from './Loading';
import * as actions from '../store/actions';
import '../style/AddData.scss';

class AddData extends Component {

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
    if (this.props.error) {
      this.props.onClearError();
    };
    this.props.onInputChange({ name, value})
  };

  handleDateChange = date => {
    if (this.props.error) {
      this.props.onClearError();
    };
    this.props.onInputChange({ name: 'date', value: moment(date).startOf('day') });
  };

  handleSave = event => {
    event.preventDefault();
    const { data, deliveryMethod } = this.props.location.state;
    const id = this.props.location.state.id;
    let previousDate;
    let previousAcidFloat;
    let previousChlorineFloat;
    let previousAcidDeliveryDate;
    let previousChlorineDeliveryDate;
    if (data) {
      previousDate = data.date;
      previousAcidFloat = data.acidData.float;
      previousChlorineFloat = data.chlorineData.float;
      previousAcidDeliveryDate = data.acidData.deliveryDate;
      previousChlorineDeliveryDate = data.chlorineData.deliveryDate;
    }
    const previousData = { previousDate, previousAcidFloat, previousChlorineFloat, previousAcidDeliveryDate, previousChlorineDeliveryDate, deliveryMethod };
    this.props.onAddData(this.props.data, previousData, id);  
  };

  handleCancel = event => {
    event.preventDefault();
    this.props.history.goBack();
  }

  render() {
    let errorAlert = null;
    if (this.props.error) {
      errorAlert = <Alert message={this.props.errorMessage} />
    };
    let loading = null;
    if (this.props.loading) {
      loading = <Loading />
    };
    
    return (
      <div className='formContainer'>
        <DataForm 
          data={this.props.data}
          handleInputChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          handleSubmitForm={this.handleSave}
          handleCancel={this.handleCancel}
          btnText='Add'
          loading={this.props.loading}
          />
        {errorAlert}
        {loading}
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { error, errorMessage, addDataSuccess, loading } = state.data
  return { 
    error, errorMessage, addDataSuccess, loading,
    data: state.dataForm, 
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.dataInputChange({ prop: name, value })),
    onAddData: (data, previousData, id) => dispatch(actions.addData(data, previousData, id)),
    onClearForm: () => dispatch(actions.clearDataForm()),
    onClearSuccessFlag: () => dispatch(actions.clearDataSuccessFlag()),
    onClearError: () => dispatch(actions.clearDataErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
