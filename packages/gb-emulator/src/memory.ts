import { CanPointToValue, Register16 } from '@/registers/registers.ts'
import { bitwiseAnd, concatBytes, toHex } from '@mawsfr/binary-operations'

export abstract class ImmediateMemoryValue implements CanPointToValue {
    public readonly name: 'imm8' | 'imm16'
    protected readonly memory: Memory
    protected readonly PC: Register16

    protected constructor(
        name: 'imm8' | 'imm16',
        memory: Memory,
        pc: Register16
    ) {
        this.name = name
        this.memory = memory
        this.PC = pc
    }

    abstract get value(): number

    toString(): string {
        return `${this.name} (${toHex(this.value)})`
    }
}

export const SKIP_IMMEDIATE_8 = 1
export const SKIP_IMMEDIATE_16 = 2

export class Immediate8 extends ImmediateMemoryValue {
    constructor(memory: Memory, pc: Register16) {
        super('imm8', memory, pc)
    }

    get value(): number {
        return this.memory.addresses[this.PC.value + 1]
    }
}

export class Immediate16 extends ImmediateMemoryValue {
    constructor(memory: Memory, pc: Register16) {
        super('imm16', memory, pc)
    }

    get value(): number {
        return concatBytes(
            this.memory.addresses[this.PC.value + 1],
            this.memory.addresses[this.PC.value + 2]
        )
    }
}

export class Memory8Value<T extends number = number> {
    protected readonly memory: Memory
    protected readonly address: number

    constructor(memory: Memory, address: number) {
        this.memory = memory
        this.address = address
    }

    get value(): T {
        return bitwiseAnd(this.memory.addresses[this.address], 0xFF) as T
    }

    set value(value: T) {
        this.memory.write(this.address, bitwiseAnd(value, 0xFF))
    }

    toString(): string {
        return `${toHex(this.address)} (${toHex(this.value)})`
    }
}

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
