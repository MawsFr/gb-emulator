import {
    Bit,
    bitwiseAnd,
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
    set4thBit,
    toHex,
} from '@mawsfr/binary-operations'
import {
    Memory,
    Pointed16Value,
    Pointed8Value,
    PointedValue,
} from '@/memory.ts'
import { LCDControl } from '@/registers/LCDControl.ts'
import { Stack } from './stack'

export interface CanCopyValueInto {
    copyValueInto(target: Pointer): void
}

export interface CanCopyValueFrom {
    copyValueFrom(source: Pointer | PointedValue): void
}

export abstract class AbstractRegister
    implements Pointer, CanCopyValueFrom, CanCopyValueInto
{
    public readonly name: R8Name | R16Name
    protected _value: number = 0
    protected readonly _mask: number

    protected constructor(
        name: R8Name | R16Name,
        mask: number,
        value?: number
    ) {
        this.name = name
        this._mask = mask
        this._value = value ?? this._value
    }

    get value() {
        return bitwiseAnd(this._value, this._mask)
    }

    set value(newValue) {
        this._value = bitwiseAnd(newValue, this._mask)
    }

    copyValueInto(target: Pointer | PointedValue) {
        target.value = this.value
    }

    copyValueFrom(source: Pointer | PointedValue) {
        this.value = source.value
    }

    toString() {
        return `${this.name} (${toHex(this.value)})`
    }
}

export class Register8 extends AbstractRegister {
    constructor(name: R8Name) {
        super(name, 0xFF)
    }
}

export class Register16 extends AbstractRegister {
    constructor(name: R16Name, value?: number) {
        super(name, 0xFFFF, value)
    }

    incrementOrDecrementIfNeeded() {
        // Do nothing by default
    }
}

export class HLI extends Register16 {
    protected readonly HL: ComposedRegister

    constructor(HL: ComposedRegister) {
        super('HLI')
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
        super('HLD')
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

export class OperationFlags extends Register8 {
    /**
     * Gets zero flag Z
     */
    get zeroFlag() {
        return get1stBit(this.value)
    }

    /**
     * Gets half carry flag H
     */
    get halfCarryFlag() {
        return get3rdBit(this.value)
    }

    /**
     * Gets subtraction flag N
     */
    get subtractionFlag() {
        return get2ndBit(this.value)
    }

    /**
     * Gets carry flag CY
     */
    get carryFlag() {
        return get4thBit(this.value)
    }

    /**
     * Sets zero flag Z
     * @param value
     */
    set zeroFlag(value: Bit) {
        this.value = set1stBit(this.value, value)
    }

    /**
     * Sets half carry flag H
     * @param value
     */
    set halfCarryFlag(value: Bit) {
        this.value = set3rdBit(this.value, value)
    }

    /**
     * Sets subtraction flag N
     * @param value
     */
    set subtractionFlag(value: Bit) {
        this.value = set2ndBit(this.value, value)
    }

    /**
     * Sets carry flag CY
     * @param value
     */
    set carryFlag(value: Bit) {
        this.value = set4thBit(this.value, value)
    }
}

export class ComposedRegister extends Register16 {
    public readonly high: Register8
    public readonly low: Register8

    constructor(
        name: R16Name,
        high: Register8,
        low: Register8,
        value?: number
    ) {
        super(name)
        this.high = high
        this.low = low
        this.value = value ?? this.value
    }

    get value() {
        return bitwiseAnd(
            concatBytes(this.high.value, this.low.value, {
                endianness: 'big',
            }),
            this._mask
        )
    }

    set value(newValue: number) {
        this.high.value = isolate2FirstDigits(newValue)
        this.low.value = isolate2LastDigits(newValue)
    }
}

export type Name = R8Name | R16Name | 'imm8' | 'imm16' | 'FF00+C' | 'FF00+imm8'
export type PointerName = `[${Name}]`

export interface HasName {
    get name(): Name
}

export interface HasMemoryAddress {
    get value(): number

    set value(newValue: number)
}

export interface Pointer extends HasName, HasMemoryAddress {}

export type R8Name = 'B' | 'C' | 'D' | 'E' | 'H' | 'L' | 'A' | 'F'
export type R8Code =
    | 0b000
    | 0b001
    | 0b010
    | 0b011
    | 0b100
    | 0b101
    | 0b110
    | 0b111

export type R16Name = 'BC' | 'DE' | 'HL' | 'SP' | 'HLI' | 'HLD' | 'AF' | 'PC'
export type R16Code = 0b00 | 0b01 | 0b10 | 0b11
export type ConditionCode = 0b00 | 0b01 | 0b10 | 0b11

export abstract class Condition {
    public readonly name: string
    public readonly flags: OperationFlags

    constructor(name: string, flags: OperationFlags) {
        this.name = name
        this.flags = flags
    }

    abstract isMet(): boolean

    toString() {
        return `COND ${this.name} (${this.isMet()})`
    }
}

export class NZ extends Condition {
    isMet() {
        return !this.flags.zeroFlag
    }
}

export class Z extends Condition {
    isMet() {
        return Boolean(this.flags.zeroFlag)
    }
}

export class NC extends Condition {
    isMet() {
        return !this.flags.carryFlag
    }
}

export class C extends Condition {
    isMet() {
        return Boolean(this.flags.carryFlag)
    }
}

export class Registers {
    private readonly memory: Memory

    public readonly A: Register8 = new Register8('A')
    public readonly B: Register8 = new Register8('B')
    public readonly C: Register8 = new Register8('C')
    public readonly D: Register8 = new Register8('D')
    public readonly E: Register8 = new Register8('E')
    public readonly H: Register8 = new Register8('H')
    public readonly L: Register8 = new Register8('L')
    public readonly F: OperationFlags = new OperationFlags('F')

    public readonly HL = new ComposedRegister('HL', this.H, this.L, 0x014D)
    public readonly AF = new ComposedRegister('AF', this.A, this.F, 0x01B0)
    public readonly BC = new ComposedRegister('BC', this.B, this.C, 0x0013)
    public readonly DE = new ComposedRegister('DE', this.D, this.E, 0x00D8)

    public readonly SP: Register16 = new Register16('SP', 0xFFFE)
    public readonly PC: Register16 = new Register16('PC', 0x0100)

    public readonly HLI: HLI = new HLI(this.HL)
    public readonly HLD: HLD = new HLD(this.HL)

    public readonly '[HL]': Pointed8Value
    public readonly LCDC: LCDControl

    public readonly stack: Stack

    public readonly r8: Record<R8Code, Register8 | Pointed8Value>

    public readonly r16: Record<R16Code, Register16> = {
        0b00: this.BC,
        0b01: this.DE,
        0b10: this.HL,
        0b11: this.SP,
    }

    public readonly r16mem: Record<R16Code, Register16> = {
        0b00: this.BC,
        0b01: this.DE,
        0b10: this.HLI,
        0b11: this.HLD,
    }

    public readonly '[r16mem]': Record<R16Code, Pointed16Value>

    public readonly r16Stk: Record<R16Code, Register16> = {
        0b00: this.BC,
        0b01: this.DE,
        0b10: this.HL,
        0b11: this.AF,
    }

    public readonly conditions: Record<ConditionCode, Condition> = {
        0b00: new NZ('NZ', this.F),
        0b01: new Z('Z', this.F),
        0b10: new NC('NC', this.F),
        0b11: new C('C', this.F),
    }

    constructor(memory: Memory) {
        this.memory = memory
        this.LCDC = new LCDControl(memory)
        this.stack = new Stack(this.SP, this.memory)
        this['[HL]'] = new Pointed8Value(this.HL, memory)
        this.r8 = {
            0b000: this.B,
            0b001: this.C,
            0b010: this.D,
            0b011: this.E,
            0b100: this.H,
            0b101: this.L,
            0b110: this['[HL]'],
            0b111: this.A,
        }

        this['[r16mem]'] = {
            0b00: new Pointed16Value(this.BC, memory),
            0b01: new Pointed16Value(this.DE, memory),
            0b10: new Pointed16Value(this.HLI, memory),
            0b11: new Pointed16Value(this.HLD, memory),
        }
    }

    pushPCToStack() {
        this.stack.push(this.PC.value)
    }

    popPCFromStack() {
        this.PC.value = this.stack.pop()
    }
}
