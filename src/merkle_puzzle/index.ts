import { createCipheriv, CipherCCMTypes, getCiphers, createCipher, createDecipher } from 'crypto';
import { MerkleMessage } from './message';



const MESSAGES_COUNT = 10;
const WEAK_KEY_MAX = 100;
const MESSAGE_NUMBER_MIN = 1000;
const MESSAGE_NUMBER_MAX = 10000;
const MESSAGE_KEY_MIN = 1000000;
const MESSAGE_KEY_MAX = 100000000;

// Создаем MESSAGES_COUNT сообщений
let map: { [number: string]: MerkleMessage } = {};
const messages: MerkleMessage[] = Array.from(Array(MESSAGES_COUNT)).map((_, i) => {
   const message: MerkleMessage = {
       number: Math.floor(Math.random() * (MESSAGE_NUMBER_MAX - MESSAGE_NUMBER_MIN)) + MESSAGE_NUMBER_MIN,
       key: Math.floor(Math.random() * (MESSAGE_KEY_MAX - MESSAGE_KEY_MIN)) + MESSAGE_KEY_MIN,
   };
   map[ message.number ] = message;
   console.log(`Сообщение ${i}: key: ${message.key}, id: ${message.number}`);

   return message;
});

// Bob шифрует и отправляет Alice
const encryptedMessages = messages.map(message => {
    const weakKey = (Math.floor(Math.random() * (WEAK_KEY_MAX - 1)) + 1).toString();
    const weakCipher = createCipher('blowfish', weakKey);

    let encrypted = weakCipher.update(JSON.stringify(message), 'utf8', 'hex');
    encrypted += weakCipher.final('hex');
    return encrypted;
});

const index = Math.floor(Math.random() * (MESSAGES_COUNT - 1));
console.log(`Alice выбрала ${index} зашифрованное слабым ключом сообщение`);

const encryptedMessage = encryptedMessages[index];

for (let i = 1; i <= 100; i++) {
    const weakDecipher = createDecipher('blowfish', i.toString());

    try {
        let decrypted = weakDecipher.update(encryptedMessage, 'hex', 'utf8');
        decrypted += weakDecipher.final('utf8');
        const message = <MerkleMessage> JSON.parse(decrypted);
        console.log(`Взломанное сообщение: key: ${message.key}, number: ${message.number}`)
    } catch (e) {

    }
}


