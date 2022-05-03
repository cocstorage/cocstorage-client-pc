import type { AxiosError } from 'axios';

export declare function isAxiosError(error: unknown): error is AxiosError | undefined | null;
