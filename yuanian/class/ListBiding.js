class ListBiding {
    constructor(element) {
        this.listElement = element;
        this.textList = [];
    }

    // make an element <li>text</li> tag
    static createListItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
    }

    update() {
        // remove all exit li tag
        while(this.listElement.firstChild) {
            this.listElement.removeChild(this.listElement.firstChild)
        }

        // Fill add li tag
        this.textList.forEach(text => {
            this.listElement.appendChild(ListBiding.createListItem(text))
        })

    }

    add(text) {
        // add text
        this.textList.push(text)
        this.update();
    }

    remove(index) {
        this.textList.splice(index, 1)
        this.update();
    }
}