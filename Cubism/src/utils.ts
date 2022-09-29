let seed = 0;
export function random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

export function setSeed(newSeed: number) {
    seed = newSeed;
}
