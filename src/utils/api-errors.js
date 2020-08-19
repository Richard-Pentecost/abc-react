import _ from 'lodash';

export const errorHandler = (error) => {
  const errors = error.response.data.errors;
  let errorMessage;

  if (typeof errors === 'string') {
    errorMessage = errors;
  } else {
    const errArr = _.filter(errors, err => {
      return err !== null
    });
    errArr.length === 0 ?
      errorMessage = 'A network error has occured. Please try again.'
      : errorMessage = errArr[0];
  }
  
  return errorMessage;
};
