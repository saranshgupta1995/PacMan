function getAllElementsWithAttribute(attribute) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

let tick = 0;

let hiddenStuff = [];

function monkeyPatch(elem, patch) {
    elem.setAttribute('cPatch', (elem.getAttribute('cPatch') || '') + ',' + (patch))
}

setInterval(() => {

    let mothers = getAllElementsWithAttribute('cPatch');

    hiddenStuff.forEach((element, index) => {
        let crazyIfValue = this;
        element.getAttribute('crazyIf').split('.').forEach(x => {
            crazyIfValue = crazyIfValue[x];
        })
        if (crazyIfValue) {
            let myPatch = element.getAttribute('cPatch');
            let momIndex = -1;
            let mom = mothers.find((x, i) => {
                momIndex = i;
                return x.getAttribute('cPatch') === myPatch;
            })
            if (element.onMount)
                element.onMount();
            mom.appendChild(element);
            mom.removeAttribute('cPatch');
            element.removeAttribute('cPatch');
            mothers.splice(momIndex, 1);
            hiddenStuff.splice(index, 1)
        }
    })

    // TODO children order is not maintained while pushing back

    getAllElementsWithAttribute('crazyIf').forEach((element, i) => {
        let crazyIfValue = this;
        element.getAttribute('crazyIf').split('.').forEach(x => {
            crazyIfValue = crazyIfValue[x];
        })
        if (!crazyIfValue) {
            monkeyPatch(element.parentElement, tick + '-' + i)
            monkeyPatch(element, tick + '-' + i)
            element.parentElement.removeChild(element);
            hiddenStuff.push(element)
        }
    })
}, 0)