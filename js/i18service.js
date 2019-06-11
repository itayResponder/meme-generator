'use strict'

let gTrans = {
    'welcome-h1': {
        en: 'Welcome to meme generator',
        he: 'ברוכים הבאים למחולל המימים'
    },
    'wiki-link': {
        en: 'Find out more about memes',
        he: 'גלו יותר על מימים',
    },
    'search-placeholder': {
        en: 'Search memes',
        he: 'חיפוש',
    },
    'footer-share': {
        en: 'Share us',
        he: 'שתפו אותנו'
    },
    'generator-text-placeholder': {
        en: 'Enter Text',
        he: 'הכנס כיתוב',
    },
    'generator-download-link': {
        en: 'download',
        he: 'הורדה',
    },
    'generator-footer-share': {
        en: 'Share us',
        he: 'שתפו אותנו'

    },
    'generator-label-file': {
        en: 'Choose a file',
        he: 'בחר קובץ',
    },
    'generator-contact-header': {
        en: 'Enter your email:',
        he: 'הכנס מייל'
    },
    'generator-email-submit': {
        en: 'Submit',
        he: 'שלח'
    },
    'generator-contact': {
        en: 'Contact us',
        he: 'צור קשר'
    },
    'generator-download-meme': {
        en: 'Download',
        he: 'הורד'
    },
    'generator-text-one': {
        en: 'Enter Text Top Line',
        he: 'טקסט שורה ראשונה'
    },
    'generator-text-two': {
        en: 'Enter Text Middle Line',
        he: 'טקסט שורה אמצעית'
    },
    'generator-text-three': {
        en: 'Enter Text Bottom Line',
        he: 'טקסט שורה אחרונה'
    },
}

let gCurrLang = 'en';

function setLang(lang) {
    gCurrLang = lang;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');

    for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var transKey = el.dataset.trans;

        var txt = getTrans(transKey);

        if (el.nodeName === 'INPUT') {
            el.setAttribute('placeholder', txt);
        } else {
            el.innerText = txt;
        }
    }
}

function getTrans(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];

    if (!txt) txt = keyTrans['en'];

    return txt;
}