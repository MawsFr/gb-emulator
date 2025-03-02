<template>
    <div>
        Manual<input
            v-model="manual"
            type="checkbox"
        />
        Memory<input
            v-model="showMemory"
            type="checkbox"
        />
        <button @click="executeNextInstruction">Next Instruction</button>
        <button @click="scrollToCurrentAddress">Scroll to PC</button>
        <input
            type="file"
            @change="loadFile"
        />
        ROM chargé : {{ loadedRom ? 'Oui' : 'Non' }}

        Previous :
        {{ instruction }}

        | Next :
        {{ getNextInstruction() }}
        <div class="container">
            <div
                class="graphics"
                v-if="loadedRom"
            >
                <canvas
                    class="screen"
                    ref="canvas"
                />
                <canvas
                    class="tile-data-table"
                    ref="tile-data-table"
                />
            </div>
            <div
                class="memory"
                v-if="showMemory"
            >
                <div
                    v-for="(address, index) in cpu.memory.addresses"
                    :key="index"
                    class="address"
                    :class="{ 'current-address': isCurrentAddress(index) }"
                >
                    <div class="address-index-hexa">
                        0x{{ toHexa(index, 3) }} ({{ index }})
                    </div>
                    <div class="address-hexa-value">
                        {{ toHexa(address) }}
                    </div>
                    <div class="address-bin-value">
                        {{ toBin(address) }}
                    </div>
                    <div class="address-description">
                        {{ getOpcodeDescription(address) }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
/* eslint-disable no-useless-assignment */
import {
    Cpu,
    Graphics,
    Instruction,
    Memory,
    Registers,
} from '@mawsfr/gb-emulator'
import { ref, useTemplateRef, watch } from 'vue'
import { useMemoize } from '@vueuse/core'

const canvas = useTemplateRef('canvas')
const tileDataTable = useTemplateRef('tile-data-table')

let ctx: CanvasRenderingContext2D
let tileDataTableCtx: CanvasRenderingContext2D

const manual = ref(true)
const showMemory = ref(false)

const memory = new Memory()
const registers = new Registers(memory)
const graphics = new Graphics(memory)
const cpu = ref(
    new Cpu({
        memory,
        registers,
    })
)

const instruction = ref<Instruction | undefined>()

const loadedRom = ref<Uint8Array | undefined>()

watch(canvas, (canvasTemplate) => {
    if (canvasTemplate) {
        ctx = canvasTemplate.getContext('2d')!
        canvasTemplate.width = 160
        canvasTemplate.height = 144

        drawScreen()
    }
})

watch(tileDataTable, (tileDataTableTemplate) => {
    if (tileDataTableTemplate) {
        tileDataTableCtx = tileDataTableTemplate.getContext('2d')!
        tileDataTableTemplate.width = 800
        tileDataTableTemplate.height = 800

        drawTileDataTable()
    }
})

const loadFile = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input || !input.files || input.files.length === 0) {
        console.error('Aucun fichier sélectionné.')
        return
    }

    const [file] = input.files

    new Blob([file])
        .arrayBuffer()
        .then((arrayBuffer) => {
            const byteArray = new Uint8Array(arrayBuffer)

            loadedRom.value = byteArray

            // Charger les données dans la mémoire
            cpu.value.loadROM(byteArray)
            scrollToCurrentAddress()
            if (manual.value) {
                return
            }
            cpu.value.startDispatchLoop()
        })
        .catch((error) => {
            console.error('Erreur lors de la lecture du fichier :', error)
        })
}

const scrollToCurrentAddress = () =>
    document.querySelectorAll('.current-address')?.[0]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    })

const isCurrentAddress = (index: number) =>
    index === cpu.value.registers.PC.value

const toHexa = (n: number, pad: number = 2) => {
    return `0x${n.toString(16).padStart(pad, '0').toUpperCase()}`
}

const toBin = (n: number, pad: number = 8) => {
    return `0b${n.toString(2).padStart(pad, '0')}`
}

const executeNextInstruction = () => {
    manual.value = true
    instruction.value = cpu.value.dispatch()
    scrollToCurrentAddress()
}

const drawScreen = () => {
    ctx.clearRect(0, 0, 160, 144)
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 160, 144)
    ctx.fillStyle = 'black'
    ctx.fillText('Screen', 50, 50)
}

const drawTileDataTable = () => {
    tileDataTableCtx.clearRect(0, 0, 800, 800)
    tileDataTableCtx.beginPath()
    tileDataTableCtx.fillStyle = 'white'
    tileDataTableCtx.fillRect(0, 0, 800, 800)
    tileDataTableCtx.fillStyle = 'black'
    tileDataTableCtx.fillText(
        `Tile data table : ${graphics.tileDataTable.tiles.length}`,
        350,
        350
    )
}

const getNextInstruction = () => {
    return cpu.value.instructions[
        cpu.value.decode(cpu.value.fetchNextByte())
    ].toString(cpu.value.decode(cpu.value.fetchNextByte()))
}

const getOpcodeDescription = useMemoize((opcode: number) => {
    try {
        const decodedOpcode = cpu.value.decode(opcode)
        return cpu.value.instructions[decodedOpcode].toString(decodedOpcode)
    } catch {
        return opcode
    }
})
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    max-width: 100vw;
}

.memory {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    background-color: green;
    color: white;
    word-wrap: break-word;
    overflow: scroll;
    font-size: 12px;
    text-align: center;
    max-height: 80vh;
    max-width: 21vw;
    resize: vertical;
    height: 640px;
}

@media (max-width: 1400px) {
    .container {
        flex-direction: column;
    }

    .memory {
        height: 200px;
    }
}

.current-address {
    background-color: yellow;
    color: black;
    font-weight: bold;
}

.address {
    display: flex;
    flex-direction: column;
}

.graphics {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.screen {
    width: 160px;
    height: 144px;
}

.tile-data-table {
    width: 800px;
    height: 800px;
}
</style>
