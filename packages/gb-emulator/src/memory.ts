export class Memory {
    private readonly _addresses = new Uint8Array(0xFFFF);

    get addresses() {
        return this._addresses;
    }
}