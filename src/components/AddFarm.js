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

  componentDidUpdate() {
    if (this.props.addFarmSuccess) {
      this.props.history.goBack();
    };
  };

  handleAddFarm = event => {
    event.preventDefault();
    const { farmName, postcode, contactName, contactNumber } = this.props;
    this.props.onCreateFarm({ farmName, postcode, contactName, contactNumber })
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.props.onClearError();
    this.props.onInputChange({ name, value });
  };

  render() {
    const { farmName, postcode, contactName, contactNumber, isAdmin, error, errorMessage, loading } = this.props;
    
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
  const { farmName, postcode, contactName, contactNumber } = state.farmForm;
  const { loading, error, errorMessage, addFarmSuccess } = state.farms;
  return { 
    farmName, postcode, contactName, contactNumber,
    error, errorMessage, addFarmSuccess, loading,
    isAdmin: state.auth.token.permissionLevel === 'admin',  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.farmInputChange({ prop: name, value })),
    onCreateFarm: ({ farmName , postcode, contactName, contactNumber }) => {
      dispatch(actions.createFarm({ farmName , postcode, contactName, contactNumber }));
    },
    onClearSuccessFlag: () => dispatch(actions.clearFarmSuccessFlag()),
    onClearForm: () => dispatch(actions.clearFarmForm()),
    onClearError: () => dispatch(actions.clearFarmErrorMessage()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFarm);
