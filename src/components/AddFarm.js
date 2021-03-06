import React, { Component } from 'react';
import { connect } from 'react-redux';
import FarmForm from './FarmForm';
import Alert from './Alert';
import * as actions from '../store/actions';
import '../style/AddFarm.scss';


class AddFarm extends Component {

  componentWillUnmount() {
    this.props.onClearForm();
    this.props.onClearSuccessFlag();
  };

  componentDidUpdate(prevProps) {
    if (this.props.addFarmSuccess && !prevProps.addFarmSuccess) {
      this.props.history.goBack();
    }; 
  };

  handleAddFarm = event => {
    event.preventDefault();
    const { farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments } = this.props;
    const farmData = { farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments };
    this.props.onCreateFarm(farmData);
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    if (this.props.error) {
      this.props.onClearError();
    };
    this.props.onInputChange({ name, value });
  };

  render() {
    const { farmName, postcode, contactName, contactNumber, deliveryMethod, accessCodes, comments, isAdmin, error, errorMessage, loading } = this.props;
    
    let errorAlert = null;
    if (error) {
      errorAlert = <Alert message={errorMessage} />;
    };

    return (
      <div className='addFarm'>
        <FarmForm 
          title='Add Farm'
          isAdmin={isAdmin}
          farmName={farmName}
          postcode={postcode}
          contactName={contactName}
          contactNumber={contactNumber}
          deliveryMethod={deliveryMethod}
          accessCodes={accessCodes}
          comments={comments}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleAddFarm}
          handleBack={() => this.props.history.goBack()}
          btnText='Add Farm'
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
    isAdmin: state.auth.token.permissionLevel === 'admin',  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.farmInputChange({ prop: name, value })),
    onCreateFarm: data =>  dispatch(actions.createFarm(data)),
    onClearSuccessFlag: () => dispatch(actions.clearFarmSuccessFlag()),
    onClearForm: () => dispatch(actions.clearFarmForm()),
    onClearError: () => dispatch(actions.clearFarmErrorMessage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFarm);
