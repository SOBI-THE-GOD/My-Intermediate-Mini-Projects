// *userName input validation
let userNameInput = document.getElementById('userNameInput');
let userNameValidationDiv = document.getElementById('validationMassageUserName');
let userNameinputLength = 0 ;
let userNameInputArr = [] ;
let firstLetterCapitalFlag = false ;
let validateUserName = () => {
    userNameinputLength = userNameInput.value
    userNameinputLength = userNameinputLength.length;
    userNameInputArr = userNameInput.value.split('');
    switch (userNameInputArr[0]) {
    case 'A':
        firstLetterCapitalFlag = true ;
        break;
    case 'B':
        firstLetterCapitalFlag = true ;
        break;
    case 'C':
        firstLetterCapitalFlag = true ;
        break;
    case 'D':
        firstLetterCapitalFlag = true ;
        break;
    case 'E':
        firstLetterCapitalFlag = true ;
        break;
    case 'F':
        firstLetterCapitalFlag = true ;
        break;
    case 'G':
        firstLetterCapitalFlag = true ;
        break;
    case 'H':
        firstLetterCapitalFlag = true ;
        break;
    case 'I':
        firstLetterCapitalFlag = true ;
        break;
    case 'J':
        firstLetterCapitalFlag = true ;
        break;
    case 'K':
        firstLetterCapitalFlag = true ;
        break;
    case 'L':
        firstLetterCapitalFlag = true ;
        break;
    case 'M':
        firstLetterCapitalFlag = true ;
        break;
    case 'N':
        firstLetterCapitalFlag = true ;
        break;
    case 'O':
        firstLetterCapitalFlag = true ;
        break;
    case 'P':
        firstLetterCapitalFlag = true ;
        break;
    case 'Q':
        firstLetterCapitalFlag = true ;
        break;
    case 'R':
        firstLetterCapitalFlag = true ;
        break;
    case 'S':
        firstLetterCapitalFlag = true ;
        break;
    case 'T':
        firstLetterCapitalFlag = true ;
        break;
    case 'U':
        firstLetterCapitalFlag = true ;
        break;
    case 'V':
        firstLetterCapitalFlag = true ;
        break;
    case 'W':
        firstLetterCapitalFlag = true ;
        break;
    case 'X':
        firstLetterCapitalFlag = true ;
        break;
    case 'Y':
        firstLetterCapitalFlag = true ;
        break;
    case 'Z':
        firstLetterCapitalFlag = true ;
        break;
    default:
        userNameValidationDiv.style.display = 'block';
        userNameValidationDiv.innerHTML = 'First charactar should be capital letter !';
        break;
    }
    if (userNameinputLength < 10) {
            userNameValidationDiv.style.display = 'block';
            userNameValidationDiv.innerHTML = 'User Name should be more than 10 charactars !';
            
    };
    if (userNameinputLength >= 10 && firstLetterCapitalFlag) {
            userNameValidationDiv.style.display = 'none';
    };
};
// *passWord input validation
let passWordInput = document.getElementById('passWordInput');
let passWordInputLength = 0 ;
let passWordValidationDiv = document.getElementById('validationMassagePassWord');
let passWordInputArr = [];
let hasCapitalLetter = false ;
let hasNumberChar = false;
let validatePassWord = () => {
    passWordInputLength = passWordInput.value.length ;
    passWordInputArr = passWordInput.value.split('');
    if (passWordInputLength < 8) {
        passWordValidationDiv.innerHTML = 'Password must have 8 or more characters !';
        passWordValidationDiv.style.display = 'block';
    };
    passWordInputArr.forEach(element => {
    switch (element) {
        case 'A':
            hasCapitalLetter = true ;
            break;
        case 'B':
            hasCapitalLetter = true ;
            break;
        case 'C':
            hasCapitalLetter = true ;
            break;
        case 'D':
            hasCapitalLetter = true ;
            break;
        case 'E':
            hasCapitalLetter = true ;
            break;
        case 'F':
            hasCapitalLetter = true ;
            break;
        case 'G':
            hasCapitalLetter = true ;
            break;
        case 'H':
            hasCapitalLetter = true ;
            break;
        case 'I':
            hasCapitalLetter = true ;
            break;
        case 'J':
            hasCapitalLetter = true ;
            break;
        case 'K':
            hasCapitalLetter = true ;
            break;
        case 'L':
            hasCapitalLetter = true ;
            break;
        case 'M':
            hasCapitalLetter = true ;
            break;
        case 'N':
            hasCapitalLetter = true ;
            break;
        case 'O':
            hasCapitalLetter = true ;
            break;
        case 'P':
            hasCapitalLetter = true ;
            break;
        case 'Q':
            hasCapitalLetter = true ;
            break;
        case 'R':
            hasCapitalLetter = true ;
            break;
        case 'S':
            hasCapitalLetter = true ;
            break;
        case 'T':
            hasCapitalLetter = true ;
            break;
        case 'U':
            hasCapitalLetter = true ;
            break;
        case 'V':
            hasCapitalLetter = true ;
            break;
        case 'W':
            hasCapitalLetter = true ;
            break;
        case 'X':
            hasCapitalLetter = true ;
            break;
        case 'Y':
            hasCapitalLetter = true ;
            break;
        case 'Z':
            hasCapitalLetter = true ;
            break;
        };
    });
    if (hasCapitalLetter === false) {
        passWordValidationDiv.innerHTML = 'Password must have one or more capital letter !';
        passWordValidationDiv.style.display = 'block';
    }
    passWordInputArr.forEach(element => {
        if (isNaN(element) === false) {
            hasNumberChar = true ;
        };
    });
    if (!hasNumberChar) {
        passWordValidationDiv.innerHTML = 'Password must have one or more number in it !';
        passWordValidationDiv.style.display = 'block';
    };
    if (passWordInputLength >= 8 && hasCapitalLetter && hasNumberChar) {
        passWordValidationDiv.style.display = 'none';
    };
};
// *show or hide password input
let showPassWordImg = document.getElementById('showPassWordImg');
let showHidePassWord = () => {
    if (passWordInput.getAttribute('type') === 'password') {
        passWordInput.type = 'text';
        showPassWordImg.src = 'hide.png';
    } else {
        passWordInput.type = 'password';
        showPassWordImg.src = 'show-password.png';
    };
};


