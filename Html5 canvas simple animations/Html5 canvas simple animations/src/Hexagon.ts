module Animations {
    export class Polygon {

        private startPoint: Coordinates;
        private center: Coordinates;
        private sectionLength: number;
        private canvas: HTMLCanvasElement;
        private ctx: CanvasRenderingContext2D;
        private dots: List<number>;
        private temp = false;
        private interval = 16;
        private sections: Section[];
        private sectionNumber = 5;
        private radiusSection: Section;
        private intervalId = null;


        constructor(sectionNum:number, canvas: HTMLCanvasElement, sectionLength: number, startPoint: Coordinates) {
            this.canvas = canvas;
            this.startPoint = startPoint;
            this.sectionLength = sectionLength;
            this.ctx = canvas.getContext("2d");
            this.dots = new List<number>(100);
            this.center = new Coordinates(startPoint.x + sectionLength / 2, startPoint.y + sectionLength / 2);
            this.sectionNumber = sectionNum + 1;
            
            this.initSections();
        }

        start = (): void => {

            var tempAmgle = 0;

            this.intervalId = setInterval(() => {

                var x = this.center.x + this.sectionLength * 2 * Math.cos(tempAmgle);
                var y = this.center.y + this.sectionLength * 2 * Math.sin(tempAmgle);

                var crd = new Coordinates(x, y);
                this.radiusSection = new Section(this.center, crd);

                var intersection = this.getSquareIntersectionPoint(crd);

                if (intersection != null) {
                    this.clear();
                    this.drawHExagon();
                    this.drawRadius(intersection);
                    this.dots.add(intersection.y);

                    if (this.dots.length > 200) {
                        this.dots.removeFirst();
                    }

                    this.drawGraph();

                    this.drawConnectingLine(intersection, new Coordinates(1250 - (this.startPoint.x + this.sectionLength + this.dots.length * 4), intersection.y));
                }
                tempAmgle += 0.05;

            }, this.interval);
        }

        initSections = (): void => {

            this.sections = new Array<Section>(this.sectionNumber);

            for (var i = 0; i < this.sectionNumber; i++) {
                this.sections[i] = new Section(null, null);
            }

            var numberOfSides = this.sectionNumber - 1,
                size = 100,
                Xcenter = 160,
                Ycenter = 160;

            var x: number;
            var y: number;

            var angleNumber = (this.sectionNumber - 1);
            var innerAngle =  180 * (angleNumber - 2) / angleNumber;
            var rotateAngle = (180 - innerAngle);
            var rotateAngleRadian = (Math.PI / 180) * (rotateAngle / 2);
            
            for (var i = 0; i <= numberOfSides; i++) {

                x = Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides - rotateAngleRadian);
                y = Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides - rotateAngleRadian);

                let crds = new Coordinates(x, y);

                this.sections[i].start = crds;

                if (i != 0) {
                    this.sections[i - 1].end = crds
                } else {
                    this.sections[numberOfSides].end = crds
                }
            }
        }

        getSquareIntersectionPoint = (crd: Coordinates): Coordinates => {

            var point: Coordinates = null;

            var radius = this.radiusSection;

            for (var section of this.sections) {
                point = lineIntersect(radius.start.x, radius.start.y, radius.end.x, radius.end.y, section.start.x, section.start.y, section.end.x, section.end.y)
                if (point != null)
                    break;
            }

            return point;
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

        drawHExagon = () => {

            this.ctx.beginPath();
            
            for (var section of this.sections) {
                this.drawSection(section.start, section.end);
            }
            
            this.ctx.strokeStyle = "#000000";
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
        }

        drawSection = (start: Coordinates, end: Coordinates): void => {
            this.ctx.moveTo(start.x, start.y);
            this.ctx.lineTo(end.x, end.y);
        }

        drawDot = (crds: Coordinates, width: number = 1) => {
            this.ctx.fillRect(crds.x, crds.y, width, width);
        }

        drawGraph = () => {

            var length = this.dots.length;

            for (let i = 0; i < length; i++) {
                this.drawDot(new Coordinates(1250 - (this.startPoint.x + this.sectionLength + i * 4), this.dots.getAt(i)), 2);
            }
        }

        clear = () => {

            var canvasW = parseInt(this.canvas.getAttribute("width"), 10);
            var canvasH = parseInt(this.canvas.getAttribute("height"), 10);

            this.ctx.clearRect(0, 0, canvasW, canvasH);
        }

        destruct = () => {
            clearInterval(this.intervalId);
            this.clear();
        }
    }
}