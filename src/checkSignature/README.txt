Подписание чеков, чтобы окружающие не знали его ID

Alice копирует некоторое количество чеков (задается в программе - NUMBER_OF_CHECKS), подписывает каждый чек
Складывает их в конверт, каждый чек имеет уникальный ID и сумму. Если Alice честная, то каждый чек имеет
одинаковую сумму, иначе - один из чеков имеет сумму больше, чем остальные.
В случае с большим количеством чеков, вероятность обмануть банк ничтожна мала
Банк выбирает случайно конверт, который вскрывать не будет. Остальные - вскрывает и сверяет суммы
Если есть 2 конверта с различными суммами, то это означает, что Alice пыталась обмануть

Вывод программы:

Конверт 1: 1000, id=49652074879
Конверт 2: 1000, id=37538940129
Конверт 3: 1000, id=10156616944
Конверт 4: 1000, id=76628649847
Конверт 5: 1000, id=60706222933
Конверт 6: 1000, id=82787251789
Конверт 7: 1000, id=36335410894
Конверт 8: 1000, id=888890432
Банк выскрывает все конверты, кроме 1
Банк вскрывает первый попавшийся конверт (ID=37538940129), чтобы зафиксировать сумму
Вскрываем конверт с ID=10156616944, сумма равна 1000
Вскрываем конверт с ID=76628649847, сумма равна 1000
Вскрываем конверт с ID=60706222933, сумма равна 1000
Вскрываем конверт с ID=82787251789, сумма равна 1000
Вскрываем конверт с ID=36335410894, сумма равна 1000
Вскрываем конверт с ID=888890432, сумма равна 1000
Alice не обманщик с вероятностью 88%
Банк подписывает оставшийся чек не глядя


Конверт 1: 1000, id=21927214267
Конверт 2: 1000, id=57258771632
Конверт 3: 100000000, id=25513732138
Конверт 4: 1000, id=15558070038
Конверт 5: 1000, id=58185862621
Конверт 6: 1000, id=39219247899
Конверт 7: 1000, id=1672729332
Конверт 8: 1000, id=34524967740
Банк выскрывает все конверты, кроме 7
Банк вскрывает первый попавшийся конверт (ID=21927214267), чтобы зафиксировать сумму
Вскрываем конверт с ID=57258771632, сумма равна 1000
Вскрываем конверт с ID=25513732138, сумма равна 100000000
Alice - мошенник. Вызываем полицию.

