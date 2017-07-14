export class MinorSubject {
    name: string;


    constructor(name: string) {
        this.name = name;
    }

    public static isSubject(s: string) {
        for (let i = 0; i < MinorSubject.subjectList.length; i++) {
            if (MinorSubject.subjectList[i].name == s) {
                return true;
            }
        }
        return false;
    }

    public static subjectList = [
        new MinorSubject("Architektur"),
        new MinorSubject("Chemie"),
        new MinorSubject("Dienstleistungsinformatik"),
        new MinorSubject("Elektrotechnik"),
        new MinorSubject("Kunst"),
        new MinorSubject("Logistik"),
        new MinorSubject("Maschinenbau"),
        new MinorSubject("Mathematik"),
        new MinorSubject("Musik"),
        new MinorSubject("Philosophie"),
        new MinorSubject("Physik"),
        new MinorSubject("Rehabilitationstechnologie"),
        new MinorSubject("Robotik"),
        new MinorSubject("Statistik"),
        new MinorSubject("Theoretische Medizin"),
        new MinorSubject("Wirtschaftswissenschaften"),
    ];
}
