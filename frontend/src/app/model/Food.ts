/**
 * Created by philip on 06/11/2016.
 */
export class Food {
  type: string;
  comment: string;
  public static typeList = [
    new Food("alles", ""),
    new Food("vegetarisch", ""),
    new Food("vegan", ""),
  ];

  constructor(type: string, comment: string) {
    this.type = type;
    this.comment = comment;
  }
}
