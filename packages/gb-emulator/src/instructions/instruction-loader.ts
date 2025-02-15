import { Cpu } from "@/cpu.ts";
import { LD_R16_IMM16 } from "@/instructions/LD_R16_IMM16.ts";

export abstract class InstructionLoader {
    static loadInstructions = (cpu: Cpu) => [
        new LD_R16_IMM16(cpu)
    ]
}