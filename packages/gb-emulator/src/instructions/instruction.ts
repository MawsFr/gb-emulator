import { R16Code, R8Code, Registers } from "@/registers.ts";
import { Cpu, Opcode } from "@/cpu.ts";
import { bitwiseAnd, shiftRightBy, shiftRightBy4 } from "@mawsfr/binary-operations";
import { Memory } from "@/memory.ts";

export const REGISTER_16_MASK = 0b00_11_0000
export const REGISTER_8_SOURCE_MASK = 0b00_000_111
export const REGISTER_8_DESTINATION_MASK = 0b00_111_000

export abstract class Instruction {
    protected readonly cpu: Cpu
    protected readonly registers: Registers
    protected readonly memory: Memory

    protected constructor(cpu: Cpu) {
        this.cpu = cpu
        this.registers = cpu.registers
        this.memory = cpu.memory
    }

    abstract execute(opcode: Opcode): void

    protected extractDestinationR16(opcode: Opcode) {
        return shiftRightBy4(bitwiseAnd(opcode, REGISTER_16_MASK)) as R16Code;
    }

    protected extractDestinationR8(opcode: Opcode) {
        return shiftRightBy(3)(bitwiseAnd(opcode, REGISTER_8_DESTINATION_MASK)) as R8Code;
    }

    protected extractSourceR8(opcode: Opcode) {
        return bitwiseAnd(opcode, REGISTER_8_SOURCE_MASK) as R8Code;
    }
}