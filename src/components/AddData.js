import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataForm from './DataForm';
import Alert from './Alert';
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
    this.props.onClearError();
    this.props.onInputChange({ name, value})
  };

  handleDateChange = date => {
    this.props.onClearError();
    this.props.onInputChange({ name: 'date', value: date });
  };

  handleSave = event => {
    event.preventDefault();
    const id = this.props.location.state.id;
    this.props.onAddData(this.props.data, id);
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
    return (
      <div className='formContainer'>
        <DataForm 
          data={this.props.data}
          handleInputChange={this.handleInputChange}
          handleDateChange={this.handleDateChange}
          handleSubmitForm={this.handleSave}
          handleCancel={this.handleCancel}
          btnText='Add'
        />
        {errorAlert}
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { error, errorMessage, addDataSuccess } = state.data
  return { 
    error, errorMessage, addDataSuccess,
    data: state.dataForm, 
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.dataInputChange({ prop: name, value })),
    onAddData: (data, id) => dispatch(actions.addData(data, id)),
    onClearForm: () => dispatch(actions.clearDataForm()),
    onClearSuccessFlag: () => dispatch(actions.clearDataSuccessFlag()),
    onClearError: () => dispatch(actions.clearDataErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData);
