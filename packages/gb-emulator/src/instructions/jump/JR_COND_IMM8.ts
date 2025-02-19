import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type JR_COND_IMM8_OPCODE =
    | 0b00100000 // JR NZ, imm8
    | 0b00101000 // JR Z, imm8
    | 0b00110000 // JR NC, imm8
    | 0b00111000 // JR C, imm8

export class JR_COND_IMM8 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute(opcode: JR_COND_IMM8_OPCODE) {
        const immediate8 = this.cpu.getImmediate8()

        if (
            (opcode === 0b00100000 && !this.registers.F.zeroFlag) ||
            (opcode === 0b00101000 && this.registers.F.zeroFlag) ||
            (opcode === 0b00110000 && !this.registers.F.carryFlag) ||
            (opcode === 0b00111000 && this.registers.F.carryFlag)
        ) {
            this.registers.PC.value += immediate8
        } else {
            this.registers.PC.value++
        }
    }
}