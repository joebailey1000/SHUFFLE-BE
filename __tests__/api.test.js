const { fetchTrackInfo } = require('./../utils/fetchTrackInfo')
const { getTrackInfo } = require('./../utils/deezApi')
const fs = require('fs')

describe('fetchTrackInfo', () => {
    test('returns mp3 and art', async () => {
        const testData = fs.readFileSync('./db/data/test/songs-test.json', 'utf-8');
        const trackInfo = await getTrackInfo(testData);
        console.log(trackInfo)
        expect(trackInfo[0]).toMatchObject({
            preview: expect.any(String), 
            album: {
                cover_big: expect.any(String), 
            },
        });
    });
});