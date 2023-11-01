import * as alertify from 'alertifyjs';
import Cookies from 'js-cookie';

export const checkVariableNullOrUndefined = (input) => {
  if (input === undefined || input === null) return true;
  return false;
};

export const checkStringVariableEmpty = (input) => {
  if (input === '') return true;
  return false;
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const containsRequiredCharacters = (pass) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;
  return passwordRegex.test(pass);
};

export const showMultiLineError = (errors) => {
  showError(errors.join('\n'));
};

export const showError = (message) => {
  alertify.error(message);
};

export const showSuccess = (message) => {
  alertify.success(message);
};
export const TabTitle = (newTitle) => {
  return (document.title = newTitle);
};

export function setTokenCookie(values) {
  Cookies.set('hanTaha-auth-token', values.token, { expires: 1/24 })
  Cookies.set('isAdmin', values.isAdmin, { expires: 1/24 })
  Cookies.set('fullname', values.fullname, { expires: 1/24 })
  Cookies.set('username', values.username, { expires: 1/24 })
  Cookies.set('email', values.email, { expires: 1/24 })
}
export function getCookie(cookieName) {
 return Cookies.get(cookieName);
}

export function clearCookies() {
  Cookies.remove('hanTaha-auth-token');
  Cookies.remove('isAdmin');
  Cookies.remove('fullname');
  Cookies.remove('username');
  Cookies.remove('email');
}

export function logOutTransactions() {
  clearCookies();
  alertify.alert('Oops!','Oturumunuz sonlandı.Lütfen tekrar giriş yapınız.', function () {
    window.location.href = '/home';
  }).setting({
    'label':'Tamam'});
}

export function showAlert(title,message) {
  alertify.alert(title,message).setting({
    'label':'Tamam'});
}


export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

export function getLocalStorageItem(key) {
  localStorage.getItem(key);
}

export function isNumberArray(arr) {
  for (const element of arr) {
    if (typeof element !== 'number') {
      return false;
    }
  }
  return true;
}

export const logOutErrorCodes = [401, 403, 419, 429];
