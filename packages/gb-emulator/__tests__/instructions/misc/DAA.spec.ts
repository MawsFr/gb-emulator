import { describe, expect, it } from 'vitest'
import { DAA } from '@/instructions/misc/DAA.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(DAA, () => {
    describe('should adjust the A register to a BCD value', () => {
        it<GbEmulatorTestContext>('should add 0x06 to A if the lower 4 bits contain a non-BCD value', ({
            registers,
            cpu,
        }) => {
            registers.A.value = 0x0A // Non-BCD value
            registers.F.halfCarryFlag = 0

            new DAA(cpu).execute()

            expect(registers.A.value).toEqual(0x10)
            expect(registers.F.zeroFlag).toBe(0)
            expect(registers.F.subtractionFlag).toBe(0)
            expect(registers.F.halfCarryFlag).toBe(0)
            expect(registers.F.carryFlag).toBe(0)
        })

        it<GbEmulatorTestContext>('should add 0x06 to A if the H flag is set', ({
            registers,
            cpu,
        }) => {
            registers.A.value = 0x09
            registers.F.halfCarryFlag = 1

            new DAA(cpu).execute()

            expect(registers.A.value).toEqual(0x0F)
            expect(registers.F.zeroFlag).toBe(0)
            expect(registers.F.subtractionFlag).toBe(0)
            expect(registers.F.halfCarryFlag).toBe(0)
            expect(registers.F.carryFlag).toBe(0)
        })

        it<GbEmulatorTestContext>('should add 0x60 to A if the upper 4 bits contain a non-BCD value', ({
            registers,
            cpu,
        }) => {
            registers.A.value = 0x90
            registers.F.carryFlag = 0

            new DAA(cpu).execute()

            expect(registers.A.value).toEqual(0xF0)
            expect(registers.F.zeroFlag).toBe(0)
            expect(registers.F.subtractionFlag).toBe(0)
            expect(registers.F.halfCarryFlag).toBe(0)
            expect(registers.F.carryFlag).toBe(1) // Carry might be adjusted accordingly
        })

        it<GbEmulatorTestContext>('should add 0x60 to A if the C flag is set', ({
            registers,
            cpu,
        }) => {
            registers.A.value = 0x80
            registers.F.carryFlag = 1

            new DAA(cpu).execute()

            expect(registers.A.value).toEqual(0xE0)
            expect(registers.F.zeroFlag).toBe(0)
            expect(registers.F.subtractionFlag).toBe(0)
            expect(registers.F.halfCarryFlag).toBe(0)
            expect(registers.F.carryFlag).toBe(1)
        })

        it<GbEmulatorTestContext>('should not modify A if no conditions are met', ({
            registers,
            cpu,
        }) => {
            registers.A.value = 0x23
            registers.F.halfCarryFlag = 0
            registers.F.carryFlag = 0

            new DAA(cpu).execute()

            expect(registers.A.value).toEqual(0x23)
            expect(registers.F.zeroFlag).toBe(0)
            expect(registers.F.subtractionFlag).toBe(0)
            expect(registers.F.halfCarryFlag).toBe(0)
            expect(registers.F.carryFlag).toBe(0)
        })
    })
})
