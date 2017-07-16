export class Clothes {
    public static sizeList = [
        new Clothes("XS", false),
        new Clothes("S", false),
        new Clothes("M", false),
        new Clothes("L", false),
        new Clothes("XL", false),
        new Clothes("XXL", false),
        new Clothes("3XL", false),
        new Clothes("4XL", false),
        new Clothes("5XL", false),

    ];

    public size: string;
    public girlie = false;

    constructor(size: string, girlie: boolean) {
        this.size = size;
        this.girlie = girlie;
    }
}
