import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { R8Code } from "@/registers.ts";

export type ADD_A_R8_OPCODES =
    0b10000000
    | 0b10000001
    | 0b10000010
    | 0b10000011
    | 0b10000100
    | 0b10000101
    | 0b10000110
    | 0b10000111;

export type ADD_A_IMM8_OPCODE = 0b11000110;

export abstract class ADD_A_8_SOURCE extends Instruction {
    protected constructor(cpu: Cpu) {
        super(cpu);
    }

    execute(): void {
        const augend = this.registers.A.value;
        const addend = this.getSource();
        const result = augend + addend;

        this.registers.A.value = result;
        this.updateFlagsAfterAddition(augend, addend, result);

        this.registers.PC.value++;
    }

    abstract getSource(): number;
}

export class ADD_A_R8 extends ADD_A_8_SOURCE {
    private readonly register: R8Code

    constructor(cpu: Cpu, register: R8Code) {
        super(cpu);
        this.register = register;
    }

    getSource(): number {
        return this.registers.r8[this.register].value;
    }
}

export class ADD_A_IMM8 extends ADD_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    getSource(): number {
        return this.cpu.getImmediate8();
    }
}