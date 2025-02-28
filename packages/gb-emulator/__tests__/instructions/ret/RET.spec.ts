import { describe, expect, it } from 'vitest'
import { RET } from '@/instructions/ret/RET.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(RET, () => {
    it<GbEmulatorTestContext>('should return unconditionally from a function', ({
        cpu,
        memory,
        registers,
    }) => {
        registers.PC.value = 0x0050
        registers.SP.value = 0xFFFC
        memory.write(0xFFFC, 0x34)
        memory.write(0xFFFD, 0x12)

        new RET(cpu).execute()

        expect(registers.PC.value).to.equal(0x1235)
        expect(registers.SP.value).to.equal(0xFFFE)
    })
})
