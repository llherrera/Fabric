export class NError extends Error {
    code: number;
    table?: boolean;

    constructor(code: number, entity?: {[key: string]: boolean}, message?: string) {
        super();
        this.code = code;
        this.table = entity?.color;
        if (message) this.message = message;
    }
}