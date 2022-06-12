import propTypes from 'prop-types';
import EditProfileForm from './EditProfileForm';

const SecondStepRegistration = ({ setUserType }) => {
  return (
    <EditProfileForm actionText="Finish registration" setUserType={setUserType} />
  );
};

SecondStepRegistration.propTypes = {
  setUserType: propTypes.func.isRequired,
};

export default SecondStepRegistration;
