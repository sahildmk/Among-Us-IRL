import Users from './loginFile.json';
const fs = require('fs');

export const changeJson = (username) => {
    let tempStatus = Users;
    tempStatus.find(user => user.username === username).alive = "dead";
    fs.writeFile('./loginFile.json', JSON.stringify(tempStatus), function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });
}