import { Cpu, Opcode } from "@/cpu.ts";
import { LD_R16_IMM16 } from "@/instructions/ld/LD_R16_IMM16.ts";
import { Instruction } from "@/instructions/instruction.ts";
import { LD_R16MEM_A } from "@/instructions/ld/LD_R16MEM_A.ts";

export abstract class InstructionLoader {
    static loadInstructions = (cpu: Cpu): Record<Opcode, Instruction> => {
        const ld_r16_imm16 = new LD_R16_IMM16(cpu)
        const ld_$$r16mem_a = new LD_R16MEM_A(cpu)

        return {
            0b00000001: ld_r16_imm16,
            0b00010001: ld_r16_imm16,
            0b00100001: ld_r16_imm16,
            0b00110001: ld_r16_imm16,

            0b00000010: ld_$$r16mem_a,
            0b00010010: ld_$$r16mem_a,
            0b00100010: ld_$$r16mem_a,
            0b00110010: ld_$$r16mem_a
        }
    }
}