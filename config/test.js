var u = require('./urls')
for(var i=0;i<u.sens.length;i++) {
    // console.log(u.url + u.sens[i]);
    for(var j=1;j<=u.teams;j++) {
        console.log(u.url + u.sens[i] + '/' + j);
    }
}