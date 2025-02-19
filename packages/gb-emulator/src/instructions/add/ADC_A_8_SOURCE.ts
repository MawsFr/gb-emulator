import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { R8Code } from "@/registers.ts";

export type ADC_A_R8_OPCODES =
    | 0b10001000
    | 0b10001001
    | 0b10001010
    | 0b10001011
    | 0b10001100
    | 0b10001101
    | 0b10001110
    | 0b10001111;

export type ADC_A_IMM8_OPCODE = 0b11001110;

export abstract class ADC_A_8_SOURCE extends Instruction {
    protected constructor(cpu: Cpu) {
        super(cpu);
    }

    execute(): void {
        const augend = this.registers.A.value;
        const addend = this.getSource();
        const carry = this.registers.F.carryFlag
        const result = augend + addend + carry;

        this.registers.A.value = result;
        this.updateFlagsAfterAddition(augend, addend + carry, result);

        this.registers.PC.value++;
    }

    abstract getSource(): number;
}

export class ADC_A_R8 extends ADC_A_8_SOURCE {
    private readonly register: R8Code

    constructor(cpu: Cpu, register: R8Code) {
        super(cpu);
        this.register = register;
    }

    getSource(): number {
        return this.registers.r8[this.register].value;
    }
}

export class ADC_A_IMM8 extends ADC_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu);
    }

    getSource(): number {
        return this.cpu.getImmediate8();
    }
}