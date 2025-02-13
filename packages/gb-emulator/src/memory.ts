export class Memory {
    private readonly _addresses = new Uint8Array(0x8000);

    get addresses() {
        return this._addresses;
    }
}