import React, { Component } from 'react';
import { connect } from 'react-redux';
import FarmForm from './FarmForm';
import * as actions from '../store/actions';
import '../style/AddFarm.scss';


class AddFarm extends Component {

  componentWillUnmount() {
    this.props.onClearForm();
  };

  handleAddFarm = event => {
    event.preventDefault();
    try {
      const { farmName, postcode, contactName, contactNumber } = this.props;
      this.props.onCreateFarm({ farmName , postcode, contactName, contactNumber });
      this.props.history.goBack();
    } catch (err) {
      console.log(err.response);
    };
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.props.onInputChange({ name, value });
  };

  render() {
    const { farmName, postcode, contactName, contactNumber, isAdmin } = this.props;
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
        />
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { farmName, postcode, contactName, contactNumber } = state.farmForm;
  return { 
    farmName, postcode, contactName, contactNumber,
    isAdmin: state.auth.token.permissionLevel === 'admin',  
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.farmUpdate({ prop: name, value })),
    onCreateFarm: ({ farmName , postcode, contactName, contactNumber }) => {
      dispatch(actions.createFarm({ farmName , postcode, contactName, contactNumber }));
    },
    onClearForm: () => dispatch(actions.clearFarmForm()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFarm);
