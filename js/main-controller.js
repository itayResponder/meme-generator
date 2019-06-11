'use strict'

function onInitMain() {
    let imgs = createImages();
    createImgContainer(imgs.length)
    renderImage(imgs);
    renderPopularSearch();
}

function createImgContainer(size) {
    let grid = document.querySelector('.grid-container');
    for (let i = 0; i < size; i++) {
        grid.innerHTML += `<div class = "box hvr-grow-shadow"></div>`
    }
}

function renderImage(imgs) {
    let idx = 0;
    imgs.forEach(img => {
        let imgBox = document.querySelectorAll('.box');
        imgBox[idx].innerHTML = `<a href="generator.html" onclick="onImgClick(${img.id})"><img class="images img-${img.id}" id="${img.id}" src="${img.imgUrl}" 
        alt=""></a>`
        idx++;
    });
}

function renderPopularSearch() {
    let strSearches = '';
    let str2Searches = '';
    let str3Searches = '';

    let searches = getPopularSearchesArray()
    let idx = 0;
    let searchOptions = document.querySelectorAll('.search-option')
    while (idx < 6) {
        if (!searches[idx]) break;
        switch (idx) {
            case 0:
                str3Searches += `<h1 class="popular popular-h1" style="color: firebrick" onclick="onSearchMeme(this.innerText)">${searches[idx][0]}</h1>`
                searchOptions[idx].value = searches[idx][0];
                break;
            case 1:
                strSearches += `<h2 class="popular popular-h2" style="color: firebrick" onclick="onSearchMeme(this.innerText)">${searches[idx][0]}</h2>`
                searchOptions[idx].value = searches[idx][0];
                break;
            case 2:
                str2Searches += `<h3 class="popular popular-h3" style="color: firebrick" onclick="onSearchMeme(this.innerText)">${searches[idx][0]}</h3>`
                searchOptions[idx].value = searches[idx][0];
                break;
            case 3:
                strSearches += `<h4 class="popular popular-h4" style="color: firebrick" onclick="onSearchMeme(this.innerText)">${searches[idx][0]}</h4>`
                searchOptions[idx].value = searches[idx][0];
                break;
            case 4:
                str2Searches += `<h5 class="popular popular-h5" style="color: firebrick" onclick="onSearchMeme(this.innerText)">${searches[idx][0]}</h5>`
                searchOptions[idx].value = searches[idx][0];
                break;
            case 5:
                str3Searches += `<h6 class="popular popular-h6" style="color: firebrick" onclick="onSearchMeme(this.innerText)">${searches[idx][0]}</h6>`
                searchOptions[idx].value = searches[idx][0];
                break;
        }
        idx++;
    }
    let popularContainer = document.querySelector('.popular-container');
    popularContainer.innerHTML = strSearches;
    popularContainer.innerHTML += str2Searches;
    popularContainer.innerHTML += str3Searches;
}


function onSearchMeme(inputVal) {
    if(inputVal.length < 3 && inputVal.length > 1) return;
    else if(inputVal.length === 1) {
        onInitMain()
        return;
    }
    
    let searchedImgs = getSearchedMemes(inputVal);
    if (searchedImgs[0]) clearGrid()
    createImgContainer(searchedImgs.length)
    renderImage(searchedImgs);
    popularSearched(inputVal);
    renderPopularSearch();
}

function clearGrid() {
    let imgBox = document.querySelectorAll('.box');
    imgBox.forEach(box => {
        box.classList.remove('box')
        box.style.display = 'none';
    })
}

function onImgClick(imgId) {
    let imgObj = getImgById(imgId);
    saveValue('meme', imgObj);
}

function popularSearched(inputVal) {
    if (!inputVal) return
    setPopularSearches(inputVal)
}

function onSetLang(lang) {
    setLang(lang);

    if (lang === 'he') document.body.classList.add('rtl');
    else document.body.classList.remove('rtl');

    doTrans();
}