// скрипт через который я сгенерировал инф. для mongodb
// (просто взял вывод консоли и запихнул в коллекцию монги)
let Result = []

let Names = []
for (let i = 0; i < 100; i++) {
    Names.push(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5))
}

let Quantity = []
for (let i = 0; i < 100; i++) {
    Quantity.push(Math.floor(Math.random()*100))
}

let Distance = []
for (let i = 0; i < 100; i++) {
    Distance.push(Math.floor(Math.random()*1000))
}

function randomDate(start=1, end=9999999999999, startHour=0, endHour=23) {
    let date = new Date(+start + Math.random() * (end - start));
    let hour = startHour + Math.random() * (endHour - startHour) | 0;
    date.setHours(hour);
    return date;
}

let Dates = []
for (let i = 0; i < 100; i++) {
    Dates.push(randomDate())
}

for (let i = 0; i < 100; i++) {
    Result.push({id: i+1, name: Names[i], quantity: Quantity[i], distance: Distance[i], date: Dates[i]})
}
console.log(JSON.stringify(Result))