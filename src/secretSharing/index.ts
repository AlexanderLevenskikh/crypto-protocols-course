import { findReversed, primeNumberRandomGenerator, randomKeyGenerator } from '../shared/utils';
import { SecretSharingPoint } from './point';
import bigInt, { zero, one } from 'big-integer';

const N = 6;
const K = 4;
const SECRET = 42;

function lagrange(points: SecretSharingPoint[], module: number): string {
    let result = zero;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let numerator = 1;
        let denominator = 1;

        for (let j = 0; j < k; j++) {
            if (j === i) {
                continue;
            }

            numerator *= points[j].x;
            denominator *= (points[j].x - points[i].x)
        }

        const sgn = (denominator < 0 ? -1 : 1);
        const sgnBigInt = bigInt(sgn);
        const yBigInt = bigInt(points[i].y);
        const numeratorBigInt = bigInt(numerator);
        const reversedBigInt = bigInt(findReversed(denominator * sgn, module));

        const temp = yBigInt.multiply(numeratorBigInt.multiply(reversedBigInt)).multiply(sgnBigInt);
        result = result.add(temp);
    }

    const moduleBigInt = bigInt(module);

    if (result.lesser(zero)) {
        const addition = (result.multiply(-1).divide(module)).multiply(moduleBigInt);
        result = result.add(addition).add(moduleBigInt);
    }

    return result.mod(moduleBigInt).toString();
}

const module = primeNumberRandomGenerator();
const polynomialCoefficients = Array.from(Array(K - 1)).map(_ => {
    return randomKeyGenerator(10);
});

console.log(`Сгенерирован многочлен: ${SECRET} + ${ polynomialCoefficients.map((c, i) => `${c}x^${i+1}`).join(' + ')}`);

const points: SecretSharingPoint[] = Array.from(Array(N)).map(_ => {
    const rand = randomKeyGenerator(100);
    const y =  polynomialCoefficients.reduce((res, curr, index) => {
        return res + curr * Math.pow(rand, index + 1);
    }, SECRET);

    return {
        x: rand,
        y,
    }
});

console.log(`Сгенерированы фрагменты секрета: ${ points.map(p => `(${p.x}, ${p.y})`).join(', ')}`);

const group1 = [ points[0], points[1], points[3] ];
const group2 = [ points[1], points[2], points[3], points[5] ];
const group3 = [ points[0], points[1], points[2], points[3], points[4] ];

const group1Result = lagrange(group1, module);
const group2Result = lagrange(group2, module);
const group3Result = lagrange(group3, module);

console.log(`Результат группы из 1, 2 и 4 человека (недостаточно людей для получения секрета): ${ group1Result }`);
console.log(`Результат группы из 2, 3 и 4, 6 человека (достаточно людей для получения секрета): ${ group2Result }`);
console.log(`Результат группы из 1, 2, 3, 4 и 5 человека (людей для получения секрета с избытком): ${ group3Result }`);

