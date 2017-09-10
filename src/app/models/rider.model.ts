export class Rider{
  id: number;
  firstName: string;
  lastName: string;

  toString(){
    return this.lastName + ' ' + this.firstName;
  }

}
