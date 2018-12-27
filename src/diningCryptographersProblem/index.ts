// A - Alice, B - Bob, C - Carol

function coinToss(): boolean {
    return Math.floor(Math.random() * 2) === 1;
}

function xor(a: boolean, b: boolean) {
    return ( a && !b ) || ( !a && b )
}

function processFn(mask: number) {
    let alicePaid = false;
    let bobPaid = false;
    let carolPaid = false;
    let whoPaid = 'АНБ';

    if (mask >= 4) {
        mask -= 4;
        alicePaid = true;
        whoPaid = 'Alice';
    } else if (mask >= 2) {
        mask -= 2;
        bobPaid = true;
        whoPaid = 'Bob';
    } else if (mask >=1) {
        carolPaid = true;
        whoPaid = 'Carol';
    }

    console.log(`Входные данные: заплатил ${ whoPaid }`);

    const Xab = coinToss();
    const Xac = coinToss();
    const Xbc = coinToss();

    console.log('Подбрасывание монет...');
    console.log(`Общий секрет Alice и Bob: ${Xab}`);
    console.log(`Общий секрет Alice и Carol: ${Xac}`);
    console.log(`Общий секрет Carol и Bob: ${Xbc}`);

    const xorAlice = alicePaid ? !xor(Xac, Xab) : xor(Xac, Xab);
    const xorBob = bobPaid ? !xor(Xab, Xbc) : xor(Xab, Xbc);
    const xorCarol = carolPaid ? !xor(Xac, Xbc) : xor(Xac, Xbc);

    console.log(`XOR Alice: ${xorAlice}`);
    console.log(`XOR Bob: ${xorBob}`);
    console.log(`XOR Carol: ${xorCarol}`);

    const commonXor = xor(xor(xorAlice, xorBob), xorCarol);
    console.log(`Результат: ${commonXor}. ${commonXor ? 'Заплатил кто-то из криптографов' : 'Заплатило АНБ'}\n\n`)
}

console.log('Запустим с маской 010.');
processFn(4);
console.log('Запустим с маской 000.');
processFn(0);
