import { Cache } from 'swr';

export const clearCache = (cache: Cache<any>, key: string) => {
    const keys = Array.from(cache.keys());

    keys.forEach((k) => {
        if (k.includes(key)) {
            cache.delete(k);
        }
    });
};
