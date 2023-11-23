const fs = require("fs");
const path = require("path");
const filesDir = "./files";

function asyncRead (path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
};

fs.readdir(filesDir, (err, files) => {
    if(err || files.length == 0) {
        console.log("No numbers for calculating");
        return;
    }
    
    const promisesArr = files.map((fName) => {
        const fPath = path.join(filesDir, fName);
        return asyncRead(fPath);
    });

    Promise.all(promisesArr)
    .then((filesContent) => {
        const data = String(filesContent);
        const numbers = data.match(/\d+/g);
        const sum = numbers.reduce((acc, curr) => {
            return acc + Number(curr);
        }, 0);
        console.log(`The sum of the numbers in the files: ${sum}`);
    }).catch(() => {
        console.log("No numbers for calculating");
    });
});











