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
import { Memory } from "@/memory.ts";

export interface Register {
    get value(): number;

    set value(newValue: number);
}

export abstract class AbstractRegister implements Register {
    protected _value: number = 0
    protected readonly _mask: number

    protected constructor(mask: number, value?: number) {
        this._mask = mask
        this._value = value ?? this._value
    }

    get mask() {
        return this._mask
    }

    get value() {
        return this._value & this._mask
    }

    set value(newValue) {
        this._value = newValue & this._mask
    }
}

export class Register8 extends AbstractRegister {
    constructor() {
        super(0xFF);
    }
}

export class Register16 extends AbstractRegister {
    constructor(value?: number) {
        super(0xFFFF, value);
    }

    incrementOrDecrementIfNeeded() {
        // Do nothing by default
    }
}

export class HLI extends Register16 {
    protected readonly HL: ComposedRegister

    constructor(HL: ComposedRegister) {
        super();
        this.HL = HL
    }

    get value() {
        return this.HL.value
    }

    set value(newValue: number) {
        this.HL.value = newValue
    }

    incrementOrDecrementIfNeeded() {
        this.HL.value++
    }
}

export class HLD extends Register16 {
    protected readonly HL: ComposedRegister

    constructor(HL: ComposedRegister) {
        super();
        this.HL = HL
    }

    get value() {
        return this.HL.value
    }

    set value(newValue: number) {
        this.HL.value = newValue
    }

    incrementOrDecrementIfNeeded() {
        this.HL.value--
    }
}

export class Flags extends Register8 {
    constructor() {
        super();
    }

    /**
     * Gets zero flag Z
     */
    get zeroFlag() {
        return get1stBit(this.value);
    }

    /**
     * Gets half carry flag H
     */
    get halfCarryFlag() {
        return get3rdBit(this.value);
    }

    /**
     * Gets subtraction flag N
     */
    get subtractionFlag() {
        return get2ndBit(this.value);
    }

    /**
     * Gets carry flag CY
     */
    get carryFlag() {
        return get4thBit(this.value);
    }

    /**
     * Sets zero flag Z
     * @param value
     */
    set zeroFlag(value: number) {
        this.value = set1stBit(this.value, value)
    }

    /**
     * Sets half carry flag H
     * @param value
     */
    set halfCarryFlag(value: number) {
        this.value = set3rdBit(this.value, value)
    }

    /**
     * Sets subtraction flag N
     * @param value
     */
    set subtractionFlag(value: number) {
        this.value = set2ndBit(this.value, value)
    }

    /**
     * Sets carry flag CY
     * @param value
     */
    set carryFlag(value: number) {
        this.value = set4thBit(this.value, value)
    }
}

export class ComposedRegister extends Register16 {
    public readonly high: Register8
    public readonly low: Register8

    constructor(high: Register8, low: Register8) {
        super()
        this.high = high
        this.low = low
    }

    get value() {
        return concatBytes(this.high.value, this.low.value, {
            endianness: 'big'
        }) & this._mask
    }

    set value(newValue: number) {
        this.high.value = isolate2FirstDigits(newValue)
        this.low.value = isolate2LastDigits(newValue)
    }
}

export class Pointer extends AbstractRegister {
    protected readonly register: ComposedRegister
    protected readonly memory: Memory;

    constructor(register: ComposedRegister, memory: Memory) {
        super(register.mask)
        this.register = register
        this.memory = memory
    }

    get value() {
        return this.memory.addresses[this.register.value]
    }

    set value(newValue: number) {
        this.memory.addresses[this.register.value] = newValue
    }
}

export type R8Code = 0b000 | 0b001 | 0b010 | 0b011 | 0b100 | 0b101 | 0b110 | 0b111
export type R16Code = 0b00 | 0b01 | 0b10 | 0b11
export type ConditionCode = 0b00 | 0b01 | 0b10 | 0b11

export class Registers {
    private readonly memory: Memory

    public readonly A: Register8 = new Register8();
    public readonly B: Register8 = new Register8();
    public readonly C: Register8 = new Register8();
    public readonly D: Register8 = new Register8();
    public readonly E: Register8 = new Register8();
    public readonly H: Register8 = new Register8();
    public readonly L: Register8 = new Register8();
    public readonly F: Flags = new Flags();

    public readonly HL = new ComposedRegister(this.H, this.L)
    public readonly AF = new ComposedRegister(this.A, this.F)
    public readonly BC = new ComposedRegister(this.B, this.C)
    public readonly DE = new ComposedRegister(this.D, this.E)

    public readonly SP: Register16 = new Register16(0xFFFE);
    public readonly PC: Register16 = new Register16();

    public readonly HLI: HLI = new HLI(this.HL);
    public readonly HLD: HLD = new HLD(this.HL);

    public readonly "[HL]": Pointer

    public readonly r8: Record<R8Code, Register8>

    public readonly r16: Record<R16Code, Register16> = {
        0b00: this.BC,
        0b01: this.DE,
        0b10: this.HL,
        0b11: this.SP
    }

    public readonly r16mem: Record<R16Code, Register16> = {
        0b00: this.BC,
        0b01: this.DE,
        0b10: this.HLI,
        0b11: this.HLD,
    }

    constructor(memory: Memory) {
        this.memory = memory
        this["[HL]"] = new Pointer(this.HL, memory)
        this.r8 = {
            0b000: this.B,
            0b001: this.C,
            0b010: this.D,
            0b011: this.E,
            0b100: this.H,
            0b101: this.L,
            0b110: this["[HL]"],
            0b111: this.A
        }
    }

    pushPCToStack() {
        this.SP.value--
        this.memory.addresses[this.SP.value] = isolate2LastDigits(this.PC.value)
        this.SP.value--
        this.memory.addresses[this.SP.value] = isolate2FirstDigits(this.PC.value)
    }
}
