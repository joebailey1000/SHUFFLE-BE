const axios = require('axios')

const deezApi = axios.create({
    baseURL: 'https://api.deezer.com'
});

const getTrackInfo = (testData) => {
    testDataParsed = JSON.parse(testData)
    const title = testDataParsed[6].name
    const artist = testDataParsed[6].artists[0]
    const query = `${title}+${artist}`;
    
    return deezApi.get('/search', {
        params: {
            q: query,
        },
        timeout: 5000,
    })
    .then(res => {
        return [res.data.data[0]]
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

module.exports = { deezApi, getTrackInfo }