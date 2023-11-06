import axios from 'axios';

const deezApi = axios.create({
    baseURL: 'https://corsproxy.io/?https://api.deezer.com'
});

export const getTrackInfo = ({ title, artist }) => {
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