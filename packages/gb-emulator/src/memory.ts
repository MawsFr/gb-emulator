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

export class Memory8Value {
    private readonly memory: Memory
    private readonly address: number

    constructor(memory: Memory, address: number) {
        this.memory = memory
        this.address = address
    }

    get value(): number {
        return bitwiseAnd(this.memory.addresses[this.address], 0xFF)
    }

    set value(value: number) {
        this.memory.write(this.address, bitwiseAnd(value, 0xFF))
    }

    toString(): string {
        return `${toHex(this.address)} (${toHex(this.value)})`
    }
}

export class Memory {
    private readonly _addresses = new Uint8Array(0xFFFF)

    get addresses() {
        return this._addresses
    }

    write(address: number, value: number) {
        this._addresses[address] = bitwiseAnd(value, 0xFF)
    }
}
