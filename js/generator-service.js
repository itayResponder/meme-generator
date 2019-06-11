'use strict';

let gLines;

function createLines() {
    let lines = getValue('lines');
    if(!lines || !lines.length) {
        lines = [
            createLine('', 0, 0, '', '' ,'', ''),
            createLine('', 0, 0, '', '' ,'', ''),
            createLine('', 0, 0, '', '' ,'', '')
        ]
    }
    gLines = lines;
    saveValue('lines', gLines);
    return lines;
}

function createLine(text, x, y, fontSize, fontType, align, color) {
    let line = {
        text: text,
        x: x,
        y: y,
        fontSize: fontSize,
        fontType: fontYype,
        align: align,
        color: color
    }
    return line;
}

function getLines() {
    return gLines;
}