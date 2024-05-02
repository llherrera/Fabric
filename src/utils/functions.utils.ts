export const validateLength = (value: string, len: number) => {
    if (value.length === len) {
        return true;
    } else {
        return false;
    }
}
