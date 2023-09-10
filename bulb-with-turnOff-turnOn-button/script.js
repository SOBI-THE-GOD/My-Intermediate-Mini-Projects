let turnedOffBulb = document.createElement('img');
let isTurnedOn = false ;
let turnOffOnIcon = document.createElement('img');
let pictureDiv = document.getElementById('bulbPicture');
let bottun = document.createElement('button');
let bottunDiv = document.getElementById('bottunDiv');
turnedOffBulb.setAttribute('src' , 'glowing-turned-off-electric-light-bulbs-light-bulb-icon-electricity-off-template_265657-3222.png');
pictureDiv.append(turnedOffBulb);
pictureDiv.style.textAlign = 'center';
bottunDiv.append(bottun)
bottunDiv.style.textAlign = 'center';
turnOffOnIcon.setAttribute('src' , 'turn-on-icon.png');
bottun.append(turnOffOnIcon);
turnOffOnIcon.style.height = '46px';
bottun.style.border = 'none';
bottun.style.borderRadius = '50%';
bottun.style.backgroundColor = 'rgb(97, 97, 97)';
function onClicked() {
    switch (isTurnedOn) {
        case false:
            turnedOffBulb.src = 'glowing-turned-off-electric-light-bulbs-light-bulb-icon-electricity-off-template_265657-3223.png';
            turnOffOnIcon.src = 'turn-off-icon.png';
            isTurnedOn = true ;
            break;
    
        default:
            turnedOffBulb.src = 'glowing-turned-off-electric-light-bulbs-light-bulb-icon-electricity-off-template_265657-3222.png';
            turnOffOnIcon.src = 'turn-on-icon.png';
            isTurnedOn = false ;
            break;
    }
    
}

bottun.setAttribute('onclick' , 'onClicked()')







