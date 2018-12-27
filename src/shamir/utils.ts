export function randomKeyGenerator(p: number) {
    return Math.floor(Math.random() * (p-1)) + 1;
}

export function gcd(a: number, b: number): number {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
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
        for (var i = 10; i * i <= num; i += 10) {
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

export function mutuallyPrime(a: number): number {
    let b = 3;
    while ( gcd(a, b) !== 1) {
        b += 2;
    }

    return b;
}

export function pow(secret: number, deg: number, module: number): number {
    if (deg % 2 === 1) {
        return secret * (pow(secret, deg - 1, module) * pow(secret, deg - 1, module)) % module;
    } else {
        return (pow(secret, deg - 1, module) * pow(secret, deg - 1, module)) % module;
    }
}

export function findReversed(a: number, module: number): number {
    let b = 3;
    while ( (a * b) % module !== 1) {
        b += 2;
    }

    return b;
}
