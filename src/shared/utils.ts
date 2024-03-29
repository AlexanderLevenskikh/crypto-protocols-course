export function coinToss(): boolean {
    return Math.floor(Math.random() * 2) === 1;
}

export function findReversed(a: number, module: number): number {
    let b = module;

    let q, r;
    let k = 0, r1 = 1, r2 = 0;

    while (a > 0) {
        q = Math.floor(b / a);
        r = b - q*a;
        k = r2 - q * r1;

        b = a;
        a = r;
        r2 = r1;
        r1 = k;
    }

    return (r2 + module) % module;
}

export function primeGenerator(num: number, showPrimes: boolean) {
    var i,
        arr: number[] = [];

    function isPrime(num: number) {
        // try primes <= 16
        if (num <= 16) return (
            num == 2 || num == 3 || num == 5 || num == 7 || num == 11 || num == 13
        );
        // cull multiples of 2, 3, 5 or 7
        if (num % 2 == 0 || num % 3 == 0 || num % 5 == 0 || num % 7 == 0)
            return false;
        // cull square numbers ending in 1, 3, 7 or 9
        for (let i = 10; i * i <= num; i += 10) {
            if (num % (i + 1) == 0) return false;
            if (num % (i + 3) == 0) return false;
            if (num % (i + 7) == 0) return false;
            if (num % (i + 9) == 0) return false;
        }
        return true;
    }

    if (typeof num == "number") {
        for (i = 0; arr.length < num; i++) if (isPrime(i)) arr.push(i);
        // first x primes
        if (showPrimes) return arr;
        // xth prime
        else return arr.pop();
    }

    if (Array.isArray(num)) {
        for (i = num[0]; i <= num[1]; i++) if (isPrime(i)) arr.push(i);
        // primes between x .. y
        if (showPrimes) return arr;
        // number of primes between x .. y
        else return arr.length;
    }
    // throw a default error if nothing returned yet
    // (surrogate for a quite long and detailed try-catch-block anywhere before)
    throw("Invalid arguments for primeGenerator()");
}

export function primeNumberRandomGenerator(): number {
    const i = Math.floor(Math.random() * 4000) + 1000;

    // @ts-ignore
    return primeGenerator(i, false);
}

export function randomKeyGenerator(p: number) {
    return Math.floor(Math.random() * (p-1)) + 1;
}
