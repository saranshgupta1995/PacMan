var getGlobals = undefined;
var resetToRewindedLevel = undefined;

(() => {
    let globalData = [];
    let saveInterval = 1;
    let dataLimit = 30;

    resetToRewindedLevel = function (val) {
        globalData.length = val;
    }

    let filterSavedData = function () {
        for (let i = 0; i < dataLimit; i++) {
            globalData[i] = globalData[i * 2];
        }
        globalData.length = dataLimit;
    }

    let saveGlobals = function () {
        if (gameState.pause) return;
        var keyValues = [];
        for (var prop in this) {
            if (typeof (this[prop]) !== 'function' && !BASE_GLOBALS.includes(prop) && prop !== prop.toUpperCase()
                && !['rewindedLevel', 'ctx', 'canvas', 'bgCtx', 'pacEnemies', 'gameState'].includes(prop)) {
                keyValues.push(prop + "=" + JSON.stringify(this[prop]));
            } else if (prop === 'pacEnemies') {
                keyValues.push(prop + "=" + JSON.stringify(this[prop].map(x => x.toJSON())));
            }
        }
        globalData.push(keyValues);
        if (globalData.length && !(globalData.length % (2 * dataLimit))) {
            filterSavedData();
            saveInterval += 1;
        }
    }

    getGlobals = function () {
        return globalData
    }

    setInterval(saveGlobals, saveInterval * 1000)

})();

var rewindedLevel = 1000;

function rewind(val) {
    rewindedLevel = val;
    let newGlobals = getGlobals()[val];
    newGlobals.forEach(newGlobal => {
        if (!newGlobal.includes('pacEnemies'))
            this[newGlobal.split('=')[0]] = JSON.parse(newGlobal.split('=')[1]);
        else
            this[newGlobal.split('=')[0]].forEach((x, i) => x.fromJSON(JSON.parse(newGlobal.split('=')[1])[i]))
    });
    gameState.rewind = true;
    draw()
    drawBackdrop()
    gameState.rewind = false;
}
