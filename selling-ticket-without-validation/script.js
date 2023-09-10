const iranStates = ['Alborz',
'Ardabil',
'AzarbaijanEast',
'AzarbaijanWest',
'Bushehr', 
'ChaharMahaalAndBakhtiari', 
'Fars', 
'Gilan', 
'Golestan', 
'Hamadan', 
'Hormozgan', 
'Ilam', 
'Isfahan', 
'Kerman', 
'Kermanshah', 
'KhorasanNorth', 
'KhorasanRazavi', 
'KhorasanSouth', 
'Khuzestan', 
'KohgiluyehAndBoyerAhmad', 
'Kurdistan', 
'Lorestan', 
'Markazi', 
'Mazandaran', 
'Qazvin', 
'Qom', 
'Semnan', 
'SistanAndBaluchestan', 
'Tehran', 
'Yazd', 
'Zanjan'];
const iranCities = {
Alborz: ['Karaj', 'Hashtgerd', 'Eslamshahr'],
Ardabil: ['Ardabil', 'Meshgin Shahr', 'Parsabad'],
AzarbaijanEast: ['Tabriz', 'Marand', 'Shabestar'],
AzarbaijanWest: ['Uroomia', 'Naghadeh', 'Piranshahr'],
Bushehr: ['Bushehr', 'Borazjan', 'Dashtestan'],
ChaharMahaalAndBakhtiari: ['Shahrekord', 'Boroujen', 'Kiar'],
Fars: ['Shiraz', 'Marvdasht', 'Firuzabad'],
Gilan: ['Rasht', 'Anzali', 'Souma'],
Golestan: ['Gorgan', 'Ali Abad', 'Gonbad'],
Hamadan: ['Hamadan', 'Malayer', 'Nahavand'],
Hormozgan: ['Bandar Abbas', 'Minab', 'Kangan'],
Ilam: ['Ilam', 'Dehloran', 'Mehran'],
Isfahan: ['Isfahan', 'Shahinshahr', 'Khomeyni Shahr'],
Kerman: ['Kerman', 'Rafsanjan', 'Jiroft'],
Kermanshah: ['Kermanshah', 'Sahneh', 'Kangavar'],
KhorasanNorth: ['Bojnurd', 'Mane', 'Esfarayen'],
KhorasanRazavi: ['Mashhad', 'Sabzevar', 'Neyshabur'],
KhorasanSouth: ['Birjand', 'Qaen', 'Darmian'],
Khuzestan: ['Ahvaz', 'Abadan', 'Khorramshahr'],
KohgiluyehAndBoyerAhmad: ['Yasuj', 'Gachsaran', 'Dehdasht'],
Kurdistan: ['Sanandaj', 'Baneh', 'Sarvabad'],
Lorestan: ['Khorramabad', 'Borujerd', 'Azna'],
Markazi: ['Arak', 'Saveh', 'Delijan'],
Mazandaran: ['Sari', 'Amol', 'Babol'],
Qazvin: ['Qazvin', 'Takestan', 'Abyek'],
Qom: ['Qom', 'Kahak', 'Jafariyeh'],
Semnan: ['Semnan', 'Damghan', 'Shahroud'],
SistanAndBaluchestan: ['Zahedan', 'Zabol', 'Chabahar'],
Tehran: ['Tehran', 'Rey', 'Varamin'],
Yazd: ["Yazd", "Ardakan", "Mehriz"],
Zanjan: ["Zanjan", "Abhar", "Tarom"]
};
let statesSelectElem = document.querySelector('#statesSelect');
let citiesSelectElem = document.querySelector('#citiesSelect');
let newOptionElem ;
iranStates.forEach(element => {
    newOptionElem = document.createElement('option');
    newOptionElem.setAttribute('value' , element) ;
    newOptionElem.innerHTML = element ;
    statesSelectElem.append(newOptionElem);
});
let stateCities = [] ;
let selectedCityOption = document.querySelector('#selectedOption');
statesSelectElem.addEventListener('change' , () => {
    citiesSelectElem.innerHTML = '' ;
    citiesSelectElem.append(selectedCityOption);
    stateCities = iranCities[statesSelectElem.value];
    stateCities.forEach(element => {
        newOptionElem = document.createElement('option');
        newOptionElem.setAttribute('value' , element) ;
        newOptionElem.classList.add('cityOption');
        newOptionElem.innerHTML = element ;
        citiesSelectElem.append(newOptionElem);
    });
});

