function formatPhoneNumber(phoneNumber, countryCode = "1") {
  const onlyNumbers = phoneNumber.replace(/\D/g, "");
  return `${countryCode}${onlyNumbers}`;
}

module.exports = {
  formatPhoneNumber,
};
