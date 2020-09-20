import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FarmForm from './FarmForm';
import Alert from './Alert';
import * as actions from '../store/actions';
import '../style/AddFarm.scss';

class EditFarm extends Component {
  constructor(props) {
    super(props);
    const selectedFarm = this.props.location.state.selectedFarm;
    _.each(selectedFarm, (value, name) => {
      this.props.onInputChange({ name, value });
    });
  };

  componentWillUnmount() {
    this.props.onClearForm();
    this.props.onClearSuccessFlag();
  };
  
  componentDidUpdate(prevProps) {
    if (this.props.addFarmSuccess && !prevProps.addFarmSuccess) {
      this.props.history.goBack();
    }; 
  };

  handleEditFarm = event => {
    event.preventDefault();
    const { farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments } = this.props;
    const farmData = { farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments };
    const id = this.props.location.state.selectedFarm._id;
    this.props.onUpdateFarm(farmData, id);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    if (this.props.error) {
      this.props.onClearError();
    };
    this.props.onInputChange({ name, value });
  };

  render() {
    const { farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments, error, errorMessage, loading } = this.props;
    
    let errorAlert = null;
    if (error) {
      errorAlert = <Alert message={errorMessage} />;
    };
    
    return (
      <div className='addFarm'>
        <FarmForm 
          title='Edit Farm'
          isAdmin={true}
          farmName={farmName}
          postcode={postcode}
          contactName={contactName}
          contactNumber={contactNumber}
          deliveryMethod={deliveryMethod}
          accessCodes={accessCodes}
          comments={comments}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleEditFarm}
          handleBack={() => this.props.history.goBack()}
          btnText='Edit Farm'
          loading={loading}
        />
        {errorAlert}
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments } = state.farmForm;
  const { loading, error, errorMessage, addFarmSuccess } = state.farms;
  return { 
    farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments,
    error, errorMessage, addFarmSuccess, loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.farmInputChange({ prop: name, value })),
    onUpdateFarm: (data, id ) =>  dispatch(actions.editFarm(data, id )),
    onClearSuccessFlag: () => dispatch(actions.clearFarmSuccessFlag()),
    onClearForm: () => dispatch(actions.clearFarmForm()),
    onClearError: () => dispatch(actions.clearFarmErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFarm);
