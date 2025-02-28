import { Instruction } from '@/instructions/instruction.ts'

export type ADD_HL_R16_OPCODES =
    | 0b00_00_1001
    | 0b00_01_1001
    | 0b00_10_1001
    | 0b00_11_1001

export class ADD_HL_R16 extends Instruction {
    execute(opcode: ADD_HL_R16_OPCODES) {
        const augend = this.registers.HL.value
        const addend = this.r16(opcode).value
        const result = augend + addend

        this.registers.HL.value = result
        this.updateFlagsAfterAddition(augend, addend, result, {
            halfCarryFlagBit: 11,
            carryFlagBit: 15,
        })

        this.cpu.goToNextInstruction()
    }

    toString(opcode: ADD_HL_R16_OPCODES): string {
        return `ADD ${this.registers.HL}, ${this.r16(opcode)}`
    }
}
