import { Instruction } from '@/instructions/instruction.ts'

export type ADD_HL_R16_OPCODES =
    | 0b00001001
    | 0b00011001
    | 0b00101001
    | 0b00111001

export class ADD_HL_R16 extends Instruction {
    execute(opcode: ADD_HL_R16_OPCODES) {
        const augend = this.registers.HL.value
        const addend = this.r16(opcode).value
        const result = augend + addend

        this.registers.HL.value = result
        this.updateFlagsAfterAddition(augend, addend, result, {
            halfCarryFlagBitIndex: 11,
            carryFlagBitIndex: 15,
        })

        this.cpu.goToNextInstruction()
    }

    toString(opcode: ADD_HL_R16_OPCODES): string {
        return `ADD ${this.registers.HL}, ${this.r16(opcode)}`
    }
}
