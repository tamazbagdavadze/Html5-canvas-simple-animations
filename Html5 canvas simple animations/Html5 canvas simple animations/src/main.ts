/// <reference path="$.ts"/>
/// <reference path="../myLib/List.ts"/>
/// <reference path="Temp.ts"/>


var canvas = $.query("#canvas") as HTMLCanvasElement;
var center = new Temp.Coordinates(150, 150);
var radius = 50;

var temp = new Temp.Temp(canvas, radius, center);

temp.start();


