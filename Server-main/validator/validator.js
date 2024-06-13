const Validator = {
      CheckDate : (dateInput,secondDate) => {
        const date = new Date(dateInput);
        const dateNow = new Date(secondDate);
        console.log("date 1 :" + date + " date 2 :" + dateNow);
        if(date < dateNow){
            return false;
        }
        return true;
    },
    checkString : (dataInput) => {
        const pattern = /^[a-zA-ZÀ-Ỹà-ỹ\s]+$/;
        return pattern.test(dataInput);
    },
    checkEmail : (dataInput) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(dataInput)) {
            return false; // Invalid email format
          }
        const domain = dataInput.split('@')[1];
        return domain.toLowerCase() === 'gmail.com' || domain.toLowerCase() === 'fpt.edu.vn' || domain.toLowerCase() === 'gmail.com.vn';
    },
    isValidPhoneNumber : (dataInput) => {
        const pattern = /^\d{10}$/;
        return pattern.test(dataInput);
    },
    checkLengthsString : (dataInput,lengths) => {
        return dataInput.length > lengths;
    },
    checkNumberInMinMax : (number,min,max) => {
        return number >= min && number <= max;
    }
}
export default Validator;