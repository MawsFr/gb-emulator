import { R8Code, Registers } from '@/registers.ts'
import { Cpu } from '@/cpu.ts'

export interface SourceStrategy {
    getSource(): number
}

export class RegisterSourceStrategy implements SourceStrategy {
    private readonly register: R8Code
    private readonly registers: Registers

    constructor(register: R8Code, registers: Registers) {
        this.register = register
        this.registers = registers
    }

    getSource(): number {
        return this.registers.r8[this.register].value
    }
}

export class ImmediateSourceStrategy implements SourceStrategy {
    private readonly cpu: Cpu

    constructor(cpu: Cpu) {
        this.cpu = cpu
    }

    getSource(): number {
        return this.cpu.getImmediate8()
    }
}
