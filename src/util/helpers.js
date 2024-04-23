const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword =
  /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

function validateEmail(email) {
  return regexEmail.test(email);
}

function validatePassword(password) {
  return regexPassword.test(password);
}

function validaNameUser(nameUser) {
  const regexName =
    /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+(?:\s+[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+)*$/;
  return (
    nameUser.trim().length >= 8 &&
    nameUser.trim().length <= 100 &&
    regexName.test(nameUser)
  );
}

function validateName(name) {
  if (name.trim().length >= 4 && name.trim().length <= 50) {
    return true;
  } else {
    return false;
  }
}

function validateCategory(category) {
  return category.trim().length !== 0 && category !== undefined;
}

function validateDescription(description) {
  return description.trim().length >= 4 && description.trim().length <= 500;
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
  characteristic.forEach((element) => {
    if (element.trim().length === 0) {
      return false;
    }
  });
  return true;
}

function validateStockUpdateDate(stockUpdateDate) {
  const regexFecha = /^\d{4}-\d{2}-\d{2}$/;
  return regexFecha.test(stockUpdateDate) && stockUpdateDate > "2024-04-16";
}
module.exports = {
  validateName,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
  validateImageUrl,
  validateCharacteristic,
  validateStockUpdateDate,
  validateEmail,
  validatePassword,
  validaNameUser,
};
