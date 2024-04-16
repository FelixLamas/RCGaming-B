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
  return characteristic.length >= 4 && characteristic.length <= 1000;
}
module.exports = {
  validateName,
  validateCategory,
  validateDescription,
  validatePrice,
  validateStock,
  validateImageUrl,
  validateCharacteristic,
};
