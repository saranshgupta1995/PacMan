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

function removeChildPatchFromParent(elem, patch) {
    elem.setAttribute('cPatch',
        (() => {
            let a = (elem.getAttribute('cPatch').split(','));
            a.splice(a.findIndex((x) => x === patch), 1);
            return a
        })().toString())
    if (elem.getAttribute('cPatch') === '') {
        elem.removeAttribute('cPatch');
    }
}

let data = {}

setInterval(() => {

    let mothers = getAllElementsWithAttribute('cPatch');

    //return hidden stuff
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
            mom.insertChildAtIndex(element, myPatch.split('-')[0])
            removeChildPatchFromParent(mom, myPatch);
            element.removeAttribute('cPatch');
            mothers.splice(momIndex, 1);
            hiddenStuff.splice(index, 1)
        }
    })

    //hide crazy stuff
    getAllElementsWithAttribute('crazyIf').forEach((element, i) => {
        let crazyIfValue = this;
        element.getAttribute('crazyIf').split('.').forEach(x => {
            crazyIfValue = crazyIfValue[x];
        })
        if (!crazyIfValue) {
            var j = 0;
            var child = element;
            while ((child = child.previousElementSibling) != null)
                j++;
            monkeyPatch(element.parentElement, j + '-' + i)
            monkeyPatch(element, j + '-' + i)
            element.parentElement.removeChild(element);
            hiddenStuff.push(element)
        }
    })

    getAllElementsWithAttribute('*crazyFor').forEach((element, i) => {
        let crazyForValue = this;
        let forAttrString = element.getAttribute('crazyFor');
        forUnit = forAttrString.split(' in ')[0];
        forEachUnitIn = forAttrString.split(' in ')[1];
        forEachUnitIn.split('.').forEach(x => {
            crazyForValue = crazyForValue[x];
        })

        crazyForValue.forEach(value => { })

    })

    getAllElementsWithAttribute('crazy-').forEach((elem, i) => {
        let allAttrs = elem.getAttributeNames();
        allAttrs.forEach(attr => {

            if (attr.startsWith('[') && attr.endsWith('[')) {
                
                elem.removeAttribute('crazy-');
                elem.setAttribute('crazy-'+i);
                let attrValue=elem.getAttribute(attr.slice(1,attr.length-1));
                let crazyAttrValue = this;
                attrValue.split('.').forEach(x => {
                    crazyAttrValue = crazyAttrValue[x];
                })
                data[i]=crazyAttrValue;

            } else {

                // js->html one way binding
                if (attr.startsWith('[')) {
                    let crazyAttrValue = this;
                    elem.getAttribute(attr).split('.').forEach(x => {
                        crazyAttrValue = crazyAttrValue[x];
                    })
                    elem[attr.slice(1)]= crazyAttrValue
                }

                // html->js one way binding
                if (attr.endsWith(']')) {
                    let crazyAttrValue = this;
                    let objectScope = elem.getAttribute(attr).split('.');
                    for (let objIndex = 0; objIndex < objectScope.length; objIndex++) {
                        if(objIndex===objectScope.length-1){
                            crazyAttrValue[objectScope[objIndex]] = elem[attr.slice(0, attr.length - 1)];
                        }else{
                            crazyAttrValue = crazyAttrValue[objectScope[objIndex]];
                        }
                    }
                }

            }


        })
    })



}, 0)