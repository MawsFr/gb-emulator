import { Cpu } from "@/cpu.ts";
import { R16Code } from "@/registers.ts";

type ExecuteParams = {
    destination: R16Code
}

export class LD_R16_IMM16 {
    private readonly cpu: Cpu

    constructor(cpu: Cpu) {
        this.cpu = cpu
    }

    execute({ destination }: ExecuteParams) {
        this.cpu.registers.r16[destination].value = this.cpu.getImmediateBytes({
            count: 2,
        })

        this.cpu.registers.PC.value++
    }
}