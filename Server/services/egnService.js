 function checkEgn(EGN, dateOfBirth, gender) {
    if(!checkYear(EGN, dateOfBirth.getFullYear())) {
        return {isValid: false, message: "Date of Birth and EGN doesn't match!"};    
    }
    if (!checkMonth(EGN, dateOfBirth.getMonth() + 1, dateOfBirth.getFullYear())) {
        return {isValid: false, message: "Date of Birth and EGN doesn't match!"};    
    }
    if(!checkDate(EGN, dateOfBirth.getDate())) {
        return {isValid: false, message: "Date of Birth and EGN doesn't match!"};    
    }
    if(!checkTheNinthDigit(EGN, gender)) {
        return {isValid: false, message: "Gender and EGN doesn't match!"};    
    }
    if(!checkTheLastDigit(EGN))  {
        return {isValid: false, message: "EGN is invalid!"};    
    }
    return {isValid: true, message: "EGN is valid!"};
}

 function checkYear(EGN, year) {
    return EGN.slice(0, 2) == year.toString().slice(2, 4)
}

 function checkMonth(EGN, month, year) {
     if(year < 2000) {
         return parseInt(EGN.slice(2, 4)) == month
    } else {
        return parseInt(EGN.slice(2, 4)) == month + 40
    }

}

 function checkDate(EGN, date) {
    return parseInt(EGN.slice(4, 6)) == date;
 }

 function checkTheNinthDigit(EGN, gender) {
    if(gender == 'Female') {
        return parseInt(EGN[8]) % 2 != 0
    } else if (gender == 'Male') {
        return parseInt(EGN[8]) % 2 == 0
    } 
}

 function checkTheLastDigit(EGN) {
    let splitEGN = EGN.split('').map(x => parseInt(x));
    let multiplayedEGN = splitEGN.map((x, index) => {
        return index == 0 ? x * 2
            : index == 1 ? x * 4
            : index == 2 ? x * 8
            : index == 3 ? x * 5
            : index == 4 ? x * 10
            : index == 5 ? x * 9
            : index == 6 ? x * 7
            : index == 7 ? x * 3
            : index == 8 ? x * 6
            : 0
    })

    console.log(multiplayedEGN);
    let sum = multiplayedEGN.reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    console.log(sum);
    let controlDigit = sum % 11;
    console.log(controlDigit);
    if(controlDigit < 10) {
        return parseInt(EGN[9]) == controlDigit
    } else if(controlDigit == 10) {
        return parseInt(EGN[9]) == 0
    }
}

module.exports = {checkEgn}