const axios = require('axios');
//https://i.imgur.com/teGszQK.png
//создали датапровайдр который содержит методы для получения информации с бека
export const DataProvider = {
    // получить страничку (для пагинации)
    getRange: async (start, limit) => {
        let result = await axios.get(`http://localhost:3001/welbex?start=${start}&limit=${limit}`)
        return result.data
    },
    //получить количество записей (для пагинации)
    getLength: async () => {
        let result = await axios.get(`http://localhost:3001/length`)
        return result.data
    },
}