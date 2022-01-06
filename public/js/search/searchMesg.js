'use strict';

const searchMesg = document.querySelector('#input');

const highlightMesg = (mesg, length) => '<mark>' +
        mesg.slice(0, length) +
        '</mark>';

const search = () => {
  const searchData = this.value.trim().toLowerCase();
  const messages = require('./');

  if (searchData !== '') {
    for (const el of messages) {
      el.text.toLowerCase().includes(searchData);

      const str = el.innerText;
      el.innerHTML = highlightMesg(str, searchData.length);
    }
  } else {
    console.log('Empty input');
  }

};

searchMesg.oninput = search();
