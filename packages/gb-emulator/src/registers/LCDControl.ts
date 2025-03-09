import { Memory, Memory8Value } from '$/src'
import { getNthBit } from '@mawsfr/binary-operations'

export enum LCDControlAddressingMode {
    SIGNED_ADDRESSING_MODE = 0,
    UNSIGNED_ADDRESSING_MODE = 1,
}

export class LCDControl extends Memory8Value<number> {
    constructor(memory: Memory) {
        super(0xFF40, memory)
    }

    get addressingMode(): LCDControlAddressingMode {
        return getNthBit(this.value, 4)
    }
}
