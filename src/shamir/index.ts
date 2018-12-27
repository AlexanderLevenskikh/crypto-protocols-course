import { faststep, findReversed, mutuallyPrime, primeNumberRandomGenerator, randomKeyGenerator } from './utils';

const P = primeNumberRandomGenerator();
const secretKey = randomKeyGenerator(P);

const a = mutuallyPrime(P - 1 );
const aReversed = findReversed(a, P - 1);

const b = mutuallyPrime(P - 1 );
const bReversed = findReversed(b, P - 1);

console.log(`Секретный ключ Alice K=${secretKey}`);
console.log(`Alice выбирает случайное простое P=${P} и отправляет его Bob`);
console.log(`Alice выбирает 0<a<p-1 такое, что (a, p-1)=1. a=${a}`);
const keyInA = faststep(secretKey, a, P);
console.log(`Alice передает K^a mod p = ${keyInA}`);
const keyInAinB = faststep(keyInA, b, P);
console.log(`Bob передает (K^a)^b mod p = ${keyInAinB}`);
const keyInAinBinReversedA = faststep(keyInAinB, aReversed, P);
console.log(`Alice передает ((K^a)^b)^a^(-1) mod p = ${keyInAinBinReversedA}`);
const keyInAinBinReversedAInReversedB = faststep(keyInAinBinReversedA, bReversed, P);
console.log(`Bob получает ключ (((K^a)^b)^a^(-1))^b^(-1) mod p = ${keyInAinBinReversedAInReversedB}`);
