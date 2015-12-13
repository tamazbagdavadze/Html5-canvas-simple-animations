
module Animations {

    class Circle {
        crd: Coordinates;
        radius: number;

        constructor(crd: Coordinates, radius: number) {
            this.crd = crd;
            this.radius = radius;
        }
    }

    export class DivideCircles {
        
        private initNum: number;
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;

        private circles: List<Circle>;
        private interval = 30;

        constructor(canvas: HTMLCanvasElement, initNum: number) {
            this.canvas = canvas;
            this.initNum = initNum;
            this.ctx = canvas.getContext("2d");
            this.circles = new List<Circle>(100);

            this.circles.add(new Circle(new Coordinates(20, 20) , 10));
            this.drawCircles();
        }

        start = (): void => {
            
        }
        
        drawArc = (start: Coordinates, radius: number) => {
            this.ctx.beginPath();
            this.ctx.arc(start.x, start.y, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }

        drawDot = (crds:Coordinates, width:number=1) => {
            this.ctx.fillRect(crds.x, crds.y, width, width);
        }

        drawCircles = () => {

            var length = this.circles.length;
            
            for (let i = 0; i < length; i++) {

                let circle = this.circles.getAt(i);

                //this.drawArc(circle.crd, circle.radius);
                
            }
        }
          
        clear = () => {

            var canvasW = parseInt(this.canvas.getAttribute("width"), 10);
            var canvasH = parseInt(this.canvas.getAttribute("height"), 10);

            this.ctx.clearRect(0, 0, canvasW, canvasH);
        }
    }
}