var request = require('request');

module.exports = function requestp(url, TeamID) {
    return new Promise(function(resolve, reject) {
        request(url, function(error, res, body) {
            if (error) reject(reject);
            resolve({body, TeamID});
        })
    })
}

// var l = ["https://google.com", "https://google.com", "https://google.com"];

// var x = [];
// for(var i=0;i<3;i++) {
//     x.push(requestp(l[i]));
// }

// Promise.all(x)
//     .then(function(data){
//         console.log(data[0]);
//         console.log(data[1]);
// })