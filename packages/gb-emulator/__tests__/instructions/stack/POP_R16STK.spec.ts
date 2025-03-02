import { describe, expect, it } from 'vitest'
import {
    POP_R16STK,
    POP_R16STK_OPCODES,
} from '@/instructions/stack/POP_R16STK.ts'

describe(POP_R16STK, () => {
    it.for<{
        opcode: POP_R16STK_OPCODES
        expectedBC?: number
        expectedDE?: number
        expectedHL?: number
        expectedAF?: number
    }>([
        {
            opcode: 0b11000001,
            expectedBC: 0x1234,
        },
        {
            opcode: 0b11010001,
            expectedDE: 0x1234,
        },
        {
            opcode: 0b11100001,
            expectedHL: 0x1234,
        },
        {
            opcode: 0b11110001,
            expectedAF: 0x1234,
        },
    ])(
        'should pop the value from the stack into the register pair',
        (
            { opcode, expectedBC, expectedDE, expectedHL, expectedAF },
            { cpu, memory, registers }
        ) => {
            // Given
            registers.PC.value = 0x0000
            registers.SP.value = 0xFFFC
            registers.BC.value = expectedBC ?? 0
            registers.DE.value = expectedDE ?? 0
            registers.HL.value = expectedHL ?? 0
            registers.AF.value = expectedAF ?? 0

            memory.write(0xFFFD, 0x12)
            memory.write(0xFFFC, 0x34)

            // When
            new POP_R16STK(cpu).execute(opcode)

            // Then
            expect(registers.PC.value).to.equal(0x0001)
            expect(registers.SP.value).to.equal(0xFFFE)
            expect(registers.BC.value).to.equal(expectedBC ?? 0)
            expect(registers.DE.value).to.equal(expectedDE ?? 0)
            expect(registers.HL.value).to.equal(expectedHL ?? 0)
            expect(registers.AF.value).to.equal(expectedAF ?? 0)
        }
    )
})
