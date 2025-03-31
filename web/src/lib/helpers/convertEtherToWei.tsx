export default function convertEtherToWei (value: number) {
    return BigInt(value * 1_000_000_000_000_000_000);
}