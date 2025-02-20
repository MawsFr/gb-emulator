import { beforeEach, describe, expect, it } from "vitest";
import { Memory } from "@/memory.ts"

describe(Memory, () => {
    let memory: Memory;

    beforeEach(() => {
        memory = new Memory();
    });

    it('should have a 64KB of 8 bits addresses from 0x0 to 0xFFFF', () => {
        expect(memory.addresses)
            .to.be.an.instanceof(Uint8Array)
            .and.have.length(0xFFFF);
    });
});