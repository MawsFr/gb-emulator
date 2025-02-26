import { Instruction } from '@/instructions/instruction.ts'
import { Cpu } from '@/cpu.ts'
import { R8Code } from '@/registers.ts'
import {
    ImmediateSourceStrategy,
    RegisterSourceStrategy,
    SourceStrategy,
} from '@/instructions/source-strategies.ts'

export type ADD_A_R8_OPCODES =
    | 0b10000000
    | 0b10000001
    | 0b10000010
    | 0b10000011
    | 0b10000100
    | 0b10000101
    | 0b10000110
    | 0b10000111

export type ADD_A_IMM8_OPCODE = 0b11000110

export abstract class ADD_A_8_SOURCE extends Instruction {
    private readonly sourceStrategy: SourceStrategy

    protected constructor(cpu: Cpu, sourceStrategy: SourceStrategy) {
        super(cpu)
        this.sourceStrategy = sourceStrategy
    }

    execute(): void {
        const augend = this.registers.A.value
        const addend = this.sourceStrategy.getSource()
        const result = augend + addend

        this.registers.A.value = result
        this.updateFlagsAfterAddition(augend, addend, result)

        this.registers.PC.value++
    }
}

export class ADD_A_R8 extends ADD_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers))
    }
}

export class ADD_A_IMM8 extends ADD_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new ImmediateSourceStrategy(cpu))
    }
}
