import { describe, expect, it } from 'vitest'
import { LCDControl, LCDControlAddressingMode } from '@/registers/LCDControl.ts'

describe(LCDControl, () => {
    describe('addressing mode', () => {
        it.for<{
            value: number
            mode: LCDControlAddressingMode
        }>([
            {
                value: 0b00000000,
                mode: LCDControlAddressingMode.SIGNED_ADDRESSING_MODE,
            },
            {
                value: 0b00010000,
                mode: LCDControlAddressingMode.UNSIGNED_ADDRESSING_MODE,
            },
        ])(
            'should return addressing mode',
            ({ value, mode }, { memory, registers }) => {
                memory.write(0xFF40, value)

                expect(registers.LCDC.addressingMode).toEqual(mode)
            }
        )
    })
})
