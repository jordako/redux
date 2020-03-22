export interface IUser {
  uid: string;
  email: string;
  name: string;
}

export class UserModel implements IUser {
  uid: string;
  email: string;
  name: string;

  constructor(data: IUser) {
    this.uid = data && data.uid || undefined;
    this.email = data && data.email || undefined;
    this.name = data && data.name || undefined;
  }

  /*
  private setProperties(data) {
    const response = {};
    if (data) {
      Object.keys(data.__props__ || {}).forEach((p) => {
        if (data[p] !== undefined) {
          response[p] = data[p];
        }
      });
    }
    return response;
  }*/
}
