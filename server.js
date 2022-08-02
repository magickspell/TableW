const { MongoClient } = require("mongodb");
const cors = require('cors')
const express = require('express')
const app = express()

// подключаемся к БД mongoDB //todo пароль
// пароль надо написать вместо <pass> включая крыжики! (т.е. получиться ...magic:123Qwerty...) *пароль скинул в личку
const uri = 'mongodb+srv://magic:<pass>@cluster0.wh26qcf.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri);
const database = client.db('magicDB'); //имя бд в монго
const promosCollection = database.collection('welbex'); //имя коллекции в бд (в монго)

// подключаем мидлвэир для корс политики (без него не работает)
app.use(cors())

//описываем методы
//по эндпоинте api по get запросу будем отдавать массив с нашими данными
app.get('/welbex', async function (req, res) {
    //http://localhost:3001/welbex?start=0&limit=10
    let start = Number(req.query.start) //это первый предмет списка (id в бд, указав 23 номер мы получим предметы начиная с 23 id)
    let limit = Number(req.query.limit) //это количество предметов, которое должно быть отражено на страничке
    try {
        const welbex = await promosCollection.find().skip(start).limit(limit).toArray();
        console.log(welbex);
        res.status(200).send(welbex);
    } catch (e) {
        console.warn(e);
        res.send('error');
    }
})
//длинна коллекции что-бы расчитать пагинацию
app.get('/length', async function(req,res) {
    try {
        const size = await promosCollection.countDocuments();
        console.log(size);
        res.status(200).send(String(size));
    } catch (e) {
        console.warn(e);
        res.send('error');
    }
})

app.listen(3001, () => console.log(`app started on port ${3001}`))