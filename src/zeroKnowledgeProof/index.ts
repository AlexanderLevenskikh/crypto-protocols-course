import { coinToss } from '../shared/utils';

const ATTEMPTS_NUMBER = 10;

function booleanToDirection(flag: boolean) {
    return flag ? 'Справа' : 'Слева';
}

function processFn(aliceHasKey: boolean) {
    let trustDegree = 0;

    for (let i = 1; i <= ATTEMPTS_NUMBER; i++) {
        const bobExpectation = coinToss();
        const aliceDirection = coinToss();

        console.log(`Попытка 1, Alice зашла ${booleanToDirection(aliceDirection)}`);
        if (aliceDirection === bobExpectation) {
            console.log('Alice вышла оттуда же, откуда зашла');
            trustDegree += 1;
        } else {
            if (aliceHasKey) {
                console.log('Alice открыла дверь и вышла с другой стороны');
                trustDegree += 1;
            } else {
                console.log('Alice не удалось обмануть Bob');
                trustDegree = 0;
            }
        }

        console.log(`Боб доверяет Alice на ${Math.round((trustDegree * 100) / ATTEMPTS_NUMBER)}%`)
    }

    console.log('\n\n');
}

processFn(false);
processFn(true);
