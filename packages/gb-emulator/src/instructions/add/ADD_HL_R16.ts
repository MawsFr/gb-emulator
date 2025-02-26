import { Instruction } from '@/instructions/instruction.ts'

export type ADD_HL_R16_OPCODES =
    | 0b00_00_1001
    | 0b00_01_1001
    | 0b00_10_1001
    | 0b00_11_1001

export class ADD_HL_R16 extends Instruction {
    execute(opcode: ADD_HL_R16_OPCODES) {
        const destination = this.extractDestinationR16(opcode)
        const augend = this.registers.HL.value
        const addend = this.registers.r16[destination].value
        const result = augend + addend

        this.registers.HL.value = result
        this.updateFlagsAfterAddition(augend, addend, result, {
            halfCarryFlagBit: 11,
            carryFlagBit: 15,
        })

        this.registers.PC.value++
    }
}
