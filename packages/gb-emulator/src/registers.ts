import { concatBytes } from "@mawsfr/binary-operations";

export class Registers {
  private _aSlot: number = 0;
  private _bSlot: number = 0;
  private _cSlot: number = 0;
  private _dSlot: number = 0;
  private _eSlot: number = 0;
  private _hSlot: number = 0;
  private _lSlot: number = 0;
  private _fSlot: number = 0;

  private _spSlot: number = 0;
  private _pcSlot: number = 0;

  get aSlot() {
    return this._aSlot & 0xFF;
  }

  get bSlot() {
    return this._bSlot & 0xFF;
  }

  get cSlot() {
    return this._cSlot & 0xFF;
  }

  get dSlot() {
    return this._dSlot & 0xFF;
  }

  get eSlot() {
    return this._eSlot & 0xFF;
  }

  get hSlot() {
    return this._hSlot & 0xFF;
  }

  get lSlot() {
    return this._lSlot & 0xFF;
  }

  get fSlot() {
    return this._fSlot & 0xFF;
  }

  get afSlot() {
    return concatBytes(this.aSlot, this.fSlot);
  }

  get bcSlot() {
    return concatBytes(this.bSlot, this.cSlot);
  }

  get deSlot() {
    return concatBytes(this.dSlot, this.eSlot);
  }

  get hlSlot() {
    return concatBytes(this.hSlot, this.lSlot);
  }

  get spSlot() {
    return this._spSlot & 0xFFff;
  }

  get pcSlot() {
    return this._pcSlot & 0xFFff;
  }

  setA(a: number) {
    this._aSlot = a & 0xFF;
  }

  setF(f: number) {
    this._fSlot = f & 0xFF;
  }

  setB(b: number) {
    this._bSlot = b & 0xFF;
  }

  setC(c: number) {
    this._cSlot = c & 0xFF;
  }

  setD(d: number) {
    this._dSlot = d & 0xFF;
  }

  setE(e: number) {
    this._eSlot = e & 0xFF;
  }

  setH(h: number) {
    this._hSlot = h & 0xFF;
  }

  setL(l: number) {
    this._lSlot = l & 0xFF;
  }

  setSP(sp: number) {
    this._spSlot = sp & 0xFFFF;
  }

  setPC(pc: number) {
    this._pcSlot = pc & 0xFFFF;
  }
}
