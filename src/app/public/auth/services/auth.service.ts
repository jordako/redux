import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, SubscriptionLike } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as authActions from '../store/auth.actions';

import { UserModel } from '../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription: SubscriptionLike;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>,
  ) {
    this.initAuthListener();
  }

  initAuthListener() {
    this.afAuth.authState.subscribe((firebaseUser: firebase.User) => {
      if (firebaseUser) {
        this.userSubscription = this.firestore.doc(`${firebaseUser.uid}/user`).valueChanges()
          .subscribe((firestoreUser: any) => {
            const user = UserModel.fromFirestore(firestoreUser);
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this.store.dispatch(authActions.unsetUser());
        if (this.userSubscription) { this.userSubscription.unsubscribe(); }
      }
    });
  }

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
