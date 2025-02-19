import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { R8Code } from "@/registers.ts";

export type SBC_A_R8_OPCODES =
    | 0b10011000
    | 0b10011001
    | 0b10011010
    | 0b10011011
    | 0b10011100
    | 0b10011101
    | 0b10011110
    | 0b10011111;

export type SBC_A_IMM8_OPCODE = 0b11011110;

export abstract class SBC_A_8_SOURCE extends Instruction {
    protected constructor(cpu: Cpu) {
        super(cpu);
    }

    execute(): void {
        const minuend = this.registers.A.value;
        const subtrahend = this.getSource();
        const carry = this.registers.F.carryFlag
        const result = minuend - subtrahend - carry;

        this.registers.A.value = result;
        this.updateFlagsAfterSubtraction(minuend, subtrahend - carry, result);

        this.registers.PC.value++;
    }

    abstract getSource(): number;
}

export class SBC_A_R8 extends SBC_A_8_SOURCE {
    private readonly register: R8Code

    constructor(cpu: Cpu, register: R8Code) {
        super(cpu);
        this.register = register;
    }

    getSource(): number {
        return this.registers.r8[this.register].value;
    }
}

export class SBC_A_IMM8 extends SBC_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    getSource(): number {
        return this.cpu.getImmediate8();
    }
}