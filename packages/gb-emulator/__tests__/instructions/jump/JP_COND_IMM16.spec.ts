import { describe, expect, it } from 'vitest'
import {
    JP_COND_IMM16,
    JP_COND_IMM16_OPCODE,
} from '@/instructions/jump/JP_COND_IMM16.ts'

describe(JP_COND_IMM16, () => {
    it.for<{
        opcode: JP_COND_IMM16_OPCODE
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b11000010,
            zeroFlag: 0,
        },
        {
            opcode: 0b11001010,
            zeroFlag: 1,
        },
        {
            opcode: 0b11010010,
            carryFlag: 0,
        },
        {
            opcode: 0b11011010,
            carryFlag: 1,
        },
    ])(
        'should jump to the address specified by the immediate 16 bits if the condition is met',
        ({ opcode, zeroFlag, carryFlag }, { cpu, memory, registers }) => {
            // Given
            registers.PC.value = 0x0
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            memory.write(0x1, 0x51)
            memory.write(0x2, 0x50)

            // When
            new JP_COND_IMM16(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).toBe(0x5051)
        }
    )

    it.for<{
        opcode: JP_COND_IMM16_OPCODE
        zeroFlag?: number
        carryFlag?: number
    }>([
        {
            opcode: 0b11000010,
            zeroFlag: 1,
        },
        {
            opcode: 0b11001010,
            zeroFlag: 0,
        },
        {
            opcode: 0b11010010,
            carryFlag: 1,
        },
        {
            opcode: 0b11011010,
            carryFlag: 0,
        },
    ])(
        'should not jump to the address specified by the immediate 16 bits if the condition is not met',
        ({ opcode, zeroFlag, carryFlag }, { cpu, memory, registers }) => {
            // Given
            registers.F.zeroFlag = zeroFlag ?? 0
            registers.F.carryFlag = carryFlag ?? 0
            memory.write(0x1, 0x50)
            memory.write(0x2, 0x51)

            registers.PC.value = 0x0

            // When
            new JP_COND_IMM16(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).toBe(0x3)
        }
    )
})
