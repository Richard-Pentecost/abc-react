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
    console.log(this.props.location);
    const selectedFarm = this.props.location.state.selectedFarm;
    _.each(selectedFarm, (value, name) => {
      this.props.onInputChange({ name, value });
    });
  };

  componentWillUnmount() {
    this.props.onClearForm();
    this.props.onClearSuccessFlag();
  };
  
  componentDidUpdate() {
    if (this.props.addFarmSuccess){
      this.props.history.goBack();
    } 
  }

  handleEditFarm = event => {
    event.preventDefault();
    const { farmName, postcode, contactName, contactNumber } = this.props;
    const id = this.props.location.state.selectedFarm._id;
    this.props.onUpdateFarm({ farmName , postcode, contactName, contactNumber, id });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.props.onClearError();
    this.props.onInputChange({ name, value });
  };

  render() {
    const { farmName, postcode, contactName, contactNumber, error, errorMessage, loading } = this.props;
    
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
  const { farmName, postcode, contactName, contactNumber } = state.farmForm;
  const { loading, error, errorMessage, addFarmSuccess } = state.farms;
  return { 
    farmName, postcode, contactName, contactNumber, 
    error, errorMessage, addFarmSuccess, loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.farmInputChange({ prop: name, value })),
    onUpdateFarm: ({ farmName , postcode, contactName, contactNumber, id }) => {
      dispatch(actions.editFarm({ farmName , postcode, contactName, contactNumber, id }));
    },
    onClearSuccessFlag: () => dispatch(actions.clearFarmSuccessFlag()),
    onClearForm: () => dispatch(actions.clearFarmForm()),
    onClearError: () => dispatch(actions.clearFarmErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFarm);
