function setUserJailTime (ms, callback) {
    let counterLeft = ms
    let counter = setInterval(() => {
        counterLeft = counterLeft - 1000;
        if (counterLeft <= 0) {
            callback()
            clearInterval(counter)
        }
    }, 1000)
    
    return counter
}

module.exports = { setUserJailTime }