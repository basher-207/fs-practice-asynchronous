const fs = require("fs");
const path = require("path");
const filesDir = "./files";

//Write your code here, use readdir and readFile functions with callbacks.

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


fs.readdir(filesDir, 'utf8', (err, files) => {
    if(err) { 
        console.log("No numbers for calculating");
        return;
    }
    const promisesArr = [];
    files.forEach((fName) =>{
        const fPath = filesDir + "/" + fName;
        promisesArr.push(asyncRead(fPath));
    });

    Promise.all(promisesArr)
    .then((values) => {
        const data = String(values);
        const numbers = data.match(/\d+/g);
        const sum = numbers.reduce((acc, curr) => {
            return acc + Number(curr);
        }, 0);
        console.log(`The sum of the numbers in the files: ${sum}`);
    }).catch(() => {
        console.log("No numbers for calculating");
    })
});











