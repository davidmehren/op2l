export enum FoodType {
    alles,
    vegetraisch,
    vegan
}

export class Food {
    type: FoodType;
    comment: string;
}