var cpuStat = require('cpu-stat');

const sequence = '/-\\|'.split('');


function logEverySecond(i: number) {
    setTimeout(() => {
        // @ts-ignore
        cpuStat.usagePercent(function(err, percent, seconds) {
            process.stdout.write("\u001b[2J\u001b[0;0H");
            console.log('Процесс выполняется', sequence[ i % 4 ]);
            logEverySecond(++i);

            if (err) {
                return console.log(err);
            }

            //the percentage cpu usage over all cores
            console.log(`Использование ЦП: ${percent}%`);

            if (percent > 30) {
                console.log('Повышенная нагрузка на ЦП, логика программы меняется');
            }
        });
    }, 1000);
}

logEverySecond(0);

