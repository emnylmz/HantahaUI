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


 export const TabTitle = (newTitle) => {
    return document.title=newTitle;
 };

 export function checkToken(cookieName) {
    // Tüm çerezleri alın ve bir dizi haline getirin
    const cookies = document.cookie.split(';');
  
    // Her çerezi kontrol edin
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Çerez adını arayın
      if (cookie.startsWith(cookieName + '=')) {
        // Çerez bulundu, içeriği alın
        const cookieValue = cookie.substring(cookieName.length + 1);
        return decodeURIComponent(cookieValue);
      }
    }
    // Çerez bulunamadı
    return null;
  }

  export function setTokenCookie(values){
    document.cookie = `hanTaha-auth-token=${values.token};`;
    localStorage.setItem('isAdmin', values.isAdmin);
  }

  export function clearCookieValue(cookieName) {
    document.cookie = `${cookieName}=; path=/;`;
  }
  
  
  
  
  
