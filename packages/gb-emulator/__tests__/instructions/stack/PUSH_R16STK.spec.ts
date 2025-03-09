import { describe, expect, it } from 'vitest'
import {
    PUSH_R16STK,
    PUSH_R16STK_OPCODES,
} from '@/instructions/stack/PUSH_R16STK.ts'
import { R16Code } from '$/src'

describe(PUSH_R16STK, () => {
    it.for<{
        opcode: PUSH_R16STK_OPCODES
        expectedRegister: R16Code
    }>([
        { opcode: 0b11000101, expectedRegister: 0b00 },
        { opcode: 0b11010101, expectedRegister: 0b01 },
        { opcode: 0b11100101, expectedRegister: 0b10 },
        { opcode: 0b11110101, expectedRegister: 0b11 },
    ])(
        'should push the value from the register pair onto the stack',
        ({ opcode, expectedRegister }, { cpu, memory, registers }) => {
            // Given
            registers.PC.value = 0x0000
            registers.r16Stk[expectedRegister].value = 0x1234

            // When
            new PUSH_R16STK(cpu).execute(opcode)

            // Then
            expect(memory.addresses[0xFFFD]).to.equal(0x12)
            expect(memory.addresses[0xFFFC]).to.equal(0x34)
            expect(registers.SP.value).to.equal(0xFFFC)
        }
    )
})
