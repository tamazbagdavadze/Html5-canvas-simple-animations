module MyLib {
    export class List<T> {
        arr: T[];
        private currentIndex = 0;

        get length() {
            return this.currentIndex;
        }

        constructor(initLength: number = null) {
            if (initLength != null) {
                var length = Math.pow(2, Math.ceil(Math.log(initLength) / Math.log(2)));
                this.arr = new Array<T>(length);
            } else {
                this.arr = new Array<T>(4);
            }
        }

        add = (item: T): void => {

            if (this.arr.length === this.currentIndex) {
                this.growArray();
            }

            this.arr[this.currentIndex] = item;
            this.currentIndex++;
        }

        removeAt = (index: number) => {


            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }

            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }


            this.arr.splice(index, 1);
            this.currentIndex--;
        }

        remove = (obj: T, deleteAll: boolean = false) => {

            for (let n = 0; n < this.arr.length; n++) {
                if (this.arr[n] === obj) {
                    this.arr.splice(n, 1);
                    this.currentIndex--;
                    if (deleteAll === false)
                        break;
                }
            }
        }

        removeLast = () => {
            this.removeAt(this.currentIndex-1);
        }

        removeFirst = () => {
            this.removeAt(0);
        }

        getAt(index: number) {

            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }

            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }

            return this.arr[index];
        }

        setAt(index: number, value: T) {

            if (this.currentIndex === 0) {
                throw new Error("collection empty");
            }

            if (this.isCorrectIndex(index) === false) {
                throw new Error("wrong index");
            }

            return this.arr[index] = value;
        }

        where = (fn: IPredictorFn<T>): T[] => {
            var results = this.arr.filter(fn);
            return results;
        }

        single = (fn: IPredictorFn<T>): T => {
            var results = this.arr.filter(fn);

            if (results.length > 1) {
                throw new Error("list contains more than one element");
            }

            if (results.length === 0) {
                throw new Error("Element not found");
            }

            return results[0];
        }

        singleOrDefault = (fn: IPredictorFn<T>): T => {

            var results = this.arr.filter(fn);

            if (results.length > 1) {
                throw new Error("list contains more than one element");
            }
            if (results.length === 1) {
                return results[0];
            }

            return null;
        }

        private isCorrectIndex = (index: number): boolean => {
            if (index > this.currentIndex - 1 || index < 0) {
                return false;
            }
            return true;
        }

        private growArray = (): void => {
            var newArr = Array<T>(this.arr.length * 2);

            for (let i = 0; i < this.arr.length; i++) {
                newArr[i] = this.arr[i];
            }

            this.arr = newArr;
        }

    }

    export interface IPredictorFn<T> {
        (item:T):boolean;
    }
}