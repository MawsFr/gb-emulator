import { Instruction } from '@/instructions/instruction.ts'
import { Cpu } from '@/cpu.ts'
import { R8Code } from '@/registers/registers.ts'
import {
    Immediate8SourceStrategy,
    RegisterSourceStrategy,
    SourceStrategy,
} from '@/instructions/source-strategies.ts'

export type ADC_A_R8_OPCODES =
    | 0b10001000
    | 0b10001001
    | 0b10001010
    | 0b10001011
    | 0b10001100
    | 0b10001101
    | 0b10001110
    | 0b10001111

export type ADC_A_IMM8_OPCODE = 0b11001110

export abstract class ADC_A_8_SOURCE extends Instruction {
    private readonly source: SourceStrategy

    protected constructor(cpu: Cpu, source: SourceStrategy) {
        super(cpu)
        this.source = source
    }

    execute(): void {
        const augend = this.registers.A.value
        const addend = this.source.getValue()
        const carry = this.registers.F.carryFlag
        const result = augend + addend + carry

        this.registers.A.value = result
        this.updateFlagsAfterAddition(augend, addend + carry, result)

        this.cpu.goToNextInstruction(this.source.getAdditionalBytes())
    }

    toString(): string {
        return `ADC ${this.registers.A}, ${this.source.get()}`
    }
}

export class ADC_A_R8 extends ADC_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers))
    }
}

export class ADC_A_IMM8 extends ADC_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new Immediate8SourceStrategy(cpu))
    }
}
