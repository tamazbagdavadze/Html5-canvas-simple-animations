module Animations {
    export class Square {
        
        private startPoint: Coordinates;
        private center: Coordinates;
        private height: number;
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;

        private dots: List<number>;

        private interval = 15;

        constructor(canvas: HTMLCanvasElement, height: number, startPoint: Coordinates) {
            this.canvas = canvas;
            this.startPoint = startPoint;
            this.height = height;
            this.ctx = canvas.getContext("2d");
            this.dots = new List<number>(100);
            this.center = new Coordinates(startPoint.x + height / 2, startPoint.y + height / 2);
        }

        start = (): void => {

            var tempAmgle = 0;

            setInterval(() => {

                var x = this.center.x + this.height * Math.cos(tempAmgle);
                var y = this.center.y + this.height * Math.sin(tempAmgle);
                
                var crd = new Coordinates(x, y);
                var intersection = this.getSquareIntersectionPoint(crd);
                
                if (intersection != null) {
                    this.clear();
                    this.drawSquare();
                    this.drawRadius(intersection);
                    this.dots.add(intersection.y);

                    if (this.dots.length > 200) {
                        this.dots.removeFirst();
                    }

                    this.drawGraph();

                    this.drawConnectingLine(intersection, new Coordinates(1250 - (this.startPoint.x + this.height + this.dots.length * 4), intersection.y));
                }
                tempAmgle += 0.05;

            }, this.interval);
        }

        getSquareIntersectionPoint = (crd: Coordinates): Coordinates => {
            
            var point: Coordinates = null;

            point = lineIntersect(this.center.x, this.center.y, crd.x, crd.y, this.startPoint.x, this.startPoint.y, this.startPoint.x, this.startPoint.y + this.height);
            

            if (point == null) {
                point = lineIntersect(this.center.x, this.center.y, crd.x, crd.y, this.startPoint.x, this.startPoint.y, this.startPoint.x + this.height, this.startPoint.y);
            }

            if (point == null) {
                point = lineIntersect(this.center.x, this.center.y, crd.x, crd.y, this.startPoint.x + this.height, this.startPoint.y, this.startPoint.x + this.height, this.startPoint.y + this.height);
            }

            if (point == null) {
               point = lineIntersect(this.center.x, this.center.y, crd.x, crd.y, this.startPoint.x, this.startPoint.y + this.height, this.startPoint.x + this.height, this.startPoint.y + this.height);
            }
            return point;

            

            //var point: Coordinates = null;

            //point = getIntersectionPoint(this.center, crd, this.startPoint, new Coordinates(this.startPoint.x, this.startPoint.y + this.height));

            //if (point == null) {
            //    point = getIntersectionPoint(this.center, crd, this.startPoint, new Coordinates(this.startPoint.x + this.height, this.startPoint.y)); 
            //}

            //if (point == null) {
            //    point = getIntersectionPoint(this.center, crd, new Coordinates(this.startPoint.x + this.height, this.startPoint.y), new Coordinates(this.startPoint.x + this.height, this.startPoint.y + this.height)); 
            //}

            //if (point == null) {
            //    point = getIntersectionPoint(this.center, crd, new Coordinates(this.startPoint.x, this.startPoint.y + this.height), new Coordinates(this.startPoint.x + this.height, this.startPoint.y + this.height));
            //}
            //return point;
        }

        drawConnectingLine = (start: Coordinates, end: Coordinates) => {
            this.ctx.strokeStyle = "#00FF00";
            this.ctx.beginPath();
            this.ctx.lineTo(start.x, start.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.stroke();
            this.ctx.strokeStyle = "#000000";
        }

        drawRadius = (end: Coordinates) => {
            this.ctx.beginPath();
            this.ctx.strokeStyle = "#ff0000";
            this.ctx.lineTo(this.center.x, this.center.y);
            this.ctx.lineTo(end.x, end.y);
            this.ctx.stroke();
            this.ctx.strokeStyle = "#000000";
        }

        drawSquare = () => {
            this.ctx.beginPath();
            this.ctx.strokeRect(this.startPoint.x, this.startPoint.y, this.height, this.height);           
            this.ctx.stroke();
        }

        drawDot = (crds: Coordinates, width: number = 1) => {
            this.ctx.fillRect(crds.x, crds.y, width, width);
        }

        drawGraph = () => {

            var length = this.dots.length;

            for (let i = 0; i < length; i++) {
                this.drawDot(new Coordinates(1250 - (this.startPoint.x + this.height + i * 4), this.dots.getAt(i)), 2);
            }
        }

        clear = () => {

            var canvasW = parseInt(this.canvas.getAttribute("width"), 10);
            var canvasH = parseInt(this.canvas.getAttribute("height"), 10);

            this.ctx.clearRect(0, 0, canvasW, canvasH);
        }
    }
}