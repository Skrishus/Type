const TIMESTAMPS_COUNT = 50000;

const PROBABILITY_SCORE_CHANGED = 0.0001;

const PROBABILITY_HOME_SCORE = 0.45;

const OFFSET_MAX_STEP = 3;

type Score = {
    home: number;
    away: number;
};

type Stamp = {
    offset: number;
    score: Score;
};

const emptyScoreStamp: Stamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0,
    },
};

export const generateStamps = (): Stamp[] => {
    const scoreStamps = Array(TIMESTAMPS_COUNT)
        .fill(emptyScoreStamp)
        .map(
            ((acc) => () => {
                const scoreChanged =
                    Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
                const homeScoreChange =
                    scoreChanged && Math.random() < PROBABILITY_HOME_SCORE
                        ? 1
                        : 0;
                const awayScoreChange =
                    scoreChanged && !homeScoreChange ? 1 : 0;
                return {
                    offset: (acc.offset +=
                        Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
                    score: {
                        home: (acc.score.home += homeScoreChange),
                        away: (acc.score.away += awayScoreChange),
                    },
                };
            })(emptyScoreStamp)
        );

    return scoreStamps;
};
export const getScore = (gameStamps: Stamp[], offset: number): Score => {
    // Начинаем с начального счета, предполагая, что в начале игры счет 0:0.
    let lastKnownScore = { home: 0, away: 0 };

    // Проходим по каждой временной метке в массиве.
    for (const stamp of gameStamps) {
        // Если временная метка больше искомого момента, прерываем цикл.
        if (stamp.offset > offset) {
            break;
        }
        // Обновляем последний известный счет, если метка не превышает искомый момент.
        lastKnownScore = stamp.score;
    }

    // Возвращаем последний известный счет до искомого момента.
    return lastKnownScore;
};
// Генерируем массив штампов для игры.
const generatedStamps = generateStamps();
const lastStampOffset = generatedStamps[generatedStamps.length - 1].offset;


// Задаем интересующий нас оффсет.
const offset = 100073; // это максимум

// Получаем счет для заданного оффсета.
const scoreAtOffset = getScore(generatedStamps, offset);

// Выводим полученный счет.
console.log(lastStampOffset);
console.log(scoreAtOffset);



