import { Memory, Pointed16Value, Register16 } from '..'

export class Stack {
    private readonly currentValue: Pointed16Value
    private readonly SP: Register16

    constructor(SP: Register16, memory: Memory) {
        this.currentValue = new Pointed16Value(SP, memory, {
            endianness: 'little',
        })
        this.SP = SP
    }

    push(value: number) {
        this.SP.value -= 2
        this.currentValue.value = value
    }

    pop() {
        const { value } = this.currentValue
        this.SP.value += 2

        return value
    }
}
