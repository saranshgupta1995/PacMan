(function (globalScope) {


    let BASE_GLOBALS = ["parent", "top", "frames", "location", "self", "window", "document", "customElements", "history", "locationbar", "menubar", "personalbar", "scrollbars", "statusbar", "toolbar", "navigator", "origin", "external", "screen", "innerWidth", "innerHeight", "visualViewport", "outerWidth", "outerHeight", "devicePixelRatio", "clientInformation", "styleMedia", "isSecureContext", "performance", "crypto", "indexedDB", "webkitStorageInfo", "sessionStorage", "localStorage", "chrome", "speechSynthesis", "applicationCache", "caches", "prop", "PERSISTENT"];
    var snaps = {};

    globalScope.snappyOrigHash = 'pikachu';

    let allPropertiesOf = (val) => Object.getOwnPropertyNames(val);

    let isNM = (val) => !['object', 'function'].includes(typeof (val)) || !val;

    let isObjectNM = (val) => {
        let props = allPropertiesOf(val)
        let res = true;
        props.forEach(prop => {
            if (!BASE_GLOBALS.includes(prop))
                if (val[prop] && !isNM(val[prop])) {
                    if (typeof (val[prop]) === 'function' || !isObjectNM(val[prop])) {
                        res = false
                    }
                }
        })
        return res
    }

    globalScope.countProps = (hash, newScope) => {
        hash = hash.replace('.', '-');
        snaps[`${hash}props`] = allPropertiesOf(newScope)
    }

    globalScope.takeSnap = function (hashKey, newScope = globalScope, skipSnapping = []) {


        if (newScope.snappyOrigHash === 'pikachu') {
            skipSnapping = [...BASE_GLOBALS, ...skipSnapping];
        }
        var keyValues = {};
        for (var prop in newScope) {
            if (!skipSnapping.includes(prop))
                if (isNM(newScope[prop])) {
                    keyValues[prop] = newScope[prop]
                } else if (typeof (newScope[prop]) !== 'function') {
                    globalScope.takeSnap(`${hashKey}.${prop}`, newScope[prop], [])
                } else {
                }
        }
        globalScope.countProps(hashKey + '.', newScope);
        if (allPropertiesOf(keyValues).length) {
            snaps[hashKey + '.'] = keyValues;
        }

    }

    globalScope.showAllSnaps = function () {
        return JSON.parse(JSON.stringify(snaps));
    }

    globalScope.getSnap = function (hashKey) {
        return snaps[hashKey];
    }

    globalScope.restoreSnap = function (hashKey, newScope = globalScope) {

        let allHashes = allPropertiesOf(snaps).filter(x => x.startsWith(`${hashKey}.`));
        allHashes.forEach(hash => {
            let currentSnapSet = snaps[hash];
            let cleanHash = hash.slice(0, hash.length - 1);
            let projectedScope = newScope;
            let allSnaps = allPropertiesOf(currentSnapSet)
            let cleanHashArray = cleanHash.split('.');
            cleanHashArray = cleanHashArray.slice(1, cleanHashArray.length)
            cleanHashArray.forEach(propLevel => {
                projectedScope = projectedScope[propLevel]
            })
            allSnaps.forEach(snap => {
                projectedScope[snap] = currentSnapSet[snap];
            })
            let allProps = allPropertiesOf(projectedScope);
            allProps.forEach(prop => {
                let propHash = '';
                if (hash.includes('.'))
                    propHash = hash.replace('.', '-');
                else
                    propHash = hash + '-';
                if (!snaps[`${propHash}props`].includes(prop)) {
                    delete projectedScope[prop]
                }
            })
        });
    }


})(this)