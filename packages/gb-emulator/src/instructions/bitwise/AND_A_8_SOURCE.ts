import { Instruction } from '@/instructions/instruction.ts'
import { Cpu } from '@/cpu.ts'
import { R8Code } from '@/registers.ts'
import {
    Immediate8SourceStrategy,
    RegisterSourceStrategy,
    SourceStrategy,
} from '@/instructions/source-strategies.ts'
import { bitwiseAnd } from '@mawsfr/binary-operations'

export type AND_A_R8_OPCODES =
    | 0b10100000
    | 0b10100001
    | 0b10100010
    | 0b10100011
    | 0b10100100
    | 0b10100101
    | 0b10100110
    | 0b10100111

export type AND_A_IMM8_OPCODE = 0b11100110

export abstract class AND_A_8_SOURCE extends Instruction {
    private readonly source: SourceStrategy

    protected constructor(cpu: Cpu, source: SourceStrategy) {
        super(cpu)
        this.source = source
    }

    execute(): void {
        const value = this.source.getValue()

        this.registers.A.value = bitwiseAnd(this.registers.A.value, value)

        // TODO: Cleanup
        this.setZeroFlag(this.registers.A.value)
        this.registers.F.carryFlag = 0
        this.registers.F.halfCarryFlag = 1
        this.registers.F.subtractionFlag = 0

        this.cpu.goToNextInstruction(this.source.getAdditionalBytes())
    }

    toString(): string {
        return `AND ${this.registers.A}, ${this.source.get()}`
    }
}

export class AND_A_R8 extends AND_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers))
    }
}

export class AND_A_IMM8 extends AND_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new Immediate8SourceStrategy(cpu))
    }
}
