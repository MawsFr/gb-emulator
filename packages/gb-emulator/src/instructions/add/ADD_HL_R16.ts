import { Cpu } from "@/cpu.ts";
import { Instruction } from "@/instructions/instruction.ts";

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
        const augend = this.registers.HL.value;
        const addend = this.registers.r16[destination].value;
        const result = augend + addend;

        this.registers.HL.value = result
        this.updateFlagsAfterAddition(augend, addend, result);

        this.registers.PC.value++
    }
}