 function checkEgn(EGN, dateOfBirth, gender) {
    let isValid = true;
    if(!checkYear(EGN, dateOfBirth.getFullYear())) {
        isValid = false;

        console.log(1);
    }
    if (!checkMonth(EGN, dateOfBirth.getMonth() + 1, dateOfBirth.getFullYear())) {
        isValid = false;
        console.log(2);
    }
    if(!checkDate(EGN, dateOfBirth.getDate())) {
        isValid = false;
        console.log(3);
    }
    if(!checkTheNinthDigit(EGN, gender)) {
        isValid = false;
        console.log(4);
    }
    if(!checkTheLastDigit(EGN))  {
        isValid = false;
        console.log(5);
    }
    return isValid;
}

 function checkYear(EGN, year) {
    if(EGN.slice(0, 2) == year.toString().slice(2, 4)) {
        return true;
    }
    
    return false;
}

 function checkMonth(EGN, month, year) {
     if(year < 2000) {

         if(parseInt(EGN.slice(2, 4)) == month) {
             return true;
        }
        return false;
    } else {
        if(parseInt(EGN.slice(2, 4)) == month + 40) {
            return true;
        }
        return false;
    }

}

 function checkDate(EGN, date) {
    if(parseInt(EGN.slice(4, 6)) == date) {
        return true;
    }
    return false;
}

 function checkTheNinthDigit(EGN, gender) {
    if(gender == 'Female') {
        if(parseInt(EGN[8]) % 2 != 0) {
            return true;
        } 
        return false;
    } else if (gender == 'Male') {
        if(parseInt(EGN[8]) % 2 == 0) {
            return true;
        } 
        return false;
    } 
}

 function checkTheLastDigit(EGN) {
    let firstDigit = parseInt(EGN[0]) * 2;
    let secondDigit = parseInt(EGN[1]) * 4;
    let thirdDigit = parseInt(EGN[2]) * 8;
    let fourthDigit = parseInt(EGN[3]) * 5;
    let fifthDigit = parseInt(EGN[4]) * 10
    let sixthDigit = parseInt(EGN[5]) * 9;
    let seventhDigit = parseInt(EGN[6]) * 7;
    let eighthDigit = parseInt(EGN[7]) * 3;
    let ninthDigit = parseInt(EGN[8]) * 6;
    
    let sum = firstDigit + secondDigit + thirdDigit + fourthDigit + fifthDigit + sixthDigit + seventhDigit + eighthDigit + ninthDigit;

    let controlDigit = sum % 11;

    if(controlDigit < 10) {
        if(parseInt(EGN[9]) == controlDigit) {
            return true;
        }
        return false;
    } else if(controlDigit == 10) {
        if(parseInt(EGN[9]) == 0) {
            return true;
        }
        return false;
    }
}

module.exports = {checkEgn}