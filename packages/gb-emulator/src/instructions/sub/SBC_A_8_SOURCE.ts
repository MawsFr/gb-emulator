import { Instruction } from '@/instructions/instruction.ts'
import { Cpu } from '@/cpu.ts'
import { R8Code } from '@/registers/registers.ts'
import {
    Immediate8SourceStrategy,
    RegisterSourceStrategy,
    SourceStrategy,
} from '@/instructions/source-strategies.ts'

export type SBC_A_R8_OPCODES =
    | 0b10011000
    | 0b10011001
    | 0b10011010
    | 0b10011011
    | 0b10011100
    | 0b10011101
    | 0b10011110
    | 0b10011111

export type SBC_A_IMM8_OPCODE = 0b11011110

export abstract class SBC_A_8_SOURCE extends Instruction {
    private readonly source: SourceStrategy

    protected constructor(cpu: Cpu, source: SourceStrategy) {
        super(cpu)
        this.source = source
    }

    execute(): void {
        const minuend = this.registers.A.value
        const subtrahend = this.source.getValue()
        const carry = this.registers.F.carryFlag
        const result = minuend - subtrahend - carry

        this.registers.A.value = result
        this.updateFlagsAfterSubtraction(minuend, subtrahend - carry, result)

        this.cpu.goToNextInstruction(this.source.getAdditionalBytes())
    }

    toString(): string {
        return `SBC ${this.registers.A}, ${this.source.get()}`
    }
}

export class SBC_A_R8 extends SBC_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers))
    }
}

export class SBC_A_IMM8 extends SBC_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new Immediate8SourceStrategy(cpu))
    }
}
