const axios = require('axios')

const deezApi = axios.create({
    baseURL: 'https://corsproxy.io/?https://api.deezer.com'
});

const getTrackInfo = (testData) => {
    testDataParsed = JSON.parse(testData)
    console.log(testDataParsed[6], "TEST DATA IN DEEZ API")
    const title = testDataParsed[6].name
    const artist = testDataParsed[6].artist
    const query = `${title} ${artist}`;
    
    return deezApi.get('/search', {
        params: {
            q: query,
        },
        timeout: 5000,
    })
    .then(res => {
        console.log(res.data.data[0])
        return [res.data.data[0]]
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

module.exports = { deezApi, getTrackInfo }