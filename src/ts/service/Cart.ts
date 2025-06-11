import Buyable from '../domain/Buyable';

export default class Cart {
    private _items: Buyable[] = [];

    add(item: Buyable): void {
        if(item.count !== undefined && item.count < 1) {
            throw new Error ('количество товара не может быть меньше одного')
        }

        if(!item.count) {
            this._items.push(item);
            return;
        } 

        const existingItem = this._items.find(obj => obj.id === item.id);

        if(!existingItem) {
            this._items.push(item);
            return;
        } 
        
        if(existingItem.count === undefined) {
            existingItem.count = item.count;
            existingItem.totalPrice = existingItem.price * item.count;
            return;
        }

        existingItem.count += item.count;
        existingItem.totalPrice = existingItem.count * existingItem.price;
        
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
        const item = this._items.find(obj => obj.id === id)

        if(!item) {
            throw new Error ('Нет такого значения')
        } 

        if(item.count === undefined || item.count <= 1) {
                throw new Error ('Количество товаров не может быть меньше одного')
        } 
        
        item.count -= 1;
        item.totalPrice = item.count * item.price;
    }
} 