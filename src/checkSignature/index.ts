import { Envelope } from './envelope';
import { randomKeyGenerator } from '../shared/utils';

const NUMBER_OF_CHECKS = 8;

function prepareEnvelopes(isCheater: boolean): Envelope[] {
    const result = [];

    const num = randomKeyGenerator(NUMBER_OF_CHECKS + 1);

    for (let i = 1; i <= NUMBER_OF_CHECKS; i++) {
        const envelope: Envelope = {
            id: randomKeyGenerator(100000000000),
            count: 1000,
        };

        if (isCheater && i === num) {
            envelope.count = 100000000;
        }

        console.log(`Конверт ${i}: ${envelope.count}, id=${envelope.id}`);
        result.push(envelope);
    }

    return result;
}

function processFn(isCheater: boolean = false) {
    const envelopes: Envelope[] = prepareEnvelopes(isCheater);

    const saveEnvelopeNumber = randomKeyGenerator(NUMBER_OF_CHECKS + 1);
    console.log(`Банк выскрывает все конверты, кроме ${saveEnvelopeNumber}`);

    let checkEnvelopes = [
        ...envelopes.slice(0, saveEnvelopeNumber - 1),
        ...envelopes.slice(saveEnvelopeNumber),
    ];

    console.log(`Банк вскрывает первый попавшийся конверт (ID=${checkEnvelopes[0].id}), чтобы зафиксировать сумму`);
    const sum = checkEnvelopes[0].count;

    checkEnvelopes = checkEnvelopes.slice(1);
    const isAliceCheater = checkEnvelopes.some(envelope => {
        console.log(`Вскрываем конверт с ID=${envelope.id}, сумма равна ${envelope.count}`);

        return envelope.count !== sum;
    });

    if (!isAliceCheater) {
        console.log(`Alice не обманщик с вероятностью ${Math.round(((NUMBER_OF_CHECKS - 1) * 100) / NUMBER_OF_CHECKS)}%`);
        console.log('Банк подписывает оставшийся чек не глядя');
    } else {
        console.log('Alice - мошенник. Вызываем полицию.');
    }

    console.log('\n');
}

processFn();
processFn(true);

