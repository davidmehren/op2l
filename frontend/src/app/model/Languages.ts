export class Language {
  public name: string;
  public short: string;


  public static languages = [
    new Language("Deutsch", "DE"),
    new Language("Englisch", "EN"),
    new Language("Französisch", "FR"),
    new Language("Spanisch", "ES"),
    new Language("Türkisch", "TR"),
    new Language("Syrisch", "SYR"),
    new Language("Arabisch", "AR"),
    new Language("Chinesisch", "ZH"),
    new Language("Afrikaans", "AF"),
    new Language("Swahili", "SW"),
    new Language("Tagalog", "TL"),
    new Language("Russisch", "RU"),
    new Language("Japanisch", "JA"),
    new Language("Polnisch", "PL"),
    new Language("Lojban", "JBO"),
    new Language("Klingonisch", "TLH")
  ];


  constructor(name: string, short: string[any]) {
    this.name = name;
    this.short = short;
  }
}
