export type Response<T> = Promise<(T & { status: 'OK' }) | { error: string; status: 'ERROR' } | undefined>;
