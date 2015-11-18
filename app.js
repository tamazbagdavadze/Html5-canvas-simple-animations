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
var List = MyLib.List;
var Temp;
(function (Temp_1) {
    var Temp = (function () {
        function Temp(canvas, radius, center) {
            var _this = this;
            this.start = function () {
                //            for (var i = 0; i<Math.PI*4; i+=0.05) {
                //
                //                var x = this.center.x + this.radius * Math.cos(i);
                //                var y = this.center.y + this.radius * Math.sin(i);
                //
                //                var coords = new Coordinates(x, y);
                //
                //                ((crd: Coordinates, i: number) => {
                //                    setTimeout(() => {
                //                        this.clear();
                //                        this.drawArc();
                //                        this.drawLine(crd);
                //                        this.dots.add(crd.y);
                //                        this.drawGraph();
                //
                //                    }, i);
                //                    
                //                })(coords, i*2000);
                //            }
                var tempAmgle = 45;
                setInterval(function () {
                    var x = _this.center.x + _this.radius * Math.cos(tempAmgle);
                    var y = _this.center.y + _this.radius * Math.sin(tempAmgle);
                    var crd = new Coordinates(x, y);
                    _this.clear();
                    _this.drawArc();
                    _this.drawRadius(crd);
                    _this.dots.add(crd.y);
                    if (_this.dots.length > 200) {
                        _this.dots.removeFirst();
                    }
                    _this.drawGraph();
                    _this.drawConnectingLine(crd, new Coordinates(1250 - (_this.center.x + _this.radius + _this.dots.length * 4), crd.y));
                    tempAmgle += 0.1;
                }, 30);
            };
            this.drawConnectingLine = function (start, end) {
                _this.ctx.beginPath();
                _this.ctx.lineTo(start.x, start.y);
                _this.ctx.lineTo(end.x, end.y);
                _this.ctx.stroke();
            };
            this.drawRadius = function (end) {
                _this.ctx.beginPath();
                _this.ctx.lineTo(_this.center.x, _this.center.y);
                _this.ctx.lineTo(end.x, end.y);
                _this.ctx.stroke();
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
                    _this.drawDot(new Coordinates(1250 - (_this.center.x + _this.radius + i * 4), _this.dots.getAt(i)), 4);
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
        return Temp;
    })();
    Temp_1.Temp = Temp;
    var Coordinates = (function () {
        function Coordinates(x, y) {
            this.x = x;
            this.y = y;
        }
        return Coordinates;
    })();
    Temp_1.Coordinates = Coordinates;
})(Temp || (Temp = {}));
/// <reference path="$.ts"/>
/// <reference path="../myLib/List.ts"/>
/// <reference path="Temp.ts"/>
var canvas = $.query("#canvas");
var center = new Temp.Coordinates(150, 150);
var radius = 50;
var temp = new Temp.Temp(canvas, radius, center);
temp.start();
//# sourceMappingURL=app.js.map