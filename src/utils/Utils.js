import * as alertify from 'alertifyjs';

export const checkVariableNullOrUndefined = (input) => {
   
    if(input===undefined || input===null)
        return true;
   return false;
};

export const checkStringVariableEmpty = (input) => {
   
    if(input==='')
        return true;
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

export const showError=(message)=>{
  alertify.error(message);
}

export const showSuccess=(message)=>{
  alertify.success(message);
}
 export const TabTitle = (newTitle) => {
    return document.title=newTitle;
 };

 export function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

  export function setTokenCookie(values){
    document.cookie = `hanTaha-auth-token=${values.token};`;
    document.cookie = `isAdmin=${values.isAdmin ? 'true' : 'false'};`;
    document.cookie = `fullname=${values.fullname};`;
    document.cookie = `username=${values.username};`;
    document.cookie = `email=${values.email};`;
  }

  export function clearCookieValue(cookieName) {
    document.cookie = `${cookieName}=; path=/;`;
  }

  export function clearCookies(){
    clearCookieValue('hanTaha-auth-token');
    clearCookieValue('isAdmin');
  }

  export function setLocalStorageItem(key,value){
    localStorage.setItem(key, value);
  }

  export function getLocalStorageItem(key){
    localStorage.getItem(key);
  }
  
  
  
  
  
