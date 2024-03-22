import { getScore } from './index';
import { expect } from '@jest/globals';






test('returns correct score when requested offset is exactly in a stamp', () => {
    const gameStamps = [
        { offset: 100, score: { home: 1, away: 0 } },
        { offset: 200, score: { home: 1, away: 1 } },
        { offset: 300, score: { home: 2, away: 1 } },
    ];
    const offset = 200;
    const expectedScore = { home: 1, away: 1 };

    expect(getScore(gameStamps, offset)).toEqual(expectedScore);
});


test('returns correct score when requested offset is between two stamps', () => {
    const gameStamps = [
        { offset: 100, score: { home: 1, away: 0 } },
        { offset: 200, score: { home: 1, away: 1 } },
        { offset: 300, score: { home: 2, away: 1 } },
    ];
    const offset = 250;
    const expectedScore = { home: 1, away: 1 }; // score at offset 200

    expect(getScore(gameStamps, offset)).toEqual(expectedScore);
});


test('returns initial score when requested offset is less than the first stamp', () => {
    const gameStamps = [
        { offset: 100, score: { home: 1, away: 0 } },
        { offset: 200, score: { home: 1, away: 1 } },
        { offset: 300, score: { home: 2, away: 1 } },
    ];
    const offset = 50;
    const expectedScore = { home: 0, away: 0 }; // initial score

    expect(getScore(gameStamps, offset)).toEqual(expectedScore);
});



test('returns final score when requested offset is greater than the last stamp', () => {
    const gameStamps = [
        { offset: 100, score: { home: 1, away: 0 } },
        { offset: 200, score: { home: 1, away: 1 } },
        { offset: 300, score: { home: 2, away: 1 } },
    ];
    const offset = 400;
    const expectedScore = { home: 2, away: 1 }; // score at last stamp

    expect(getScore(gameStamps, offset)).toEqual(expectedScore);
});
