export class UserModel {
  constructor(
    public uid: string,
    public email: string,
    public name: string,
  ) {}

  static fromFirestore( { email, uid, name } ) {
    return new UserModel(uid, email, name);
  }
}
