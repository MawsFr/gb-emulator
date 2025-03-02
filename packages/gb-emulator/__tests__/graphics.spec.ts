import { describe, expect, it } from 'vitest'
import { TileData, TileDataTable } from '$/src'
import { GbEmulatorTestContext } from '$/test.setup.ts'

describe(TileData, () => {
    it<GbEmulatorTestContext>('should load tile data', ({ memory }) => {
        memory.write(0x8000, 0b00110000)
        memory.write(0x8001, 0b01010000)
        memory.write(0x8002, 0b11000000)
        memory.write(0x8003, 0b10100000)

        const tile = new TileData(memory, 0x8000, {
            height: 4,
        })

        expect(tile.readBytes()).toStrictEqual([
            [0b00, 0b10, 0b01, 0b11, 0b00, 0b00, 0b00, 0b00],
            [0b11, 0b01, 0b10, 0b00, 0b00, 0b00, 0b00, 0b00],
        ])
    })
})

describe(TileDataTable, () => {
    it<GbEmulatorTestContext>('should load tile data table', ({
        graphics,
        memory,
    }) => {
        const tileDataTable = new TileDataTable(graphics, memory)

        expect(tileDataTable.tiles).toHaveLength(384)
    })
})
