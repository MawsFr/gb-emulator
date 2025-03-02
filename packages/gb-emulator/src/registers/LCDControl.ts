import { Memory, Memory8Value } from '$/src'
import { getNthBit } from '@mawsfr/binary-operations'

export enum LCDControlAddressingMode {
    SIGNED_ADDRESSING_MODE = 0,
    UNSIGNED_ADDRESSING_MODE = 1,
}

export class LCDControl extends Memory8Value {
    constructor(memory: Memory) {
        super(memory, 0xFF40)
    }

    get addressingMode(): LCDControlAddressingMode {
        return getNthBit(this.value, 4)
    }
}
