import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable, SubscriptionLike } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as authActions from '../store/auth.actions';
import * as incomeAndExpensesActions from '../../../private/income-and-expenses/store/income-and-expenses.actions';

import { UserModel } from '../../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userSubscription: SubscriptionLike;

  private _user: UserModel;
  get user(): UserModel {
    return this._user;
  }

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
        this.userSubscription = this.firestore.doc<UserModel>(`${firebaseUser.uid}/user`).valueChanges()
          .subscribe(user => {
            this._user = user;
            this.store.dispatch(authActions.setUser({ user }));
          });
      } else {
        this._user = null;
        this.store.dispatch(authActions.unsetUser());
        this.store.dispatch(incomeAndExpensesActions.unSetItems());
        if (this.userSubscription) { this.userSubscription.unsubscribe(); }
      }
    });
  }

  async createUser(name: string, email: string, password: string): Promise<void> {
    const { user } = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    const newUser = new UserModel(user.uid, user.email, name);
    return await this.firestore.doc<UserModel>(`${user.uid}/user`).set({ ...newUser });
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
