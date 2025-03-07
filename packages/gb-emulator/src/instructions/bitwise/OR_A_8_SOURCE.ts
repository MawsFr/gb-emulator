import { Instruction } from '@/instructions/instruction.ts'
import { Cpu } from '@/cpu.ts'
import { R8Code } from '@/registers/registers.ts'
import {
    Immediate8SourceStrategy,
    RegisterSourceStrategy,
    SourceStrategy,
} from '@/instructions/source-strategies.ts'
import { bitwiseOr } from '@mawsfr/binary-operations'

export type OR_A_R8_OPCODES =
    | 0b10110000
    | 0b10110001
    | 0b10110010
    | 0b10110011
    | 0b10110100
    | 0b10110101
    | 0b10110110
    | 0b10110111

export type OR_A_IMM8_OPCODE = 0b11110110

export abstract class OR_A_8_SOURCE extends Instruction {
    private readonly source: SourceStrategy

    protected constructor(cpu: Cpu, source: SourceStrategy) {
        super(cpu)
        this.source = source
    }

    execute(): void {
        const value = this.source.getValue()

        this.registers.A.value = bitwiseOr(this.registers.A.value, value)

        // TODO: cleanup
        this.setZeroFlag(this.registers.A.value)
        this.registers.F.carryFlag = 0
        this.registers.F.halfCarryFlag = 0
        this.registers.F.subtractionFlag = 0

        this.cpu.goToNextInstruction(this.source.getAdditionalBytes())
    }

    toString(): string {
        return `OR ${this.registers.A}, ${this.source.get()}`
    }
}

export class OR_A_R8 extends OR_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers))
    }
}

export class OR_A_IMM8 extends OR_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new Immediate8SourceStrategy(cpu))
    }
}
