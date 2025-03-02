import { Pointer, R8Code, Register8, Registers } from '@/registers/registers.ts'
import { Cpu } from '@/cpu.ts'
import { Immediate8 } from '$/src'

export interface SourceStrategy {
    get(): Immediate8 | Register8 | Pointer

    getValue(): number

    getAdditionalBytes(): number
}

export class RegisterSourceStrategy implements SourceStrategy {
    private readonly register: R8Code
    private readonly registers: Registers

    constructor(register: R8Code, registers: Registers) {
        this.register = register
        this.registers = registers
    }

    get(): Register8 | Pointer {
        return this.registers.r8[this.register]
    }

    getValue(): number {
        return this.registers.r8[this.register].value
    }

    getAdditionalBytes(): number {
        return 0
    }
}

export class Immediate8SourceStrategy implements SourceStrategy {
    private readonly cpu: Cpu

    constructor(cpu: Cpu) {
        this.cpu = cpu
    }

    get(): Immediate8 | Pointer {
        return this.cpu.imm8
    }

    getValue(): number {
        return this.cpu.getImmediate8()
    }

    getAdditionalBytes(): number {
        return 1
    }
}
