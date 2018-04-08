const health = require('../model/Health')
const axios = require('axios');

function showConsoleHealth(){
    setInterval(function() {
        console.log('sum : ' + health.sumHealth)
        console.log('sub : ' + health.subHealth)
        console.log(' - ')
    }, 5000);
}

function checkHealthServices (){
    setInterval(function() {
        checkEachServiceHealth()
    }, 2000);
}

function checkEachServiceHealth(){
    checkHealth('sum','http://localhost:8080/health')
    checkHealth('sub','http://localhost:8081/health')
}

function checkHealth(operation, url){
    axios.get(url)
        .then(response => {
            updateValues(operation, response.data)
        })
        .catch(error => {
            updateValues(operation, error.message)
        });
}

function updateValues(operation, data){
    switch(operation){
        case 'sum': health.sumHealth = data; break;
        case 'sub': health.subHealth = data; break;
    }
}

module.exports = {
    healthMessage : showConsoleHealth,
    startHealthCheck : checkHealthServices
};