export enum FoodType {
    alles,
    vegetraisch,
    vegan,
}

export class Food {
    public type: FoodType;
    public comment: string;
}
