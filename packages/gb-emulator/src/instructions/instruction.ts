import { ConditionCode, R16Code, R8Code, Registers } from "@/registers.ts";
import { Cpu, Opcode } from "@/cpu.ts";
import { bitwiseAnd, isBitSet, shiftRightBy, shiftRightBy4 } from "@mawsfr/binary-operations";
import { Memory } from "@/memory.ts";
import { JR_COND_IMM8_OPCODE } from "@/instructions/jump/JR_COND_IMM8.ts";
import { RET_COND_OPCODES } from "@/instructions/ret/RET_COND.ts";
import { JP_COND_IMM16_OPCODE } from "@/instructions/jump/JP_COND_IMM16.ts";
import { CALL_COND_IMM16_OPCODES } from "@/instructions/call/CALL_COND_IMM16.ts";

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

    protected updateFlagsAfterAddition(augend: number, addend: number, result: number) {
        this.registers.F.carryFlag =
            isBitSet(augend, 15) && isBitSet(addend, 15)
                ? 1
                : 0

        this.registers.F.halfCarryFlag =
            isBitSet(augend, 11) && isBitSet(addend, 11)
                ? 1
                : 0

        this.registers.F.subtractionFlag = 0
        this.setZeroFlag(result)
    }

    protected updateFlagsAfterSubtraction(minuend: number, subtrahend: number, result: number) {
        this.registers.F.carryFlag =
            minuend < subtrahend
                ? 1
                : 0

        this.registers.F.halfCarryFlag =
            (minuend & 0xF) < (subtrahend & 0xF)
                ? 1
                : 0

        this.registers.F.subtractionFlag = 1
        this.setZeroFlag(result)
    }

    protected setZeroFlag(value: number) {
        this.registers.F.zeroFlag = value === 0 ? 1 : 0
    }

    protected extractDestinationR16(opcode: Opcode) {
        return shiftRightBy4(bitwiseAnd(opcode, REGISTER_16_MASK)) as R16Code;
    }

    protected extractDestinationR8(opcode: Opcode) {
        return shiftRightBy(3)(bitwiseAnd(opcode, REGISTER_8_DESTINATION_MASK)) as R8Code;
    }

    protected extractSourceR8(opcode: Opcode) {
        return bitwiseAnd(opcode, REGISTER_8_SOURCE_MASK) as R8Code;
    }

    protected conditionIsMet(opcode: JR_COND_IMM8_OPCODE | RET_COND_OPCODES | JP_COND_IMM16_OPCODE | CALL_COND_IMM16_OPCODES) {
        const conditionCode = this.getCondition(opcode)

        switch (conditionCode) {
            case 0b00:
                return !this.registers.F.zeroFlag
            case 0b01:
                return this.registers.F.zeroFlag
            case 0b10:
                return !this.registers.F.carryFlag
            case 0b11:
                return this.registers.F.carryFlag
        }
    }

    protected getCondition(opcode: JR_COND_IMM8_OPCODE | RET_COND_OPCODES | JP_COND_IMM16_OPCODE | CALL_COND_IMM16_OPCODES) {
        return shiftRightBy(3)(bitwiseAnd(opcode, 0b00_011_000)) as ConditionCode;
    }
}