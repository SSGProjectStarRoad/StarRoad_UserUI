var empJ = /\s/g;
var nameJ = /^[가-힣]{2,6}$/;
var nicknameJ = /^[a-zA-Z0-9가-힣!@#$%^&*()_+|<>?:{}]{3,10}$/;
var passwordJ =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+|<>?:{}])[A-Za-z\d!@#$%^&*()_+|<>?:{}]{8,}$/;
var phoneJ = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;

function validateName(name) {
  const isValid = !empJ.test(name) && nameJ.test(name);
  console.log('validateName:', name, isValid);
  return isValid;
}

function validateNickname(nickname) {
  const isValid = !empJ.test(nickname) && nicknameJ.test(nickname);
  console.log('validateNickname:', nickname, isValid);
  return isValid;
}

function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(email).toLowerCase());
  console.log('validateEmail:', email, isValid);
  return isValid;
}

function validatePassword(password) {
  const isValid = passwordJ.test(password);
  console.log('validatePassword:', password, isValid);
  return isValid;
}

function validatePhone(phone) {
  const isValid = !empJ.test(phone) && phoneJ.test(phone);
  console.log('validatePhone:', phone, isValid);
  return isValid;
}

function validateYear(year) {
  const yearNum = parseInt(year, 10);
  const currentYear = new Date().getFullYear();
  const isValid =
    !isNaN(yearNum) && yearNum >= 1924 && yearNum <= currentYear - 14;
  console.log(
    'validateYear:',
    isValid ? 'valid year' : 'invalid year',
    yearNum,
  );
  return isValid;
}

function validateMonth(month) {
  const monthNum = parseInt(month, 10);
  const isValid = !isNaN(monthNum) && monthNum >= 1 && monthNum <= 12;
  console.log(
    'validateMonth:',
    isValid ? 'valid month' : 'invalid month',
    monthNum,
  );
  return isValid;
}

function validateDay(day) {
  const dayNum = parseInt(day, 10);
  const isValid = !isNaN(dayNum) && dayNum >= 1 && dayNum <= 31;
  console.log('validateDay:', isValid ? 'valid day' : 'invalid day', dayNum);
  return isValid;
}

function validateBirth(year, month, day) {
  const isYearValid = validateYear(year);
  const isMonthValid = validateMonth(month);
  const isDayValid = validateDay(day);
  const isValid = isYearValid && isMonthValid && isDayValid;

  console.log(
    'validateBirth:',
    isValid,
    isValid ? 'valid date' : 'invalid date',
    year,
    month,
    day,
  );
  return isValid;
}

export {
  validateName,
  validateNickname,
  validateEmail,
  validatePassword,
  validatePhone,
  validateYear,
  validateMonth,
  validateDay,
  validateBirth,
};
