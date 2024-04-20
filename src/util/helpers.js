const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

function validateEmail(email){
    return regexEmail.test(email)
}

function validatePassword(password){
    return  regexPassword.test(password)
}


function validateName(name) {
  if (name.length >= 4 && name.length <= 50) {
    return true;
  } else {
    return false;
  }
}

function validateCategory(category) {
  return category.length !== 0 && category !== undefined;
}

function validateDescription(description) {
  return description.length >= 4 && description.length <= 500;
}

function validatePrice(price) {
  return price >= 100;
}
function validateStock(stock) {
  return stock >= 1;
}

function validateImageUrl(imageUrl) {
  const regexUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  return regexUrl.test(imageUrl);
}

function validateCharacteristic(characteristic) {
  return characteristic.length >= 1;
}
module.exports = {
  validateName,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
  validateImageUrl,
  validateCharacteristic,
  validateEmail,
  validatePassword
};
