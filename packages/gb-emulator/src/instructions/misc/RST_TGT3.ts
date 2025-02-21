import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type RST_TGT3_OPCODES =
    | 0b11000111
    | 0b11001111
    | 0b11010111
    | 0b11011111
    | 0b11100111
    | 0b11101111
    | 0b11110111
    | 0b11111111

export class RST_TGT3 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    execute(opcode: RST_TGT3_OPCODES) {
        this.registers.PC.value++

        this.registers.pushPCToStack()

        this.registers.PC.value = this.getRSTAddress(opcode)
    }

    protected getRSTAddress(opcode: RST_TGT3_OPCODES): number {
        switch (opcode) {
            case 0b11000111:
                return 0x0018
            case 0b11001111:
                return 0x0020
            case 0b11010111:
                return 0x0028
            case 0b11011111:
                return 0x0030
            case 0b11100111:
                return 0x0038
            case 0b11101111:
                return 0x0040
            case 0b11110111:
                return 0x0048
            case 0b11111111:
                return 0x0050
        }
    }
}