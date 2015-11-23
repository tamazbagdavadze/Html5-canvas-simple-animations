/// <reference path="$.ts"/>
/// <reference path="../myLib/List.ts"/>
/// <reference path="helpers.ts" />
/// <reference path="Circle.ts"/>



var canvas = $.query("#canvas") as HTMLCanvasElement;
var center = new Animations.Coordinates(150, 150);
var radius = 50;

var cirle = new Animations.Circle(canvas, radius, center);

cirle.start();

////////////////////////////////////////////////////////////

var canvas2 = $.query("#canvas2") as HTMLCanvasElement;
var ctrl = $.query("#angleNumber") as HTMLInputElement;
var polygon: Animations.Polygon = null;

ctrl.onchange = (e) => {
    var angleNumber = parseInt((e.srcElement as HTMLInputElement).value, 10);
    angleNumChanged(angleNumber);
}

function angleNumChanged(angleNumber: number) {
    var startPoint = new Animations.Coordinates(120, 120);
    var height = 80;

    if (polygon != null) {
        polygon.destruct();
    }

    polygon = new Animations.Polygon(angleNumber, canvas2, height, startPoint);
    polygon.start();
}

angleNumChanged(4);