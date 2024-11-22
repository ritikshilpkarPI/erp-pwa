const isPhoneNumberValid = (phoneNumber: string) =>
  phoneNumber.length === 10 && phoneNumber.replace(/\D/g, "") === phoneNumber;

export default isPhoneNumberValid;
