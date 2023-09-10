const $ = document ;
let altKey , shiftKey , ctrlKey = false ;
let keysPressedIndex = 0 ;
let enteredKeyElem = $.querySelector('.key-entered') ;
let keyCodeInput = $.getElementById('key-code') ;
const pressedKeys = new Set(); 
const activatedKeys = new Set();
let key = '' ;
let keyCode = 0 ;
let code = '' ;
const keysKeyBoard = [
    {key: 'Escape', code: 'Escape', keyCode: 27},
    {key: 'F1', code: 'F1', keyCode: 112},
    {key: 'F2', code: 'F2', keyCode: 113},
    {key: 'F3', code: 'F3', keyCode: 114},
    {key: 'F4', code: 'F4', keyCode: 115},
    {key: 'F5', code: 'F5', keyCode: 116},
    {key: 'F6', code: 'F6', keyCode: 117},
    {key: 'F7', code: 'F7', keyCode: 118},
    {key: 'F8', code: 'F8', keyCode: 119},
    {key: 'F9', code: 'F9', keyCode: 120},
    {key: 'F10', code: 'F10', keyCode: 121},
    {key: 'F11', code: 'F11', keyCode: 122},
    {key: 'F12', code: 'F12', keyCode: 123},
    {key: '1', code: 'Digit1', keyCode: 49},
    {key: '2', code: 'Digit2', keyCode: 50},
    {key: '3', code: 'Digit3', keyCode: 51},
    {key: '4', code: 'Digit4', keyCode: 52},
    {key: '5', code: 'Digit5', keyCode: 53},
    {key: '6', code: 'Digit6', keyCode: 54},
    {key: '7', code: 'Digit7', keyCode: 55},
    {key: '8', code: 'Digit8', keyCode: 56},
    {key: '9', code: 'Digit9', keyCode: 57},
    {key: '0', code: 'Digit0', keyCode: 48},
    {key: '-', code: 'Minus', keyCode: 189},
    {key: '=', code: 'Equal', keyCode: 187},
    {key: 'Backspace', code: 'Backspace', keyCode: 8},
    {key: 'Tab', code: 'Tab', keyCode: 9},
    {key: 'q', code: 'KeyQ', keyCode: 81},
    {key: 'w', code: 'KeyW', keyCode: 87},
    {key: 'e', code: 'KeyE', keyCode: 69},
    {key: 'r', code: 'KeyR', keyCode: 82},
    {key: 't', code: 'KeyT', keyCode: 84},
    {key: 'y', code: 'KeyY', keyCode: 89},
    {key: 'u', code: 'KeyU', keyCode: 85},
    {key: 'i', code: 'KeyI', keyCode: 73},
    {key: 'o', code: 'KeyO', keyCode: 79},
    {key: 'p', code: 'KeyP', keyCode: 80},
    {key: '[', code: 'BracketLeft', keyCode: 219},
    {key: ']', code: 'BracketRight', keyCode: 221},
    {key: '\\', code: 'Backslash', keyCode: 220},
    {key: 'CapsLock', code: 'CapsLock', keyCode: 20},
    {key: 'a', code: 'KeyA', keyCode: 65},
    {key: 's', code: 'KeyS', keyCode: 83},
    {key: 'd', code: 'KeyD', keyCode: 68},
    {key: 'f', code: 'KeyF', keyCode: 70},
    {key: 'g', code: 'KeyG', keyCode: 71},
    {key: 'h', code: 'KeyH', keyCode: 72},
    {key: 'j', code: 'KeyJ', keyCode: 74},
    {key: 'k', code: 'KeyK', keyCode: 75},
    {key: 'l', code: 'KeyL', keyCode: 76},
    {key: ';', code: 'Semicolon', keyCode: 186},
    {key: "'", code: 'Quote', keyCode: 222},
    {key: 'Enter', code: 'Enter', keyCode: 13},
    {key: 'Shift', code: 'ShiftLeft', keyCode: 16},
    {key: 'z', code: 'KeyZ', keyCode: 90},
    {key: 'x', code: 'KeyX', keyCode: 88},
    {key: 'c', code: 'KeyC', keyCode: 67},
    {key: 'v', code: 'KeyV', keyCode: 86},
    {key: 'b', code: 'KeyB', keyCode: 66},
    {key: 'n', code: 'KeyN', keyCode: 78},
    {key: 'm', code: 'KeyM', keyCode: 77},
    {key: ',', code: 'Comma', keyCode: 188},
    {key: '.', code: 'Period', keyCode: 190},
    {key: '/', code: 'Slash', keyCode: 191},
    {key: 'Shift', code: 'ShiftRight', keyCode: 16},
    {key: 'ArrowUp', code: 'ArrowUp', keyCode: 38},
    {key: 'Control', code: 'ControlLeft', keyCode: 17},
    {key: 'Meta', code: 'MetaLeft', keyCode: 91},
    {key: 'Alt', code: 'AltLeft', keyCode: 18},
    {key: ' ', code: 'Space', keyCode: 32},
    {key: 'Alt', code: 'AltRight', keyCode: 18},
    {key: 'ContextMenu', code: 'ContextMenu', keyCode: 93},
    {key: 'Control', code: 'ControlRight', keyCode: 17},
    {key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37},
    {key: 'ArrowDown', code: 'ArrowDown', keyCode: 40},
    {key: 'ArrowRight', code: 'ArrowRight', keyCode: 39},
    {key: 'A', code: 'KeyA', keyCode: 65},
    {key: 'S', code: 'KeyS', keyCode: 83},
    {key: 'D', code: 'KeyD', keyCode: 68},
    {key: 'F', code: 'KeyF', keyCode: 70},
    {key: 'G', code: 'KeyG', keyCode: 71},
    {key: 'H', code: 'KeyH', keyCode: 72},
    {key: 'J', code: 'KeyJ', keyCode: 74},
    {key: 'K', code: 'KeyK', keyCode: 75},
    {key: 'L', code: 'KeyL', keyCode: 76},
    {key: 'Q', code: 'KeyQ', keyCode: 81},
    {key: 'W', code: 'KeyW', keyCode: 87},
    {key: 'E', code: 'KeyE', keyCode: 69},
    {key: 'R', code: 'KeyR', keyCode: 82},
    {key: 'T', code: 'KeyT', keyCode: 84},
    {key: 'Y', code: 'KeyY', keyCode: 89},
    {key: 'U', code: 'KeyU', keyCode: 85},
    {key: 'I', code: 'KeyI', keyCode: 73},
    {key: 'O', code: 'KeyO', keyCode: 79},
    {key: 'P', code: 'KeyP', keyCode: 80},
    {key: 'Z', code: 'KeyZ', keyCode: 90},
    {key: 'X', code: 'KeyX', keyCode: 88},
    {key: 'C', code: 'KeyC', keyCode: 67},
    {key: 'V', code: 'KeyV', keyCode: 86},
    {key: 'B', code: 'KeyB', keyCode: 66},
    {key: 'N', code: 'KeyN', keyCode: 78},
    {key: 'M', code: 'KeyM', keyCode: 77}] ;
const keyElems = $.querySelectorAll('.key-keyboard') ;
let isCapsLockOn = false ;
let mouseDownedClass = '' ;
let mouseDownedKey = '' ;
let mouseDownedKeyObj = {} ;
let isInputFocused = false ;
keyElems.forEach(element => {
    element.addEventListener('mousedown' , keyMousClickHandler);
    element.addEventListener('mouseup' , keyMouseUpHandler);
});
function keyMousClickHandler(event) {
    keyClassFinder(event);
    capseLockHandler();
    onOffCapsKeyBoardHandler();
    pressedKeys.add(mouseDownedKeyObj.key);
    activatedKeys.add(mouseDownedKeyObj.code);
    keyDescribes(mouseDownedKeyObj);
    updateEnteredKeys();
    keyActivator();
    keyCodeUpdaterDown();
    keyCodeUpdaterUp();
    keyUpdaterDown();
    keyUpdaterUp();
    codeUpdaterDown();
    codeUpdaterUp();
    keyCodInputWriter();
};
function keyMouseUpHandler() {
    keyDescribes(mouseDownedKeyObj);
    pressedKeys.delete(mouseDownedKeyObj.key);
    keyDeActivator();
    activatedKeys.delete(mouseDownedKeyObj.code);
    updateEnteredKeys();
    keyCodeUpdaterDown();
    keyCodeUpdaterUp();
    keyUpdaterDown();
    keyUpdaterUp();
    codeUpdaterDown();
    codeUpdaterUp();
};
function keyClassFinder(event) {
    mouseDownedClass = event.target.getAttribute('class');
    mouseDownedClass = mouseDownedClass.split(' ');
    mouseDownedClass = mouseDownedClass[mouseDownedClass.length - 1];
}
function capseLockHandler() {
    if (mouseDownedClass === 'CapsLock') {
        if (isCapsLockOn) {
            isCapsLockOn = false ;
            $.getElementById('CapsLock').style.borderBottom = '1px solid #444' ;
        } else {
            isCapsLockOn = true ;
            $.getElementById('CapsLock').style.borderBottom = '3px solid red' ;
        };
    };
};
function onOffCapsKeyBoardHandler() {
    if (mouseDownedClass.length === 4) {
        let keyObjIndex = 0 ;
        if (isCapsLockOn) {
            mouseDownedKey = mouseDownedClass[3] ;
            keyObjIndex = keysKeyBoard.findIndex(element => {
                return element.key === mouseDownedKey ;
            });
            mouseDownedKeyObj = keysKeyBoard[keyObjIndex];
        } else {
            mouseDownedKey = mouseDownedClass[3].toLowerCase() ;
            keyObjIndex = keysKeyBoard.findIndex(element => {
                return element.key === mouseDownedKey ;
            });
            mouseDownedKeyObj = keysKeyBoard[keyObjIndex];
        };
    } else {
        keyObjIndex = keysKeyBoard.findIndex(element => {
            return element.code === mouseDownedClass ;
        });
        mouseDownedKeyObj = keysKeyBoard[keyObjIndex];
    };
};
function keyCodInputWriter() {
    if (isInputFocused) {
        keyCodeInput.value = mouseDownedKeyObj.code ;
    };
};
$.body.addEventListener('keydown', event => {
    event.preventDefault();
    if (!event.repeat) {
        pressedKeys.add(event.key);
        activatedKeys.add(event.code);
        keyDescribes(event);
        updateEnteredKeys();
        keyActivator();
        keyCodeUpdaterDown();
        keyCodeUpdaterUp();
        keyUpdaterDown();
        keyUpdaterUp();
        codeUpdaterDown();
        codeUpdaterUp();
    };
});

$.body.addEventListener('keyup', event => {
    keyDescribes(event);
    pressedKeys.delete(event.key);
    keyDeActivator();
    activatedKeys.delete(event.code);
    updateEnteredKeys();
    keyCodeUpdaterDown();
    keyCodeUpdaterUp();
    keyUpdaterDown();
    keyUpdaterUp();
    codeUpdaterDown();
    codeUpdaterUp();
});
function keyDescribes(event) {
    if (Array.from(pressedKeys).length === 1) {
        key = event.key;
        code = event.code;
        keyCode = event.keyCode;
    };
};
function keyCodeUpdaterDown() {
    let keyCodeNumber = 0 ;
    let keyCodeTimer = setInterval(() => {
        $.getElementById('keyCode').innerHTML = keyCodeNumber ;
        if (Number($.getElementById('keyCode').innerHTML) === keyCode) {
            clearInterval(keyCodeTimer);
        } else if (keyCode === '--') {
            $.getElementById('keyCode').innerHTML = keyCode ;
            clearInterval(keyCodeTimer);
        };
        keyCodeNumber++
    } , 5);
};
function keyCodeUpdaterUp() {
    if (Array.from(pressedKeys).length === 0 || Array.from(pressedKeys).length > 1) {
        keyCode = '--' ;
    };
};
function keyUpdaterDown() {
    let finalKey = '----' ;
    if (Array.from(pressedKeys).length === 1) {
        finalKey = key ;
    }
    $.getElementById('describe-key').innerHTML = finalKey ;
    // let keyIndex = 0 ;
    // let finalKey = '' ;
    // let keyTimer = setInterval(() => {
    //     finalKey += key[keyIndex];
    //     $.getElementById('describe-key').innerHTML = finalKey ;
    //     if (keyIndex === key.length - 1) {
    //         clearInterval(keyTimer);
    //     };
    //     keyIndex++
    // }, 50);
};
function codeUpdaterDown() {
    let finalCode = '----' ;
    if (Array.from(pressedKeys).length === 1) {
        finalCode = code ;
    }
    $.getElementById('code').innerHTML = finalCode ;
    // let codeIndex = 0 ;
    // let finalCode = '' ;
    // let codeTimer = setInterval(() => {
    //     finalCode += code[codeIndex] ;
    //     $.getElementById('code').innerHTML = finalCode ;
    //     if (codeIndex === code.length - 1) {
    //         clearInterval(codeTimer);
    //     };
    //     codeIndex++
    // }, 50);
};
function codeUpdaterUp() {
    if (Array.from(pressedKeys).length === 0 || Array.from(pressedKeys).length > 1) {
        code = '----'
    };
};
function keyUpdaterUp() {
    if (Array.from(pressedKeys).length === 0 || Array.from(pressedKeys).length > 1) {
        key = '----' ;
    };
};
function keyActivator() {
    Array.from(activatedKeys).forEach(element => {
        $.getElementById(element).classList.add('active' , 'hover');
    });
};
function keyDeActivator() {
    Array.from(activatedKeys).forEach(element => {
        $.getElementById(element).classList.remove('active' , 'hover');
    });
};
function updateEnteredKeys() {
    const enteredKeyTxt = Array.from(pressedKeys).join(' + ');
    enteredKeyElem.textContent = enteredKeyTxt;
};
keyCodeInput.addEventListener('change' , (event) => {
    let keyIndex = 0 ;
    keyIndex = keysKeyBoard.findIndex(element => {
        return element.code === event.target.value ;
    });
    $.getElementById('describe-key').innerHTML = keysKeyBoard[keyIndex].key;
    $.getElementById('keyCode').innerHTML = keysKeyBoard[keyIndex].keyCode;
    $.getElementById('code').innerHTML = keysKeyBoard[keyIndex].code;
    if (event.target.value === '') {
        $.getElementById('describe-key').innerHTML = '--';
        $.getElementById('keyCode').innerHTML = '--';
        $.getElementById('code').innerHTML = '--';
    };
});
console.log(keyCodeInput.value);
keyCodeInput.addEventListener('input' , event => {
    event.target.style.width = event.target.value.length + 6 + 'ch' ;
});
keyCodeInput.addEventListener('focusin' , event => {
    isInputFocused = true ;
    event.target.style.width = '51.25vw';
});
keyCodeInput.addEventListener('focusout' , event => {
    isInputFocused = false ;
    if (event.target.value.length < 1) {
        event.target.style.width =  '3.661vw' ;
    }else {
        event.target.style.width = event.target.value.length + 4 + 'ch'
    };
});
