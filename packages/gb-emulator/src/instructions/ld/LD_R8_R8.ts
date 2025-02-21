import { Instruction } from "@/instructions/instruction.ts";
import { Cpu } from "@/cpu.ts";

export type LD_R8_R8_OPCODES =
    | 0b01_000_000 | 0b01_001_000 | 0b01_010_000 | 0b01_011_000
    | 0b01_100_000 | 0b01_101_000 | 0b01_110_000 | 0b01_111_000
    | 0b01_000_001 | 0b01_001_001 | 0b01_010_001 | 0b01_011_001
    | 0b01_100_001 | 0b01_101_001 | 0b01_110_001 | 0b01_111_001
    | 0b01_000_010 | 0b01_001_010 | 0b01_010_010 | 0b01_011_010
    | 0b01_100_010 | 0b01_101_010 | 0b01_110_010 | 0b01_111_010
    | 0b01_000_011 | 0b01_001_011 | 0b01_010_011 | 0b01_011_011
    | 0b01_100_011 | 0b01_101_011 | 0b01_110_011 | 0b01_111_011
    | 0b01_000_100 | 0b01_001_100 | 0b01_010_100 | 0b01_011_100
    | 0b01_100_100 | 0b01_101_100 | 0b01_110_100 | 0b01_111_100
    | 0b01_000_101 | 0b01_001_101 | 0b01_010_101 | 0b01_011_101
    | 0b01_100_101 | 0b01_101_101 | 0b01_110_101 | 0b01_111_101
    | 0b01_000_110 | 0b01_001_110 | 0b01_010_110 | 0b01_011_110
    | 0b01_100_110 | 0b01_101_110 | 0b01_111_110
    | 0b01_000_111 | 0b01_001_111 | 0b01_010_111 | 0b01_011_111
    | 0b01_100_111 | 0b01_101_111 | 0b01_110_111 | 0b01_111_111

export class LD_R8_R8 extends Instruction {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute(opcode: LD_R8_R8_OPCODES) {
        const source = this.extractSourceR8(opcode)
        const destination = this.extractDestinationR8(opcode)

        this.registers.r8[destination].value = this.registers.r8[source].value

        this.registers.PC.value++
    }
}