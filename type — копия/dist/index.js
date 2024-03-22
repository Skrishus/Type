"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScore = exports.generateStamps = void 0;
const TIMESTAMPS_COUNT = 50000;
const PROBABILITY_SCORE_CHANGED = 0.0001;
const PROBABILITY_HOME_SCORE = 0.45;
const OFFSET_MAX_STEP = 3;
const emptyScoreStamp = {
    offset: 0,
    score: {
        home: 0,
        away: 0,
    },
};
const generateStamps = () => {
    const scoreStamps = Array(TIMESTAMPS_COUNT)
        .fill(emptyScoreStamp)
        .map(((acc) => () => {
        const scoreChanged = Math.random() > 1 - PROBABILITY_SCORE_CHANGED;
        const homeScoreChange = scoreChanged && Math.random() < PROBABILITY_HOME_SCORE
            ? 1
            : 0;
        const awayScoreChange = scoreChanged && !homeScoreChange ? 1 : 0;
        return {
            offset: (acc.offset +=
                Math.floor(Math.random() * OFFSET_MAX_STEP) + 1),
            score: {
                home: (acc.score.home += homeScoreChange),
                away: (acc.score.away += awayScoreChange),
            },
        };
    })(emptyScoreStamp));
    return scoreStamps;
};
exports.generateStamps = generateStamps;
const getScore = (gameStamps, offset) => {
    let lastKnownScore = { home: 0, away: 0 };
    for (const stamp of gameStamps) {
        if (stamp.offset > offset) {
            break;
        }
        lastKnownScore = stamp.score;
    }
    return lastKnownScore;
};
exports.getScore = getScore;
const generatedStamps = (0, exports.generateStamps)();
const lastStampOffset = generatedStamps[generatedStamps.length - 1].offset;
const offset = 100073;
const scoreAtOffset = (0, exports.getScore)(generatedStamps, offset);
console.log(lastStampOffset);
console.log(scoreAtOffset);
//# sourceMappingURL=index.js.map