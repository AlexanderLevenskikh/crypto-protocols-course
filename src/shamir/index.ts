import { findReversed, mutuallyPrime, pow, primeNumberRandomGenerator, randomKeyGenerator } from './utils';

const P = primeNumberRandomGenerator();
const secretKey = randomKeyGenerator(P);

const a = mutuallyPrime(P - 1 );
const aReversed = findReversed(a, P - 1);

const b = mutuallyPrime(P - 1 );
const bReversed = findReversed(b, P - 1);

console.log(secretKey, a, pow(secretKey, 2, P));
