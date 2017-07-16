export class Food {
    public static typeList = [
        new Food("alles", ""),
        new Food("vegetarisch", ""),
        new Food("vegan", ""),
    ];
    public type: string;
    public comment: string;

    constructor(type: string, comment: string) {
        this.type = type;
        this.comment = comment;
    }
}
