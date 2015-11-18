﻿import List = MyLib.List;


module Temp {
    export class Temp {

        private center: Coordinates;
        private radius: number;
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;

        private dots: List<number>;
        
        constructor(canvas: HTMLCanvasElement, radius: number, center: Coordinates) {
            this.canvas = canvas;
            this.center = center;
            this.radius = radius;
            this.ctx = canvas.getContext("2d");
            this.dots = new List<number>(100);
        }

        start = (): void => {
            
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

            setInterval(() => {

                var x = this.center.x + this.radius * Math.cos(tempAmgle);
                var y = this.center.y + this.radius * Math.sin(tempAmgle);

                var crd = new Coordinates(x, y);
                
                this.clear();
                this.drawArc();
                this.drawRadius(crd);
                this.dots.add(crd.y);

                if (this.dots.length > 200) {
                    this.dots.removeFirst();
                }

                this.drawGraph();

                this.drawConnectingLine(crd, new Coordinates(1250 - (this.center.x + this.radius + this.dots.length * 4), crd.y));

                tempAmgle += 0.1;

            },30);

        }

        drawConnectingLine = (start:Coordinates, end:Coordinates) => {
            this.ctx.beginPath();
            this.ctx.lineTo(start.x, start.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.stroke();
        }

        drawRadius = (end:Coordinates) => {
            this.ctx.beginPath();
            this.ctx.lineTo(this.center.x, this.center.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.stroke();
        }

        drawArc = () => {
            this.ctx.beginPath();
            this.ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

        drawDot = (crds:Coordinates, width:number=1) => {
            this.ctx.fillRect(crds.x, crds.y, width, width);
        }

        drawGraph = () => {

            var length = this.dots.length;
            
            for (let i = 0; i < length; i++) {
                this.drawDot(new Coordinates(1250 - (this.center.x + this.radius + i * 4), this.dots.getAt(i)), 4);
            }
        }
          
        clear = () => {

            var canvasW = parseInt(this.canvas.getAttribute("width"), 10);
            var canvasH = parseInt(this.canvas.getAttribute("height"), 10);

            this.ctx.clearRect(0, 0, canvasW, canvasH);
            
        }
    }

    export class Coordinates {
        constructor(public x: number, public y: number) {

        }
    }
}