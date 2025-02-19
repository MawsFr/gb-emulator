import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { R8Code } from "@/registers.ts";
import { ImmediateSourceStrategy, RegisterSourceStrategy, SourceStrategy } from "@/instructions/source-strategies.ts";

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
    private readonly sourceStrategy: SourceStrategy;

    protected constructor(cpu: Cpu, sourceStrategy: SourceStrategy) {
        super(cpu);
        this.sourceStrategy = sourceStrategy;
    }

    execute(): void {
        const minuend = this.registers.A.value;
        const subtrahend = this.sourceStrategy.getSource();
        const result = minuend - subtrahend;

        this.registers.A.value = result;
        this.updateFlagsAfterSubtraction(minuend, subtrahend, result);

        this.registers.PC.value++;
    }
}

export class SUB_A_R8 extends SUB_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers));
    }
}

export class SUB_A_IMM8 extends SUB_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new ImmediateSourceStrategy(cpu));
    }
}