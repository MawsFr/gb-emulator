import { Instruction } from '@/instructions/instruction.ts'
import { Cpu } from '@/cpu.ts'
import { R8Code } from '@/registers/registers.ts'
import {
    Immediate8SourceStrategy,
    RegisterSourceStrategy,
    SourceStrategy,
} from '@/instructions/source-strategies.ts'

export type CP_A_R8_OPCODES =
    | 0b10111000
    | 0b10111001
    | 0b10111010
    | 0b10111011
    | 0b10111100
    | 0b10111101
    | 0b10111110
    | 0b10111111

export type CP_A_IMM8_OPCODE = 0b11111110

export abstract class CP_A_8_SOURCE extends Instruction {
    private readonly source: SourceStrategy

    protected constructor(cpu: Cpu, source: SourceStrategy) {
        super(cpu)
        this.source = source
    }

    execute(): void {
        const value = this.source.getValue()
        const result = this.registers.A.value - value

        this.updateFlagsAfterSubtraction(this.registers.A.value, value, result)

        this.cpu.goToNextInstruction(this.source.getAdditionalBytes())
    }

    toString(): string {
        return `CP ${this.registers.A}, ${this.source.get()}`
    }
}

export class CP_A_R8 extends CP_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers))
    }
}

export class CP_A_IMM8 extends CP_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new Immediate8SourceStrategy(cpu))
    }
}
