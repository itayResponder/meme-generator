'use strict';

let canvas;
let ctx;
let gImg = new Image();
let isUploadImg = false;

function onInitGenerator() {
    canvas = document.querySelector('.meme-canvas')
    ctx = canvas.getContext('2d');
    createLines();
    drawImgOnCanvas();
}

function drawImgOnCanvas() {
    if (!isUploadImg) {
        let imgFromStorage = getValue('meme');
        gImg.src = imgFromStorage.imgUrl;
    }
    gImg.onload = function () {
        changedCanvasSize();
    }
}

function changedCanvasSize() {
    let lines = getLines();
    if ($(window).width() <= 740) {
        canvas.width = 300;
        canvas.height = 300;
    } else {
        canvas.width = gImg.naturalWidth;
        canvas.height = gImg.naturalHeight;
    }
    resetImgSettings();
    ctx.drawImage(gImg, 0, 0, canvas.width, canvas.height);
    lines.forEach(element => {
        drawOneLineTextInCanvasWidth(element);
    });
}

function resetImgSettings() {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = '60px impact';
    let lines = getLines();
    lines.forEach(element => {
        element.x = canvas.width / 2;
        element.fontSize = ctx.font.split(' ')[0];
        element.fontType = ctx.font.split(' ')[1];
        element.align = 'center';
        element.color = 'white';
    });
    lines[0].y = 70;
    lines[1].y = canvas.height - 25;
    lines[2].y = canvas.height / 2 + 20;
}

function drawTextOnCanvas() {
    ctx.drawImage(gImg, 0, 0, canvas.width, canvas.height);
    let lines = getLines();
    let option = document.querySelector('.line-option').value;
    if(option === 'text-top') {
        lines[0].text = document.querySelector('.text').value;
    } else if(option === 'text-middle') {
        lines[2].text = document.querySelector('.text').value;
    } else {
        lines[1].text = document.querySelector('.text').value;
    }
    lines.forEach(element => {
        drawOneLineTextInCanvasWidth(element);
    });
}

function changeFont(font) {
    let lines = getLines();
    let option = document.querySelector('.line-option').value;
    if(option === 'text-top') {
        lines[0].fontType = font;
        ctx.font = lines[0].fontSize + ' ' + font;
    } else if(option === 'text-middle') {
        lines[2].fontType = font;
        ctx.font = lines[2].fontSize + ' ' + font;
    } else {
        lines[1].fontType = font;
        ctx.font = lines[1].fontSize + ' ' + font;
    }
    ctx.drawImage(gImg, 0, 0, canvas.width, canvas.height);
    lines.forEach(element => {
        drawOneLineTextInCanvasWidth(element);
    });
}

function textAlign(alignText) {
    ctx.drawImage(gImg, 0, 0, canvas.width, canvas.height);
    let option = document.querySelector('.line-option').value
    let lines = getLines();
    if(option === 'text-top') {
        lines[0].align = alignText;
        if(alignText === 'left') {
            lines[0].x = 10;
        } else if(alignText === 'center') {
            lines[0].x = canvas.width / 2;
        } else {
            lines[0].x = canvas.width - 20;
        }
        lines.forEach(element => {
            drawText(element.text, element.align, element.x, element.y);
        });
    } else if(option === 'text-middle') {
        lines[2].align = alignText;
        if(alignText === 'left') {
            lines[2].x = 10;
        } else if(alignText === 'center') {
            lines[2].x = canvas.width / 2;
        } else {
            lines[2].x = canvas.width - 20;
        }
        lines.forEach(element => {
            drawText(element.text, element.align, element.x, element.y);
        });
    } else {
        lines[1].align = alignText;
        if(alignText === 'left') {
            lines[1].x = 10;
        } else if(alignText === 'center') {
            lines[1].x = canvas.width / 2;
        } else {
            lines[1].x = canvas.width - 20;
        }
        lines.forEach(element => {
            drawText(element.text, element.align, element.x, element.y);
        });
    }
}

function fontSize(fontSize) {
    let lines = getLines();
    ctx.drawImage(gImg, 0, 0, canvas.width, canvas.height);
    if (fontSize === 'increese-font-size') {
        ctx.font = ctx.font.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) + 2) + 'px');
        lines[0].y += 1.5;
    } else {
        ctx.font = ctx.font.replace(/\d+px/, (parseInt(ctx.font.match(/\d+px/)) - 2) + 'px');
        lines[0].y -= 1.5;
    }
    lines.forEach(element => {
        drawOneLineTextInCanvasWidth(element);
        element.fontSize = ctx.font.split(' ')[0];
    });
}

function changeColor(color) {
    let lines = getLines();
    ctx.drawImage(gImg, 0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    lines.forEach(element => {
        element.color = color;
        drawOneLineTextInCanvasWidth(element);
    });
}

function drawOneLineTextInCanvasWidth(textObj) {
    let textWidth = ctx.measureText(textObj.text).width;
    if (textWidth <= canvas.width) {
        drawText(textObj.text, textObj.align, textObj.x, textObj.y);
    } else {
        let newText = textObj.text;
        do {
            newText = newText.slice(0, -1);
        } while (ctx.measureText(newText).width > canvas.width)
        drawText(newText, textObj.align, textObj.x, textObj.y);
    }
}

function drawText(text, textAlign, posX, posY) {
    ctx.textAlign = textAlign;
    ctx.strokeText(text, posX, posY);
    ctx.fillText(text, posX, posY);
}

function onContactClick() {
    document.querySelector('.contact-container').classList.toggle('in')
}

function onOperateModal(el) {
    let email = document.querySelector('.email-input').value
    let userMsg = document.querySelector('.user-email-confirmation')
    const cross = '❌';
    const check = '✔️';
    if (!email) {
        userMsg = document.querySelector('.user-email-confirmation')
        userMsg.innerText = cross;
        return;
    }
    else {
        let emails = [];
        emails.push(email);
        userMsg.innerText = check;
    }
}

function onGetLines() {
    return getLines();
}

function toggleMenu() {
    document.querySelector('.side-nav').classList.toggle('open')
}