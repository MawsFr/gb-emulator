import {
  concatBytes,
  get1stBit,
  get2ndBit,
  get3rdBit,
  get4thBit,
  isolate2FirstDigits,
  isolate2LastDigits,
  set1stBit,
  set2ndBit,
  set3rdBit,
  set4thBit
} from "@mawsfr/binary-operations";

export class Registers {
    private _A: number = 0;
    private _B: number = 0;
    private _C: number = 0;
    private _D: number = 0;
    private _E: number = 0;
    private _H: number = 0;
    private _L: number = 0;

    private _SP: number = 0;
    private _PC: number = 0;

    private _F: number = 0;

    get A() {
        return this._A & 0xFF;
    }

    get B() {
        return this._B & 0xFF;
    }

    get C() {
        return this._C & 0xFF;
    }

    get D() {
        return this._D & 0xFF;
    }

    get E() {
        return this._E & 0xFF;
    }

    get H() {
        return this._H & 0xFF;
    }

    get L() {
        return this._L & 0xFF;
    }

    get F() {
        return this._F & 0xFF;
    }

    /**
     * Gets zero flag Z
     */
    get zeroFlag() {
        return get1stBit(this.F);
    }

    /**
     * Gets subtraction flag N
     */
    get subtractionFlag() {
        return get2ndBit(this.F);
    }

    /**
     * Gets half carry flag H
     */
    get halfCarryFlag() {
        return get3rdBit(this.F);
    }

    /**
     * Gets carry flag CY
     */
    get carryFlag() {
        return get4thBit(this.F);
    }

    /**
     * Sets zero flag Z
     * @param value
     */
    set zeroFlag(value: number) {
        this.F = set1stBit(this.F, value)
    }

    /**
     * Sets subtraction flag N
     * @param value
     */
    set subtractionFlag(value: number) {
        this.F = set2ndBit(this.F, value)
    }

    /**
     * Sets half carry flag H
     * @param value
     */
    set halfCarryFlag(value: number) {
        this.F = set3rdBit(this.F, value)
    }

    /**
     * Sets carry flag CY
     * @param value
     */
    set carryFlag(value: number) {
        this.F = set4thBit(this.F, value)
    }

    get AF() {
        return concatBytes(this.A, this.F);
    }

    get BC() {
        return concatBytes(this.B, this.C);
    }

    get DE() {
        return concatBytes(this.D, this.E);
    }

    get HL() {
        return concatBytes(this.H, this.L);
    }

    get SP() {
        return this._SP & 0xFFff;
    }

    get PC() {
        return this._PC & 0xFFff;
    }

    set A(value: number) {
        this._A = value & 0xFF;
    }

    set F(value: number) {
        this._F = value & 0xFF;
    }

    set B(value: number) {
        this._B = value & 0xFF;
    }

    set C(value: number) {
        this._C = value & 0xFF;
    }

    set D(value: number) {
        this._D = value & 0xFF;
    }

    set E(value: number) {
        this._E = value & 0xFF;
    }

    set H(value: number) {
        this._H = value & 0xFF;
    }

    set L(value: number) {
        this._L = value & 0xFF;
    }

    set SP(value: number) {
        this._SP = value & 0xFFFF;
    }

    set PC(value: number) {
        this._PC = value & 0xFFFF;
    }

    set AF(value: number) {
        this.A = isolate2FirstDigits(value)
        this.F = isolate2LastDigits(value)
    }

    set BC(value: number) {
        this.B = isolate2FirstDigits(value)
        this.C = isolate2LastDigits(value)
    }

    set DE(value: number) {
        this.D = isolate2FirstDigits(value)
        this.E = isolate2LastDigits(value)
    }

    set HL(value: number) {
        this.H = isolate2FirstDigits(value)
        this.L = isolate2LastDigits(value)
    }
}
