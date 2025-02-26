import { describe, expect, it } from 'vitest'
import { Memory } from '@/memory.ts'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(Memory, () => {
    it<GbEmulatorTestContext>('should have a 64KB of 8 bits addresses from 0x0 to 0xFFFF', ({
        memory,
    }) => {
        expect(memory.addresses)
            .to.be.an.instanceof(Uint8Array)
            .and.have.length(0xFFFF)
    })
})
