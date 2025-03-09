import { Pointer, PointerName, Register16 } from '@/registers/registers.ts'
import {
    bitwiseAnd,
    concatBytes,
    isolate2FirstDigits,
    isolate2LastDigits,
    toHex,
} from '@mawsfr/binary-operations'
import { getAddressValue, isPointer } from '@/utils.ts'

export abstract class ImmediateMemoryValue implements Pointer {
    public readonly name: 'imm8' | 'imm16'
    protected readonly memory: Memory
    protected readonly memoryValue: MemoryValue

    protected constructor(
        name: 'imm8' | 'imm16',
        memory: Memory,
        memoryValue: MemoryValue
    ) {
        this.name = name
        this.memory = memory
        this.memoryValue = memoryValue
    }

    get value() {
        return this.memoryValue.value
    }

    toString(): string {
        return `${this.name} (${toHex(this.value)})`
    }
}

export const SKIP_IMMEDIATE_8 = 1
export const SKIP_IMMEDIATE_16 = 2

export class Immediate8 extends ImmediateMemoryValue {
    constructor(pc: Register16, memory: Memory) {
        super(
            'imm8',
            memory,
            new Memory8Value(pc, memory, {
                offset: 1,
            })
        )
    }
}

export class Immediate16 extends ImmediateMemoryValue {
    constructor(pc: Register16, memory: Memory) {
        super(
            'imm16',
            memory,
            new Memory16Value(pc, memory, {
                offset: 1,
            })
        )
    }
}

export abstract class MemoryValue<A extends number | Pointer = Pointer> {
    protected readonly memory: Memory
    protected readonly offset: number
    public address: A
    public readonly name?: PointerName

    protected constructor(
        address: A,
        memory: Memory,
        options: { offset?: number }
    ) {
        const { offset } = options
        this.memory = memory
        this.address = address
        this.offset = offset ?? 0
        this.name = isPointer(address)
            ? this.generateName(this.offset, address)
            : undefined
    }

    generateName(offset: number, pointer: Pointer): PointerName {
        return `[${`${offset && offset !== 0 ? offset : ''}+${pointer.name}`}]` as PointerName
    }

    get value(): number {
        return bitwiseAnd(
            this.memory.addresses[getAddressValue(this.address) + this.offset],
            0xFF
        )
    }

    set value(value: number) {
        this.memory.write(getAddressValue(this.address) + this.offset, value)
    }

    toString(): string {
        return `${this.name ?? toHex(getAddressValue(this.address) + this.offset)} (${toHex(this.value)})`
    }
}

export class Memory8Value<
    A extends number | Pointer = Pointer,
> extends MemoryValue<A> {
    constructor(
        address: A,
        memory: Memory,
        options: {
            offset?: number
        } = {
            offset: 0,
        }
    ) {
        super(address, memory, options)
    }
}

export class Memory16Value<
    A extends number | Pointer = Pointer,
> extends MemoryValue<A> {
    protected readonly endianness: 'big' | 'little'

    constructor(
        address: A,
        memory: Memory,
        options: {
            endianness?: 'big' | 'little'
            offset?: number
        } = { endianness: 'little', offset: 0 }
    ) {
        super(address, memory, options)
        this.endianness = options.endianness ?? 'little'
    }

    get value(): number {
        return concatBytes(
            this.memory.addresses[getAddressValue(this.address) + this.offset],
            this.memory.addresses[
                getAddressValue(this.address) + this.offset + 1
            ],
            {
                endianness: this.endianness,
            }
        )
    }

    set value(value: number) {
        const high = isolate2FirstDigits(value)
        const low = isolate2LastDigits(value)
        const isBigEndian = this.endianness === 'big'

        this.memory.write(
            getAddressValue(this.address) + this.offset,
            isBigEndian ? high : low
        )
        this.memory.write(
            getAddressValue(this.address) + this.offset + 1,
            isBigEndian ? low : high
        )
    }
}

export type PointedValue = Pointed8Value | Pointed16Value

export class Pointed8Value extends Memory8Value {}

export class Pointed16Value extends Memory16Value {}

export class Memory {
    public readonly addresses = new Uint8Array(0x10000)

    constructor() {
        this.addresses.fill(0)
        this.write(0xFF05, 0x00)
        this.write(0xFF06, 0x00)
        this.write(0xFF07, 0x00)
        this.write(0xFF10, 0x80)
        this.write(0xFF11, 0xBF)
        this.write(0xFF12, 0xF3)
        this.write(0xFF14, 0xBF)
        this.write(0xFF16, 0x3F)
        this.write(0xFF17, 0x00)
        this.write(0xFF19, 0xBF)
        this.write(0xFF1A, 0x7F)
        this.write(0xFF1B, 0xFF)
        this.write(0xFF1C, 0x9F)
        this.write(0xFF1E, 0xBF)
        this.write(0xFF20, 0xFF)
        this.write(0xFF21, 0x00)
        this.write(0xFF22, 0x00)
        this.write(0xFF23, 0xBF)
        this.write(0xFF24, 0x77)
        this.write(0xFF25, 0xF3)
        this.write(0xFF26, 0xF1)
        this.write(0xFF40, 0x91)
        this.write(0xFF42, 0x00)
        this.write(0xFF43, 0x00)
        this.write(0xFF45, 0x00)
        this.write(0xFF47, 0xFC)
        this.write(0xFF48, 0xFF)
        this.write(0xFF49, 0xFF)
        this.write(0xFF4A, 0x00)
        this.write(0xFF4B, 0x00)
        this.write(0xFFFF, 0x00)
    }

    write(address: number, value: number) {
        this.addresses[address] = bitwiseAnd(value, 0xFF)
    }
}
