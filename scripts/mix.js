var counter = 0;
var canvas;
var context;
var playerArray;
window.onload = function () {
    playerArray = new Array();
    playerArray[0] = "img/1.jpg";
    playerArray[1] = "img/18.jpg";
    playerArray[2] = "img/23.jpg";
    playerArray[3] = "img/3.jpg";
    playerArray[4] = "img/20.jpg";
    playerArray[5] = "img/5.jpg";
    playerArray[6] = "img/7.jpg";
    playerArray[7] = "img/4.jpg";
    playerArray[8] = "img/11.jpg";
    playerArray[9] = "img/9.jpg";
    playerArray[10] = "img/10.jpg";

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    var img = new Image();
    img.src = playerArray[counter];
    img.onload = function () {
        context.drawImage(img, 0, 0, 600, 500)
    };
}

function pre() {
    counter--;
    if (counter == -1)
        counter = 10;
    context.clearRect(0, 0, 600, 500);
    var img = new Image();
    img.src = playerArray[counter];
    img.onload = function () {
        context.drawImage(img, 0, 0, 600, 500);
    };
}

function next() {
    counter++;
    if (counter == 11)
        counter = 0;
    context.clearRect(0, 0, 600, 500);
    var img = new Image();
    img.src = playerArray[counter];
    img.onload = function () {
        context.drawImage(img, 0, 0, 600, 500);
    };
}

function happy() {
    var src = "img/happy.jpg";
    var img = new Image();
    img.src = src;
    img.onload = function () {
        context.drawImage(img, 220, 220, 250, 250);
    }
}

function no_feeling() {
    var src = "img/no-feeling.jpg";
    var img = new Image();
    img.src = src;
    img.onload = function () {
        context.drawImage(img, 110, 110, 140, 140);
    }
}

function angry() {
    var src = "img/angry.jpg";
    var img = new Image();
    img.src = src;
    img.onload = function () {
        context.drawImage(img, 10, 10, 80, 80);
    }
}