/// <reference path="$.ts"/>
/// <reference path="../myLib/List.ts"/>
/// <reference path="helpers.ts" />
/// <reference path="Circle.ts"/>

var canvas = $.query("#canvas") as HTMLCanvasElement;
var center = new Animations.Coordinates(150, 150);
var radius = 50;

var cirle = new Animations.Circle(canvas, radius, center);

cirle.start();








var canvas2 = $.query("#canvas2") as HTMLCanvasElement;
var startPoint = new Animations.Coordinates(120, 120);
var height = 80;

var polygon = new Animations.Polygon(canvas2, height, startPoint);

polygon.start();