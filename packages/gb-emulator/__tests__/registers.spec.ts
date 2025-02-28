// Based on : https://gbdev.io/pandocs/CPU_Registers_and_Flags.html#the-flags-register-lower-8-bits-of-af-register

import { describe, expect, it } from 'vitest'
import { Registers } from '@/registers.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(Registers, () => {
    describe('8 bit registers', () => {
        it<GbEmulatorTestContext>('should have an A register', ({
            registers,
        }) => {
            registers.A.value = 0x01
            expect(registers.A.value).to.be.a('number').and.to.equal(0x01)
        })

        it<GbEmulatorTestContext>('should have a B register', ({
            registers,
        }) => {
            registers.B.value = 0x01
            expect(registers.B.value).to.be.a('number').and.to.equal(0x01)
        })

        it<GbEmulatorTestContext>('should have a C register', ({
            registers,
        }) => {
            registers.C.value = 0x01
            expect(registers.C.value).to.be.a('number').and.to.equal(0x01)
        })

        it<GbEmulatorTestContext>('should have a D register', ({
            registers,
        }) => {
            registers.D.value = 0x01
            expect(registers.D.value).to.be.a('number').and.to.equal(0x01)
        })

        it<GbEmulatorTestContext>('should have an E register', ({
            registers,
        }) => {
            registers.E.value = 0x01
            expect(registers.E.value).to.be.a('number').and.to.equal(0x01)
        })

        it<GbEmulatorTestContext>('should have an H register', ({
            registers,
        }) => {
            registers.H.value = 0x01
            expect(registers.H.value).to.be.a('number').and.to.equal(0x01)
        })

        it<GbEmulatorTestContext>('should have an L register', ({
            registers,
        }) => {
            registers.L.value = 0x01
            expect(registers.L.value).to.be.a('number').and.to.equal(0x01)
        })

        it<GbEmulatorTestContext>('should have an F register', ({
            registers,
        }) => {
            registers.F.value = 0x01
            expect(registers.F.value).to.be.a('number').and.to.equal(0x01)
        })
    })

    describe('16 bits registers', () => {
        it<GbEmulatorTestContext>('should have an AF register with A as high and F as low', ({
            registers,
        }) => {
            registers.A.value = 0x01
            registers.F.value = 0x02
            expect(registers.AF.value).to.be.a('number').and.to.equal(0x0102)
        })

        it<GbEmulatorTestContext>('should have a BC register with B as high and C as low', ({
            registers,
        }) => {
            registers.B.value = 0x01
            registers.C.value = 0x02
            expect(registers.BC.value).to.be.a('number').and.to.equal(0x0102)
        })

        it<GbEmulatorTestContext>('should have a DE register with D as high and E as low', ({
            registers,
        }) => {
            registers.D.value = 0x01
            registers.E.value = 0x02
            expect(registers.DE.value).to.be.a('number').and.to.equal(0x0102)
        })

        it<GbEmulatorTestContext>('should have a HL register with H as high and L as low', ({
            registers,
        }) => {
            registers.H.value = 0x01
            registers.L.value = 0x02
            expect(registers.HL.value).to.be.a('number').and.to.equal(0x0102)
        })

        it<GbEmulatorTestContext>('should have a SP register', ({
            registers,
        }) => {
            registers.SP.value = 0x0102
            expect(registers.SP.value).to.be.a('number').and.to.equal(0x0102)
        })

        it<GbEmulatorTestContext>('should have a SP register with default value = 0xFFFE', ({
            registers,
        }) => {
            expect(registers.SP.value).to.equal(0xFFFE)
        })

        it<GbEmulatorTestContext>('should have a PC register with default value 0x0100', ({
            registers,
        }) => {
            expect(registers.PC.value).to.be.a('number').and.to.equal(0x0100)
        })

        // Setters
        it<GbEmulatorTestContext>('should set A as High and F as Low when setting AF', ({
            registers,
        }) => {
            registers.AF.value = 0x0102

            expect(registers.A.value).to.equal(0x01)
            expect(registers.F.value).to.equal(0x02)
        })

        it<GbEmulatorTestContext>('should set B as High and C as Low when setting BC', ({
            registers,
        }) => {
            registers.BC.value = 0x0102

            expect(registers.B.value).to.equal(0x01)
            expect(registers.C.value).to.equal(0x02)
        })

        it<GbEmulatorTestContext>('should set D as High and E as Low when setting DE', ({
            registers,
        }) => {
            registers.DE.value = 0x0102

            expect(registers.D.value).to.equal(0x01)
            expect(registers.E.value).to.equal(0x02)
        })

        it<GbEmulatorTestContext>('should set H as High and L as Low when setting HL', ({
            registers,
        }) => {
            registers.HL.value = 0x0102

            expect(registers.H.value).to.equal(0x01)
            expect(registers.L.value).to.equal(0x02)
        })
    })

    describe('Flag registers', () => {
        it<GbEmulatorTestContext>('should have a Zero Flag (Z)', ({
            registers,
        }) => {
            registers.F.zeroFlag = 1
            expect(registers.F.zeroFlag).to.be.a('number').and.to.equal(1)
        })

        it<GbEmulatorTestContext>('should have a Subtraction Flag (N)', ({
            registers,
        }) => {
            registers.F.subtractionFlag = 1
            expect(registers.F.subtractionFlag)
                .to.be.a('number')
                .and.to.equal(1)
        })

        it<GbEmulatorTestContext>('should have a Half Carry Flag (H)', ({
            registers,
        }) => {
            registers.F.halfCarryFlag = 1
            expect(registers.F.halfCarryFlag).to.be.a('number').and.to.equal(1)
        })

        it<GbEmulatorTestContext>('should have a Carry Flag (CY)', ({
            registers,
        }) => {
            registers.F.carryFlag = 1
            expect(registers.F.carryFlag).to.be.a('number').and.to.equal(1)
        })
    })

    describe('[HL Pointer]', () => {
        it<GbEmulatorTestContext>('should have a value', ({
            registers,
            memory,
        }) => {
            registers.HL.value = 0x0102
            registers['[HL]'].value = 0x03
            expect(registers['[HL]'].value).to.equal(0x03)
            expect(memory.addresses[0x0102]).to.equal(0x03)
        })

        it<GbEmulatorTestContext>('should set a value', ({
            registers,
            memory,
        }) => {
            registers.HL.value = 0x0102
            registers['[HL]'].value = 0x03
            expect(registers['[HL]'].value).to.equal(0x03)
            expect(memory.addresses[0x0102]).to.equal(0x03)
        })
    })

    describe(Registers.prototype.pushPCToStack, () => {
        it<GbEmulatorTestContext>('should push the PC value to the stack', ({
            registers,
            memory,
        }) => {
            registers.SP.value = 0xFFFE
            registers.PC.value = 0x0102

            registers.pushPCToStack()

            expect(memory.addresses[0xFFFD]).to.equal(0x01)
            expect(memory.addresses[0xFFFC]).to.equal(0x02)
        })
    })
})
