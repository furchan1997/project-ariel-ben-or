const page = document.getElementById("page");
const panelSide = document.getElementById('panelSide');
let showPanel = false;
let type, params;
const elementSelected = {
    title: ['headerType', 'color', 'content', 'bcElem', 'widthElem', 'heightElem'],
    input: ['inputType', 'fontSize', 'color', 'content', 'bcElem', 'widthElem', 'heightElem'],
    button: ['fontSize', 'color', 'content', 'bcElem', 'widthElem', 'heightElem'],
    media: ['mediaType', 'mediaSource', 'mediaWidth', 'mediaHeight', 'mediaCaption', 'bcElem'],
    styleContent: ['Btncenter']
};

function bgPage(elem) {
    page.style.backgroundColor = elem.value;
    save();
}

function fontSize(elem) {
    page.style.fontSize = elem.value + "px";
    save();
}

function padding(elem) {
    page.style.padding = elem.value + "px";
    save();
}

function fontFamily(elem) {
    page.style.fontFamily = elem.value;
    save();
}

function fontColor(elem) {
    page.style.color = elem.value;
    save();
}

function pageToShow(id, elem) {
    const actives = document.querySelectorAll('nav a.active');
    actives.forEach(a => a.classList.remove("active"));
    elem.classList.add("active");

    document.querySelector("#setting").style.display = "none";
    document.querySelector("#elements").style.display = "none";

    document.querySelector("#" + id).style.display = "block";
}

function typeSelect(selectElem) {
    type = selectElem.value;
    params = elementSelected[type];

    const divs = document.querySelectorAll("#params>div");
    divs.forEach(div => div.classList.remove("show"));

    params.forEach(param => document.getElementById(param).classList.add("show"));
}

function add() {
    let tagName = type;

    if (type === 'title') {
        tagName = document.querySelector('#headerType select').value;
    }
    if (type === "media") {
        tagName = document.querySelector("#mediaType select").value;
    }
    const elem = document.createElement(tagName);

    const mediaSourceInput = document.querySelector("#mediaSource input").value;
    const mediaWidthInput = document.querySelector("#mediaWidth input").value;
    const mediaHeightInput = document.querySelector("#mediaHeight input").value;
    const mediaCaptionInput = document.querySelector("#mediaCaption input").value;

    const inputType = document.querySelector('#inputType select').value;
    const fontSize = document.querySelector('#fontSize input').value;
    const color = document.querySelector('#color input').value;
    const content = document.querySelector('#content input').value;
    const bcElem = document.querySelector('#bcElem input').value;
    const widthElem = document.querySelector('#widthElem input').value;
    const heightElem = document.querySelector('#heightElem input').value;

    params.forEach(param => {
        if (param === 'inputType') {
            elem.type = inputType;
        } else if (param === 'fontSize') {
            elem.style.fontSize = fontSize + "px";
        } else if (param === 'bcElem') {
            elem.style.backgroundColor = bcElem;
        } else if (param === 'widthElem') {
            elem.style.width = widthElem + "px";
        } else if (param === 'heightElem') {
            elem.style.height = heightElem + "px";
        } else if (param === 'color') {
            elem.style.color = color;
        } else if (param === 'content') {
            if (type === 'input') {
                elem.value = content;
            } else {
                elem.innerHTML = content;
            }
        } else if (param === 'mediaSource') {
            if (tagName === 'img') {
                elem.src = mediaSourceInput;
            }
        } else if (param === 'mediaWidth') {
            elem.style.width = mediaWidthInput + "px";
        } else if (param === 'mediaHeight') {
            elem.style.height = mediaHeightInput + "px";
        } else if (param === 'mediaCaption') {
            elem.innerHTML = mediaCaptionInput;
        }
    });

    page.appendChild(elem);
    save();
}

function centerIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.justifyContent = "center";
    page.style.alignItems = "center";
    save();
}

function rightIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.alignItems = "start";
    save();
}

function leftIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.alignItems = "end";
    save();
}

function topIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.justifyContent = "start";
    page.style.alignItems = "center";
    save();
}

function bottomIt() {
    page.style.display = "flex";
    page.style.flexDirection = "column";
    page.style.justifyContent = "end";
    page.style.alignItems = "center";
    save();
}

// function rowsIt() {
//     page.style.display = "flex";
//     page.style.flexDirection = "row";
//     page.style.justifyContent = "center";
//     page.style.alignItems = "end";
//     save();
// }

function save() {
    const elements = [];
    page.childNodes.forEach(child => {
        if (child.nodeType === 1) { // Check if it is an element node
            const element = {
                tagName: child.tagName,
                innerHTML: child.innerHTML,
                style: child.style.cssText,
                attributes: {}
            };
            Array.from(child.attributes).forEach(attr => {
                element.attributes[attr.name] = attr.value;
            });
            elements.push(element);
        }
        window.screen.width < 640 ? panelSide.style.display = 'none' : panelSide.style.display = 'block';

    });

    const pageStyle = {
        backgroundColor: page.style.backgroundColor,
        fontSize: page.style.fontSize,
        padding: page.style.padding,
        fontFamily: page.style.fontFamily,
        color: page.style.color,
        display: page.style.display,
        flexDirection: page.style.flexDirection,
        justifyContent: page.style.justifyContent,
        alignItems: page.style.alignItems
    };
    localStorage.setItem('text', page.innerHTML);
    localStorage.setItem('elements', JSON.stringify(elements));
    localStorage.setItem('pageStyle', JSON.stringify(pageStyle));
}

function load() {
    const elements = JSON.parse(localStorage.getItem('elements'));
    const pageStyle = JSON.parse(localStorage.getItem('pageStyle'));

    if (elements) {
        page.innerHTML = '';
        elements.forEach(element => {
            const elem = document.createElement(element.tagName);
            elem.innerHTML = element.innerHTML;
            elem.style.cssText = element.style;
            for (const [attr, value] of Object.entries(element.attributes)) {
                elem.setAttribute(attr, value);
            }
            page.appendChild(elem);
        });
    }

    if (pageStyle) {
        for (const [style, value] of Object.entries(pageStyle)) {
            page.style[style] = value;
        }
    }
    if (localStorage.getItem('text')) {
        page.innerHTML = localStorage.getItem('text');
    }
}

function newPage() {
    page.innerHTML = "";
    page.style = "";
    localStorage.clear();
}

function showOrHide() {
    if (panelSide) {
        panelSide.style.display = showPanel ? "none" : "block";
        showPanel = !showPanel;
    }
};
load();