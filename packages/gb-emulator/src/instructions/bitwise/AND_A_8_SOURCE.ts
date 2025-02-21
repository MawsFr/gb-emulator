import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";
import { R8Code } from "@/registers.ts";
import { ImmediateSourceStrategy, RegisterSourceStrategy, SourceStrategy } from "@/instructions/source-strategies.ts";

export type AND_A_R8_OPCODES =
    | 0b10100000
    | 0b10100001
    | 0b10100010
    | 0b10100011
    | 0b10100100
    | 0b10100101
    | 0b10100110
    | 0b10100111;

export type AND_A_IMM8_OPCODE = 0b11100110;

export abstract class AND_A_8_SOURCE extends Instruction {
    private readonly sourceStrategy: SourceStrategy;

    protected constructor(cpu: Cpu, sourceStrategy: SourceStrategy) {
        super(cpu);
        this.sourceStrategy = sourceStrategy;
    }

    execute(): void {
        const value = this.sourceStrategy.getSource();

        this.registers.A.value &= value;

        this.setZeroFlag(this.registers.A.value);
        this.registers.F.carryFlag = 0;
        this.registers.F.halfCarryFlag = 1;
        this.registers.F.subtractionFlag = 0;

        this.registers.PC.value++;
    }
}

export class AND_A_R8 extends AND_A_8_SOURCE {
    constructor(cpu: Cpu, register: R8Code) {
        super(cpu, new RegisterSourceStrategy(register, cpu.registers));
    }
}

export class AND_A_IMM8 extends AND_A_8_SOURCE {
    constructor(cpu: Cpu) {
        super(cpu, new ImmediateSourceStrategy(cpu));
    }
}