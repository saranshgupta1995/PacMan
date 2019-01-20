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

Element.prototype.insertChildAtIndex = function (child, index) {
    if (!index) index = 0
    if (index >= this.children.length) {
        this.appendChild(child)
    } else {
        this.insertBefore(child, this.children[index])
    }
}

let tick = 0;

let hiddenStuff = [];

// Multiple children parent patches will currently fail

function monkeyPatch(elem, patch) {
    elem.setAttribute('cPatch',
        (() => {
            let a = (elem.getAttribute('cPatch') ? elem.getAttribute('cPatch').split(',') : []);
            a.push(patch);
            return a
        })().toString())
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
                return x.getAttribute('cPatch').split(',').includes(myPatch);
            })
            if (element.onMount)
                element.onMount();
            mom.insertChildAtIndex(element,myPatch.split('-')[0])
            mom.removeAttribute('cPatch');
            element.removeAttribute('cPatch');
            mothers.splice(momIndex, 1);
            hiddenStuff.splice(index, 1)
        }
    })


    getAllElementsWithAttribute('crazyIf').forEach((element, i) => {
        let crazyIfValue = this;
        element.getAttribute('crazyIf').split('.').forEach(x => {
            crazyIfValue = crazyIfValue[x];
        })
        if (!crazyIfValue) {
            var j = 0;
            var child=element;
            while ((child = child.previousElementSibling) != null)
                j++;
            monkeyPatch(element.parentElement, j + '-' + i)
            monkeyPatch(element, j + '-' + i)
            element.parentElement.removeChild(element);
            hiddenStuff.push(element)
        }
    })
}, 0)