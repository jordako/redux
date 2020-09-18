import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserModel } from '../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  createUser(name: string, email: string, password: string): Promise<void | firebase.auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new UserModel( user.uid, user.email, name );
        return this.firestore.doc(`${ user.uid }/user`).set({ ...newUser });
      });
  }

  login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((fbUser: firebase.User) => fbUser != null),
    );
  }

  isNoAuth(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((fbUser: firebase.User) => fbUser == null),
    );
  }
}
