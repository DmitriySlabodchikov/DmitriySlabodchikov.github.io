import * as defaults from "../configs/defaults.js";

let spaceship = defaults.spaceship,
	resources = defaults.resources,
	events = defaults.events;

loadGame();

function loadGame(){
	const urlString = window.location.href;
	const url = new URL(urlString);
	const save = url.searchParams.get("save");
	if(save){
		const decrypted = decryptData(save);
		if(decrypted){
			spaceship = decrypted[0];
			resources = decrypted[1];
			events = decrypted[2];
			setValues();
		}
	}
}

function encryptData(){
	let serialized = "";

	for(let i = 0; i < arguments.length; i++)
		serialized += "|" + JSON.stringify(arguments[i]);

	return enc(serialized.slice(1));
}

function decryptData(str){
	let decrypted = dec(str);

	if(!decrypted)
		return;

	decrypted = decrypted.split("|");
	for(let i = 0; i < decrypted.length; i++){
		decrypted[i] = JSON.parse(decrypted[i]);
	}

	return decrypted;
}

function enc(plainText){
    var b64 = CryptoJS.AES.encrypt(plainText, "SpaceSave").toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;
}

function dec(cipherText){
   var reb64 = CryptoJS.enc.Hex.parse(cipherText);
   var bytes = reb64.toString(CryptoJS.enc.Base64);
   var decrypt = CryptoJS.AES.decrypt(bytes, "SpaceSave");
   var plain = decrypt.toString(CryptoJS.enc.Utf8);
   return plain;
}

function setValues(){
	document.getElementById("food").innerHTML = resources.food;
	document.getElementById("research").innerHTML = resources.research;
	document.getElementById("money").innerHTML = resources.money;
	document.getElementById("people").innerHTML = resources.people;
}