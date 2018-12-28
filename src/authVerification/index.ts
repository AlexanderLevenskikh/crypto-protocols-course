import { createCipher, createDecipher } from "crypto";

const randomWords = require('random-words');

const MAC = 'mac sample';

const aliceKey = 'aliceKey';
const bobKey = 'bobKey';

console.log(`Alice создает ключ aliceKey, передает его Bob'y`);
console.log(`Bob создает ключ bobKey, передает его Alice`);

const aliceCipher = createCipher('blowfish', aliceKey);
const bobCipher = createCipher('blowfish', bobKey);
const aliceDecipher = createDecipher('blowfish', aliceKey);
const bobDecipher = createDecipher('blowfish', bobKey);

const aliceText = randomWords();
const bobText = randomWords();

console.log(`Alice шифрует текст "${aliceText}" ключом, полученным от Bob`);

let aliceTextEncByBobKey = bobCipher.update(aliceText, 'utf8', 'hex');
aliceTextEncByBobKey += bobCipher.final('hex');
console.log(`Шифртекст: ${aliceTextEncByBobKey}`);

console.log(`Bob шифрует текст "${bobText}" ключом, полученным от Alice`);

let bobTextEncByAliceKey = aliceCipher.update(bobText, 'utf8', 'hex');
bobTextEncByAliceKey += aliceCipher.final('hex');
console.log(`Шифртекст: ${bobTextEncByAliceKey}`);

console.log('Alice и Bob обмениваются половинками шифртекстов');
console.log(`Alice передает первую часть Bob: ${aliceTextEncByBobKey.slice(0, aliceTextEncByBobKey.length / 2)}`);
let bobReceived = aliceTextEncByBobKey.slice(0, aliceTextEncByBobKey.length / 2);
console.log(`Bob передает первую часть Alice: ${bobTextEncByAliceKey.slice(0, bobTextEncByAliceKey.length / 2)}`);
let aliceReceived = bobTextEncByAliceKey.slice(0, bobTextEncByAliceKey.length / 2);
console.log(`Alice передает вторую часть Bob: ${aliceTextEncByBobKey.slice(aliceTextEncByBobKey.length / 2)}`);
bobReceived += aliceTextEncByBobKey.slice(aliceTextEncByBobKey.length / 2);
console.log(`Bob передает вторую часть Alice: ${bobTextEncByAliceKey.slice(bobTextEncByAliceKey.length / 2)}`);
aliceReceived += bobTextEncByAliceKey.slice(bobTextEncByAliceKey.length / 2);

console.log('Alice и Bob осуществляют расшифрование полученных сообщений');
let aliceDecrypted = aliceDecipher.update(aliceReceived, 'hex', 'utf8');
aliceDecrypted += aliceDecipher.final('utf8');
console.log(`Alice расшифровала сообщение: ${aliceDecrypted}`);

let bobDecrypted = bobDecipher.update(bobReceived, 'hex', 'utf8');
bobDecrypted += bobDecipher.final('utf8');
console.log(`Bob расшифровал сообщение: ${bobDecrypted}`);

console.log('Alice и Bob шифруют полученные тексты при помощи MAC и отправляют друг другу');
const aliceMacCipher = createCipher('blowfish', MAC);
const bobMacCipher = createCipher('blowfish', MAC);
const aliceMacDecipher = createDecipher('blowfish', MAC);
const bobMacDecipher = createDecipher('blowfish', MAC);
let aliceEncodedMac = aliceMacCipher.update(aliceDecrypted, 'utf8', 'hex');
aliceEncodedMac += aliceMacCipher.final('hex');

let bobEncodedMac = bobMacCipher.update(bobDecrypted, 'utf8', 'hex');
bobEncodedMac += bobMacCipher.final('hex');

console.log(`Alice получила шифртекст ${bobEncodedMac} и Bob ${aliceEncodedMac}`);
let aliceDecodedMac = aliceMacDecipher.update(bobEncodedMac, 'hex', 'utf8');
aliceDecodedMac += aliceMacDecipher.final('utf8');

if (aliceDecodedMac === aliceText) {
    console.log('Alice подтверждает подлинность Bob');
} else {
    console.log('Где-то есть Eva');
}

let bobDecodedMac = bobMacDecipher.update(aliceEncodedMac, 'hex', 'utf8');
bobDecodedMac += bobMacDecipher.final('utf8');

if (bobDecodedMac === bobText) {
    console.log('Bob подтверждает подлинность Alice');
} else {
    console.log('Где-то есть Eva');
}
