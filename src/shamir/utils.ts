

export function gcd(a: number, b: number): number {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
}

export function mutuallyPrime(a: number): number {
    let b = 3;
    while ( gcd(a, b) !== 1) {
        b += 2;
    }

    return b;
}

export function faststep(val: number, step: number, mod: number) {
    let s = 1;
    let v = step;
    let c = val;
    while (v != 0) {
        let flag = 0;
        if (v%2 == 1) {
            if (!mod)
                s = s*c;
            else
                s = (s*c) % mod;
            v = (v-1)/2;
            if (!mod)
                c = c*c;
            else
                c = (c*c) % mod;
            flag = 1;
        }
        else {
            v = v/2;
        }
        if (!flag)
            if (!mod)
                c = c*c;
            else
                c = (c*c) % mod;
    }
    return s;
}
