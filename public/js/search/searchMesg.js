const searchMesg = document.querySelector('#input');

const highlightMesg = (mesg, length) => {
    return '<mark>' +
        mesg.slice(0, length) +
        '</mark>';
}

const search = () => {
    const searchData = this.value.trim().toLowerCase();
    const messages = require('./');

    if (searchData != '') {
        for (let el of messages) {
            el.text.toLowerCase().includes(searchData);

            let str = el.innerText;
            el.innerHTML = highlightMesg(str, searchData.length);
        }
    } else {
        console.log('Empty input');
    };

}

searchMesg.oninput = search();