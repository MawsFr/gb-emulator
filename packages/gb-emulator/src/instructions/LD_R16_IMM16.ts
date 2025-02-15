import { Cpu } from "@/cpu.ts";
import { R16Code } from "@/registers.ts";
import { Instruction } from "@/instructions/instruction.ts";

type ExecuteParams = {
    destination: R16Code
}

export class LD_R16_IMM16 extends Instruction<ExecuteParams> {
    constructor(cpu: Cpu) {
        super(cpu)
    }

    execute({ destination }: ExecuteParams) {
        this.registers.r16[destination].value = this.cpu.getImmediateBytes({
            count: 2,
        })

        this.registers.PC.value++
    }
}