export default interface Buyable {
    readonly id: number,
    readonly name: string,
    readonly price: number,
    count?: number,
    totalPrice?: number 
}