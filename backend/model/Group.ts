export class Group {
    public static workGroups = [
        new Group("AK Campusrallye", "Organisiert die Campusrallye"),
        new Group("AK Erster Tag", "Verarscht die Erstis"),
        new Group("AK Essen fassen", "Bianca Ruland organisiert das Essen"),
        new Group("AK AF/NF-Cafe", "Es gibt Kuchen"),
        new Group("AK Erstiguide", "Aktualisiert den Erstiguide"),
        new Group("AK Nachmittag", "Bespaßt die Erstis mit Werwolf und CAH"),
        new Group("AK Dozentengrillen", "Es gibt Fleisch und Gemüse"),
    ];

    public name: string;
    public description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}
