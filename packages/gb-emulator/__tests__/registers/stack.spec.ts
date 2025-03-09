import { GbEmulatorTestContext } from '$/test.setup'
import { Stack } from '@/registers/stack'
import { describe, expect, it } from 'vitest'

describe(Stack, () => {
    describe(Stack.prototype.push, () => {
        it<GbEmulatorTestContext>('should push a value to the stack', ({
            registers,
            memory,
        }) => {
            registers.SP.value = 0xFFFE

            registers.stack.push(0x0102)

            expect(memory.addresses[0xFFFD]).to.equal(0x01)
            expect(memory.addresses[0xFFFC]).to.equal(0x02)
            expect(registers.SP.value).to.equal(0xFFFC)
        })
    })
})
