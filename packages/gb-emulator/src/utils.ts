import { Pointer } from '@/registers/registers.ts'

export type Enumerate<
    N extends number,
    Acc extends number[] = [],
> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<
    Enumerate<T>,
    Enumerate<F>
>

export const isPointer = (address: Pointer | number): address is Pointer =>
    typeof address !== 'number'

export const getAddressValue = (address: number | Pointer) => {
    return isPointer(address) ? address.value : address
}
