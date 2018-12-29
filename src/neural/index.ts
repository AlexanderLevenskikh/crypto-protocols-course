import brain from 'brain.js';
import { coinToss } from '../shared/utils';

const aliceNetwork = new brain.NeuralNetwork();
const bobNetwork = new brain.NeuralNetwork();

function generateRandomByte(): number[] {
    return [ Math.floor(Math.random() * 255) ];
}

function generateRandomOutputByte(): number[] {
    return [ Math.floor(Math.random()) ];
}

function toBitString(num: number) {
    let str = (num >>> 0).toString(2);
    while (str.length < 8) str = "0" + str;

    return str;
}

function generateInitialTrainingSet() {
    return [
        {
            input: generateRandomByte(),
            output: generateRandomOutputByte(),
        }
    ]
}

const transform = (x: any) => x > 0.5;

let aliceTrainingDataSet = generateInitialTrainingSet();
let bobTrainingDataSet = generateInitialTrainingSet();

aliceNetwork.train(aliceTrainingDataSet);
bobNetwork.train(bobTrainingDataSet);

console.log('Alice и Bob начинают тренировать нейронные сети');

let sync = false;
let i = 0;

while (!sync) {
    const aliceByte = generateRandomByte();
    const bobByte = generateRandomByte();
    const aliceResultByte = Array.from(aliceNetwork.run(aliceByte));
    const bobResultByte = Array.from(bobNetwork.run(bobByte));

    aliceNetwork.train({
        input: aliceByte,
        output: bobResultByte,
    });

    bobNetwork.train({
        input: bobByte,
        output: aliceResultByte,
    });

    if (i === 1) {
        console.log(`После первой итерации`);
        console.log(`Входная строка Alice: ${toBitString(aliceByte[0])}`);
        console.log(`Выходная строка нейронной сети Alice: ${toBitString(aliceResultByte[0] * 255)}`);
        console.log(`Входная строка Bob: ${toBitString(bobByte[0])}`);
        console.log(`Выходная строка нейронной сети Bob: ${toBitString(bobResultByte[0] * 255)}`);
        console.log('Конец итерации\n');
    } else if (i === 100) {
        console.log(`После 100 итерации`);
        console.log(`Входная строка Alice: ${toBitString(aliceByte[ 0 ])}`);
        console.log(`Выходная строка нейронной сети Alice: ${toBitString(aliceResultByte[ 0 ] * 255)}`);
        console.log(`Входная строка Bob: ${toBitString(bobByte[ 0 ])}`);
        console.log(`Выходная строка нейронной сети Bob: ${toBitString(bobResultByte[ 0 ] * 255)}`);
        console.log('Конец итерации\n');
    }

    let temp = 0;
    for (let j = 0; j < 100; j++) {

        const aliceByte = generateRandomByte();
        const bobByte = generateRandomByte();
        const aliceResultByte = Array.from(aliceNetwork.run(aliceByte));
        const bobResultByte = Array.from(bobNetwork.run(bobByte));

        const aliceKey = Math.round(aliceResultByte[0] * 255);
        const bobKey = Math.round(bobResultByte[0] * 255);

        if (aliceKey === bobKey) {
            temp += 1;
        }
    }

    if (temp === 100) {
        console.log(`Синхронизировались на ${i} итерации`);
        console.log(`Входная строка Alice: ${toBitString(aliceByte[0])}`);
        console.log(`Выходная строка нейронной сети Alice: ${toBitString(aliceResultByte[0] * 255)}`);
        console.log(`Входная строка Bob: ${toBitString(bobByte[0])}`);
        console.log(`Выходная строка нейронной сети Bob: ${toBitString(bobResultByte[0] * 255)}`);
        console.log('\n');
        sync = true;
    }

    i++;
}

const aliceByte = generateRandomByte();
const bobByte = generateRandomByte();
const aliceResultByte = Array.from(aliceNetwork.run(aliceByte));
const bobResultByte = Array.from(bobNetwork.run(bobByte));

const aliceKey = Math.round(aliceResultByte[0] * 255);
const bobKey = Math.round(bobResultByte[0] * 255);

console.log(`Alice сгенерировала ключ: ${toBitString(aliceKey)}`);
console.log(`Bob сгенерировал ключ: ${toBitString(bobKey)}`);


