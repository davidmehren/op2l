/**
 * Created by philip on 06/11/2016.
 */
export class Clothes {
  size: string;
  girlie: boolean = false;


  constructor(size: string, girlie: boolean) {
    this.size = size;
    this.girlie = girlie;
  }

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
}
