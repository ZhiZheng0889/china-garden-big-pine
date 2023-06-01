class Validator {
  static validatePhoneNumber(phoneNumber) {
    const onlyNumbers = phoneNumber.replace(/\D/g, "");
    if (!onlyNumbers.length) {
      return false;
    }
    if (onlyNumbers.length !== 10) {
      return false;
    }
    return true;
  }
}

module.exports = Validator;
