import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { isBitSet } from "@mawsfr/binary-operations";

export type ADD_HL_R16_OPCODES =
    | 0b00_00_1001
    | 0b00_01_1001
    | 0b00_10_1001
    | 0b00_11_1001

export class ADD_HL_R16 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute(opcode: ADD_HL_R16_OPCODES) {
        const destination = this.extractDestinationR16(opcode);

        this.registers.F.carryFlag =
            isBitSet(this.registers.HL.value, 15)
            && isBitSet(this.registers.r16[destination].value, 15)
                ? 1
                : 0

        this.registers.F.halfCarryFlag =
            isBitSet(this.registers.HL.value, 11)
            && isBitSet(this.registers.r16[destination].value, 11)
                ? 1
                : 0
        this.registers.F.subtractionFlag = 0
        this.registers.HL.value += this.registers.r16[destination].value

        this.registers.PC.value++
    }
}