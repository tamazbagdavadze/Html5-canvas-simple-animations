module $ {
    export function getElById(id: string):HTMLElement {
        var el = document.getElementById(id);

        if (el == null) {
            throw new Error("element not found with given id");
        }

        return el;
    }

    export function getElsByClass(className: string):NodeListOf<Element> {

        return document.getElementsByClassName(className);
    }

    export function query(queryString: string):any {
        
        if (queryString.substr(0, 1) === "#") {
            return getElById(queryString.substr(1,queryString.length -1));
        } else {
            return getElsByClass(queryString);
        }
    }

//    export function getAttr(el: HTMLElement, name: string) {
//        el.getAttribute(name);
//    }
}