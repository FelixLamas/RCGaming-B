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

function validateCategory(category_id) {
  return category_id.trim().length !== 0 && category_id !== undefined;
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

module.exports = {
  validateName,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
  validateImageUrl,
  validateCharacteristic,
  validateEmail,
  validatePassword,
  validaNameUser,
};
