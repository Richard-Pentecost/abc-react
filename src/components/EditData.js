import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import DataForm from './DataForm';
import Alert from './Alert';
import Loading from './Loading';
import * as actions from '../store/actions';
import '../style/AddData.scss';

class EditData extends Component {
  constructor(props) {
    super(props);
    const selectedData = this.props.location.state.input;
    const dataArr = _.filter(selectedData, (value, name) => {
      return name === 'acidData' || name === 'chlorineData';
    });
    
    this.props.onInputChange({ name: 'date', value: selectedData.date });

    _.each(dataArr, (val, index) => {
      _.each(val, (value, name) => {
        let updatedName;
        index === 0 ? updatedName = `acid-${name}` : updatedName =`chlorine-${name}`;
        this.props.onInputChange({ name: updatedName, value });
      })
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
    const farmId = this.props.location.state.input.farmId;
    const dataId = this.props.location.state.input._id;

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
    const previousData = { previousDate, previousAcidFloat, previousChlorineFloat, previousAcidDeliveryDate, previousChlorineDeliveryDate, deliveryMethod};
    this.props.onEditData(this.props.data, previousData, farmId, dataId);
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
          btnText='Save'
          loading={this.props.loading}
        />
        {errorAlert}
        {loading}
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { error, errorMessage, addDataSuccess, loading } = state.data;
  return { 
    error, errorMessage, addDataSuccess, loading,
    data: state.dataForm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.dataInputChange({ prop: name, value })),
    onEditData: (data, previousData, farmId, dataId) => dispatch(actions.editData(data, previousData, farmId, dataId)),
    onClearForm: () => dispatch(actions.clearDataForm()),
    onClearSuccessFlag: () => dispatch(actions.clearDataSuccessFlag()),
    onClearError: () => dispatch(actions.clearDataErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditData);
