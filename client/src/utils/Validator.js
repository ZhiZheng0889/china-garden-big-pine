export class Validator {
  static validatePhoneNumber(phoneNumber) {
    const onlyNumbers = phoneNumber.trim().replace(/\D/g, "");
    if (!onlyNumbers.length) {
      return false;
    }
    if (onlyNumbers.length !== 10) {
      return false;
    }
    return true;
  }
}
