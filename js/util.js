'use strict'

function saveToStorage(key, value) {
    var strValue = JSON.stringify(value);
    localStorage.setItem(key, strValue);
}

function loadFromStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getSortedArrayFromObject() {
    let popular = [];
    let popularSearches = loadFromStorage('popularSearch')

    for (let search in popularSearches) {
        popular.push([search, popularSearches[search]])
    }
    popular.sort(function (a,b) {
        return b[1] - a[1]
    });

    return popular;
}

function downloadCanvas(elLink) {
    const data = canvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-img.jpg';
}

function onFileInputChange(ev) {
    handleImageFromInput(ev, renderCanvas)
}

function renderCanvas(img) {
    isUploadImg = true;
    gImg = img;
    canvas.width = gImg.width;
    canvas.height = gImg.height;
    resetImgSettings();
    ctx.drawImage(gImg, 0, 0);
}

function handleImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}