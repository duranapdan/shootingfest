export class PaginationParams {
    public Page: number = 0;
    public Count: number = 12;

    constructor(count?: number) {
        if (count) this.Count = count;
    }
}