import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { R8Code } from "@/registers.ts";

export type SUB_A_R8_OPCODES =
    | 0b10010000
    | 0b10010001
    | 0b10010010
    | 0b10010011
    | 0b10010100
    | 0b10010101
    | 0b10010110
    | 0b10010111;

export type SUB_A_IMM8_OPCODE = 0b11010110;

export abstract class SUB_A_8_SOURCE extends Instruction {
    protected constructor(cpu: Cpu) {
        super(cpu);
    }

    execute(): void {
        const minuend = this.registers.A.value;
        const subtrahend = this.getSource();
        const result = minuend - subtrahend;

        this.registers.A.value = result;
        this.updateFlagsAfterSubtraction(minuend, subtrahend, result);

        this.registers.PC.value++;
    }

    abstract getSource(): number;
}

export class SUB_A_R8 extends SUB_A_8_SOURCE {
    private readonly register: R8Code

    constructor(cpu: Cpu, register: R8Code) {
        super(cpu);
        this.register = register;
    }

    getSource(): number {
        return this.registers.r8[this.register].value;
    }
}

export class SUB_A_IMM8 extends SUB_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    getSource(): number {
        return this.cpu.getImmediate8();
    }
}