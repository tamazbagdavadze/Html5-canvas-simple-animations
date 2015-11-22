module Animations {
    export function getIntersectionPoint(v11:Coordinates,v12:Coordinates, v21:Coordinates, v22:Coordinates):Coordinates {

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
        if (y < Math.min(v11.y, v12.y, v21.y, v22.y) || y > Math.max(v11.y, v12.y, v21.y, v22.y)){
            return null;
        }

        return new Coordinates(Math.abs(x), Math.abs(y));
    }

    export function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4): Coordinates {
        var x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        var y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
        if (isNaN(x) || isNaN(y)) {
            return null;
        } else {
            if (x1 >= x2) {
                if (!(x2 <= x && x <= x1)) { return null; }
            } else {
                if (!(x1 <= x && x <= x2)) { return null; }
            }
            if (y1 >= y2) {
                if (!(y2 <= y && y <= y1)) { return null; }
            } else {
                if (!(y1 <= y && y <= y2)) { return null; }
            }
            if (x3 >= x4) {
                if (!(x4 <= x && x <= x3)) { return null; }
            } else {
                if (!(x3 <= x && x <= x4)) { return null; }
            }
            if (y3 >= y4) {
                if (!(y4 <= y && y <= y3)) { return null; }
            } else {
                if (!(y3 <= y && y <= y4)) { return null; }
            }
        }
        return new Coordinates(x, y);
    }
}