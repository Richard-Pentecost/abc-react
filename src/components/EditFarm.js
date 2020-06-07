import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import FarmForm from './FarmForm';
import * as actions from '../store/actions';
import '../style/AddFarm.css';

// const URL = 'http://localhost:3000/farms';

class EditFarm extends Component {
  constructor(props) {
    super(props);
    const selectedFarm = this.props.location.aboutProp.selectedFarm;
    _.each(selectedFarm, (value, name) => {
      this.props.onInputChange({ name, value });
    });
  };

  componentWillUnmount() {
    this.props.onClearForm();
  };
  
  handleEditFarm = event => {
    event.preventDefault();
    try {
      const { farmName, postcode, contactName, contactNumber } = this.props;
      const id = this.props.location.aboutProp.selectedFarm._id;
      this.props.onUpdateFarm({ farmName , postcode, contactName, contactNumber, id });
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
    const { farmName, postcode, contactName, contactNumber } = this.props;
    return (
      <div className='addFarm'>
        <FarmForm 
          title='Edit Farm'
          farmName={farmName}
          postcode={postcode}
          contactName={contactName}
          contactNumber={contactNumber}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleEditFarm}
          handleBack={() => this.props.history.goBack()}
          btnText='Edit Farm'
        />
      </div>
    );
  };
};

const mapStateToProps = state => {
  const { farmName, postcode, contactName, contactNumber } = state.farmForm;
  return { farmName, postcode, contactName, contactNumber };
};

const mapDispatchToProps = dispatch => {
  return {
    onInputChange: ({ name, value }) => dispatch(actions.farmUpdate({ prop: name, value })),
    onUpdateFarm: ({ farmName , postcode, contactName, contactNumber, id }) => {
      dispatch(actions.editFarm({ farmName , postcode, contactName, contactNumber, id }));
    },
    onClearForm: () => dispatch(actions.clearFarmForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFarm);
