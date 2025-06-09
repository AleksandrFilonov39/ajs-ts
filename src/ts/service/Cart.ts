import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        if(item.count < 1) {
                throw new Error ('количество товара не может быть меньше одного')
            }
        if(!item.count) {
            this._items.push(item);
        } else {
            if(this._items.find(obj => obj.id === item.id)){
                this._items.map((el) => {
                    if (el.id === item.id) {
                        el.count = el.count + item.count;
                        el.totalPrice = el.count *  el.price;
                    }
                })
            } else {
                 this._items.push(item);
            }

        }
    }

    get items(): Buyable[] {
        return [...this._items]; 
    }

    totalCost(): number {
        return this._items.reduce((acc, el) => {
            return acc += el.price
        }, 0)
    }

    totalCostWithDiscount(value: number): number {

        let total: number = this._items.reduce((acc, el) => {
            return acc += el.price
        }, 0)
        return (total) - (total * value / 100);
    }

    deleteItemCart(id: number): void {
        this._items = this._items.filter(el => el.id !== id)
    }

    minusCount(id: number): void {
         if(!this._items.find(obj => obj.id === id)) {
            throw new Error ('Нет такого значения')
        } else {
            if(!this._items.find(el => el.id !== id) || this._items.filter(el => el.id !== id)[0].count === 1) {
                 throw new Error ('Количество товаров не может быть меньше одного')
            } else {
                this._items.map((el) => {
                    if (el.id === id) {
                        el.count -= 1;
                        el.totalPrice = el.count * el.price;
                    }
                })
            }
        }
    }



} 