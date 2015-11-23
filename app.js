var Animations;
(function (Animations) {
    var Coordinates = (function () {
        function Coordinates(x, y) {
            this.x = x;
            this.y = y;
        }
        return Coordinates;
    })();
    Animations.Coordinates = Coordinates;
    var Section = (function () {
        function Section(start, end) {
            this.start = start;
            this.end = end;
        }
        return Section;
    })();
    Animations.Section = Section;
    /**
     * bad func
     * @param v11
     * @param v12
     * @param v21
     * @param v22
     */
    function getIntersectionPoint(v11, v12, v21, v22) {
        var A1 = v12.y - v11.y;
        var B1 = v11.x - v12.x;
        var C1 = A1 * v11.x + B1 * v11.y;
        var A2 = v22.y - v21.y;
        var B2 = v21.x - v22.x;
        var C2 = A2 * v21.x + B2 * v21.y;
        var det = A1 * B2 - A2 * B1;
        if (det == 0) {
            return null;
        }
        var x = (B2 * C1 - B1 * C2) / det;
        var y = (A1 * C2 - A2 * C1) / det;
        console.log(x + " " + y);
        if (x < Math.min(v11.x, v12.x, v21.x, v22.x) || x > Math.max(v11.x, v12.x, v21.x, v22.x)) {
            return null;
        }
        if (y < Math.min(v11.y, v12.y, v21.y, v22.y) || y > Math.max(v11.y, v12.y, v21.y, v22.y)) {
            return null;
        }
        return new Coordinates(Math.abs(x), Math.abs(y));
    }
    Animations.getIntersectionPoint = getIntersectionPoint;
    function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        var eps = 0.0000001;
        function between(a, b, c) {
            return a - eps <= b && b <= c + eps;
        }
        var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) /
            ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) /
            ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        if (isNaN(x) || isNaN(y)) {
            return null;
        }
        else {
            if (x1 >= x2) {
                if (!between(x2, x, x1)) {
                    return null;
                }
            }
            else {
                if (!between(x1, x, x2)) {
                    return null;
                }
            }
            if (y1 >= y2) {
                if (!between(y2, y, y1)) {
                    return null;
                }
            }
            else {
                if (!between(y1, y, y2)) {
                    return null;
                }
            }
            if (x3 >= x4) {
                if (!between(x4, x, x3)) {
                    return null;
                }
            }
            else {
                if (!between(x3, x, x4)) {
                    return null;
                }
            }
            if (y3 >= y4) {
                if (!between(y4, y, y3)) {
                    return null;
                }
            }
            else {
                if (!between(y3, y, y4)) {
                    return null;
                }
            }
        }
        return new Coordinates(x, y);
    }
    Animations.lineIntersect = lineIntersect;
    /**
     * bad func
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param x3
     * @param y3
     * @param x4
     * @param y4
     */
    function lineIntersect2(x1, y1, x2, y2, x3, y3, x4, y4) {
        var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        if (isNaN(x) || isNaN(y)) {
            return null;
        }
        else {
            if (x1 >= x2) {
                if (!(x2 <= x && x <= x1)) {
                    return null;
                }
            }
            else {
                if (!(x1 <= x && x <= x2)) {
                    return null;
                }
            }
            if (y1 >= y2) {
                if (!(y2 <= y && y <= y1)) {
                    return null;
                }
            }
            else {
                if (!(y1 <= y && y <= y2)) {
                    return null;
                }
            }
            if (x3 >= x4) {
                if (!(x4 <= x && x <= x3)) {
                    return null;
                }
            }
            else {
                if (!(x3 <= x && x <= x4)) {
                    return null;
                }
            }
            if (y3 >= y4) {
                if (!(y4 <= y && y <= y3)) {
                    return null;
                }
            }
            else {
                if (!(y3 <= y && y <= y4)) {
                    return null;
                }
            }
        }
        return new Coordinates(x, y);
    }
    Animations.lineIntersect2 = lineIntersect2;
})(Animations || (Animations = {}));
var MyLib;
(function (MyLib) {
    var List = (function () {
        function List(initLength) {
            var _this = this;
            if (initLength === void 0) { initLength = null; }
            this.currentIndex = 0;
            this.add = function (item) {
                if (_this.arr.length === _this.currentIndex) {
                    _this.growArray();
                }
                _this.arr[_this.currentIndex] = item;
                _this.currentIndex++;
            };
            this.removeAt = function (index) {
                if (_this.currentIndex === 0) {
                    throw new Error("collection empty");
                }
                if (_this.isCorrectIndex(index) === false) {
                    throw new Error("wrong index");
                }
                _this.arr.splice(index, 1);
                _this.currentIndex--;
            };
            this.remove = function (obj, deleteAll) {
                if (deleteAll === void 0) { deleteAll = false; }
                for (var n = 0; n < _this.arr.length; n++) {
                    if (_this.arr[n] === obj) {
                        _this.arr.splice(n, 1);
                        _this.currentIndex--;
                        if (deleteAll === false)
                            break;
                    }
                }
            };
            this.removeLast = function () {
                _this.removeAt(_this.currentIndex - 1);
            };
            this.removeFirst = function () {
                _this.removeAt(0);
            };
            this.where = function (fn) {
                var results = _this.arr.filter(fn);
                return results;
            };
            this.single = function (fn) {
                var results = _this.arr.filter(fn);
                if (results.length > 1) {
                    throw new Error("list contains more than one element");
                }
                if (results.length === 0) {
                    throw new Error("Element not found");
                }
                return results[0];
            };
            this.singleOrDefault = function (fn) {
                var results = _this.arr.filter(fn);
                if (results.length > 1) {
                    throw new Error("list contains more than one element");
                }
                if (results.length === 1) {
                    return results[0];
                }
                return null;
            };
            this.isCorrectIndex = function (index) {
                if (index > _this.currentIndex - 1 || index < 0) {
                    return false;
                }
                return true;
            };
            this.growArray = function () {
                var newArr = Array(_this.arr.length * 2);
                for (var i = 0; i < _this.arr.length; i++) {
                    newArr[i] = _this.arr[i];
                }
                _this.arr = newArr;
            };
            if (initLength != null) {
                var length = Math.pow(2, Math.ceil(Math.log(initLength) / Math.log(2)));
                this.arr = new Array(length);
            }
            else {
                this.arr = new Array(4);
            }
        }
        Object.defineProperty(List.prototype, "length", {
            get: function () {
                return this.currentIndex;
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.getAt = function (index) {
            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }
            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }
            return this.arr[index];
        };
        List.prototype.setAt = function (index, value) {
            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }
            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }
            return this.arr[index] = value;
        };
        return List;
    })();
    MyLib.List = List;
})(MyLib || (MyLib = {}));
var $;
(function ($) {
    function getElById(id) {
        var el = document.getElementById(id);
        if (el == null) {
            throw new Error("element not found with given id");
        }
        return el;
    }
    $.getElById = getElById;
    function getElsByClass(className) {
        return document.getElementsByClassName(className);
    }
    $.getElsByClass = getElsByClass;
    function query(queryString) {
        if (queryString.substr(0, 1) === "#") {
            return getElById(queryString.substr(1, queryString.length - 1));
        }
        else {
            return getElsByClass(queryString);
        }
    }
    $.query = query;
})($ || ($ = {}));
var Animations;
(function (Animations) {
    var Polygon = (function () {
        function Polygon(sectionNum, canvas, sectionLength, startPoint) {
            var _this = this;
            this.temp = false;
            this.interval = 16;
            this.sectionNumber = 5;
            this.intervalId = null;
            this.start = function () {
                var tempAmgle = 0;
                _this.intervalId = setInterval(function () {
                    var x = _this.center.x + _this.sectionLength * 2 * Math.cos(tempAmgle);
                    var y = _this.center.y + _this.sectionLength * 2 * Math.sin(tempAmgle);
                    var crd = new Animations.Coordinates(x, y);
                    _this.radiusSection = new Animations.Section(_this.center, crd);
                    var intersection = _this.getSquareIntersectionPoint(crd);
                    if (intersection != null) {
                        _this.clear();
                        _this.drawHExagon();
                        _this.drawRadius(intersection);
                        _this.dots.add(intersection.y);
                        if (_this.dots.length > 200) {
                            _this.dots.removeFirst();
                        }
                        _this.drawGraph();
                        _this.drawConnectingLine(intersection, new Animations.Coordinates(1250 - (_this.startPoint.x + _this.sectionLength + _this.dots.length * 4), intersection.y));
                    }
                    tempAmgle += 0.05;
                }, _this.interval);
            };
            this.initSections = function () {
                _this.sections = new Array(_this.sectionNumber);
                for (var i = 0; i < _this.sectionNumber; i++) {
                    _this.sections[i] = new Animations.Section(null, null);
                }
                var numberOfSides = _this.sectionNumber - 1, size = 100, Xcenter = 160, Ycenter = 160;
                var x;
                var y;
                var angleNumber = (_this.sectionNumber - 1);
                var innerAngle = 180 * (angleNumber - 2) / angleNumber;
                var rotateAngle = (180 - innerAngle);
                var rotateAngleRadian = (Math.PI / 180) * (rotateAngle / 2);
                for (var i = 0; i <= numberOfSides; i++) {
                    x = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides - rotateAngleRadian);
                    y = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides - rotateAngleRadian);
                    var crds = new Animations.Coordinates(x, y);
                    _this.sections[i].start = crds;
                    if (i != 0) {
                        _this.sections[i - 1].end = crds;
                    }
                    else {
                        _this.sections[numberOfSides].end = crds;
                    }
                }
            };
            this.getSquareIntersectionPoint = function (crd) {
                var point = null;
                var radius = _this.radiusSection;
                for (var _i = 0, _a = _this.sections; _i < _a.length; _i++) {
                    var section = _a[_i];
                    point = Animations.lineIntersect(radius.start.x, radius.start.y, radius.end.x, radius.end.y, section.start.x, section.start.y, section.end.x, section.end.y);
                    if (point != null)
                        break;
                }
                return point;
            };
            this.drawConnectingLine = function (start, end) {
                _this.ctx.strokeStyle = "#00FF00";
                _this.ctx.beginPath();
                _this.ctx.lineTo(start.x, start.y);
                _this.ctx.lineTo(end.x, end.y);
                _this.ctx.stroke();
                _this.ctx.strokeStyle = "#000000";
            };
            this.drawRadius = function (end) {
                _this.ctx.beginPath();
                _this.ctx.strokeStyle = "#ff0000";
                _this.ctx.lineTo(_this.center.x, _this.center.y);
                _this.ctx.lineTo(end.x, end.y);
                _this.ctx.stroke();
                _this.ctx.strokeStyle = "#000000";
            };
            this.drawHExagon = function () {
                _this.ctx.beginPath();
                for (var _i = 0, _a = _this.sections; _i < _a.length; _i++) {
                    var section = _a[_i];
                    _this.drawSection(section.start, section.end);
                }
                _this.ctx.strokeStyle = "#000000";
                _this.ctx.lineWidth = 1;
                _this.ctx.stroke();
            };
            this.drawSection = function (start, end) {
                _this.ctx.moveTo(start.x, start.y);
                _this.ctx.lineTo(end.x, end.y);
            };
            this.drawDot = function (crds, width) {
                if (width === void 0) { width = 1; }
                _this.ctx.fillRect(crds.x, crds.y, width, width);
            };
            this.drawGraph = function () {
                var length = _this.dots.length;
                for (var i = 0; i < length; i++) {
                    _this.drawDot(new Animations.Coordinates(1250 - (_this.startPoint.x + _this.sectionLength + i * 4), _this.dots.getAt(i)), 2);
                }
            };
            this.clear = function () {
                var canvasW = parseInt(_this.canvas.getAttribute("width"), 10);
                var canvasH = parseInt(_this.canvas.getAttribute("height"), 10);
                _this.ctx.clearRect(0, 0, canvasW, canvasH);
            };
            this.destruct = function () {
                clearInterval(_this.intervalId);
                _this.clear();
            };
            this.canvas = canvas;
            this.startPoint = startPoint;
            this.sectionLength = sectionLength;
            this.ctx = canvas.getContext("2d");
            this.dots = new List(100);
            this.center = new Animations.Coordinates(startPoint.x + sectionLength / 2, startPoint.y + sectionLength / 2);
            this.sectionNumber = sectionNum + 1;
            this.initSections();
        }
        return Polygon;
    })();
    Animations.Polygon = Polygon;
})(Animations || (Animations = {}));
var List = MyLib.List;
var Animations;
(function (Animations) {
    var Circle = (function () {
        function Circle(canvas, radius, center) {
            var _this = this;
            this.interval = 30;
            this.start = function () {
                var tempAmgle = 45;
                setInterval(function () {
                    var x = _this.center.x + _this.radius * Math.cos(tempAmgle);
                    var y = _this.center.y + _this.radius * Math.sin(tempAmgle);
                    var crd = new Animations.Coordinates(x, y);
                    _this.clear();
                    _this.drawArc();
                    _this.drawRadius(crd);
                    _this.dots.add(crd.y);
                    if (_this.dots.length > 200) {
                        _this.dots.removeFirst();
                    }
                    _this.drawGraph();
                    _this.drawConnectingLine(crd, new Animations.Coordinates(1250 - (_this.center.x + _this.radius + _this.dots.length * 4), crd.y));
                    tempAmgle += 0.1;
                }, _this.interval);
            };
            this.drawConnectingLine = function (start, end) {
                _this.ctx.strokeStyle = "#00FF00";
                _this.ctx.beginPath();
                _this.ctx.lineTo(start.x, start.y);
                _this.ctx.lineTo(end.x, end.y);
                _this.ctx.stroke();
                _this.ctx.strokeStyle = "#000000";
            };
            this.drawRadius = function (end) {
                _this.ctx.beginPath();
                _this.ctx.strokeStyle = "#ff0000";
                _this.ctx.lineTo(_this.center.x, _this.center.y);
                _this.ctx.lineTo(end.x, end.y);
                _this.ctx.stroke();
                _this.ctx.strokeStyle = "#000000";
            };
            this.drawArc = function () {
                _this.ctx.beginPath();
                _this.ctx.arc(_this.center.x, _this.center.y, _this.radius, 0, 2 * Math.PI);
                _this.ctx.stroke();
            };
            this.drawDot = function (crds, width) {
                if (width === void 0) { width = 1; }
                _this.ctx.fillRect(crds.x, crds.y, width, width);
            };
            this.drawGraph = function () {
                var length = _this.dots.length;
                for (var i = 0; i < length; i++) {
                    _this.drawDot(new Animations.Coordinates(1250 - (_this.center.x + _this.radius + i * 4), _this.dots.getAt(i)), 2);
                }
            };
            this.clear = function () {
                var canvasW = parseInt(_this.canvas.getAttribute("width"), 10);
                var canvasH = parseInt(_this.canvas.getAttribute("height"), 10);
                _this.ctx.clearRect(0, 0, canvasW, canvasH);
            };
            this.canvas = canvas;
            this.center = center;
            this.radius = radius;
            this.ctx = canvas.getContext("2d");
            this.dots = new List(100);
        }
        return Circle;
    })();
    Animations.Circle = Circle;
})(Animations || (Animations = {}));
/// <reference path="$.ts"/>
/// <reference path="../myLib/List.ts"/>
/// <reference path="helpers.ts" />
/// <reference path="Circle.ts"/>
var canvas = $.query("#canvas");
var center = new Animations.Coordinates(150, 150);
var radius = 50;
var cirle = new Animations.Circle(canvas, radius, center);
cirle.start();
////////////////////////////////////////////////////////////
var canvas2 = $.query("#canvas2");
var ctrl = $.query("#angleNumber");
var polygon = null;
//ctrl.onchange = (e) => {
//    var angleNumber = parseInt((e.srcElement as HTMLInputElement).value, 10);
//    angleNumChanged(angleNumber);
//}
ctrl.oninput = function (e) {
    var angleNumber = parseInt(e.srcElement.value, 10);
    angleNumChanged(angleNumber);
};
function angleNumChanged(angleNumber) {
    var startPoint = new Animations.Coordinates(120, 120);
    var height = 80;
    if (polygon != null) {
        polygon.destruct();
    }
    polygon = new Animations.Polygon(angleNumber, canvas2, height, startPoint);
    polygon.start();
}
angleNumChanged(4);
//# sourceMappingURL=app.js.map