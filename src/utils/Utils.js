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


