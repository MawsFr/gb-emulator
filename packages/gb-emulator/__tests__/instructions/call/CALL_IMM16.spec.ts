import { describe, expect, it } from 'vitest'
import { CALL_IMM16 } from '@/instructions/call/CALL_IMM16.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(CALL_IMM16, () => {
    it<GbEmulatorTestContext>('should call the address specified by the immediate 16 bits', ({
        cpu,
        memory,
        registers,
    }) => {
        // Given
        registers.PC.value = 0x8000

        memory.write(0x8001, 0x34)
        memory.write(0x8002, 0x12)

        registers.SP.value = 0xFFFE

        // When
        new CALL_IMM16(cpu).execute()

        // Then
        expect(registers.PC.value).to.equal(0x1234)
        expect(registers.SP.value).to.equal(0xFFFC)
        expect(memory.addresses[0xFFFD]).to.equal(0x80)
        expect(memory.addresses[0xFFFC]).to.equal(0x03)
    })
})
