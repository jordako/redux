import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IncomeAndExpenseModel } from '../../../shared/models';
import { AuthService } from '../../../public/auth/services/auth.service';

@Injectable()
export class IncomeAndExpensesService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) { }

  initIncomeAndExpensesListener(userUid: string): Observable<IncomeAndExpenseModel[]> {
    return this.firestore.collection<IncomeAndExpenseModel>(`${userUid}/income-and-expenses/items`)
      .snapshotChanges()
      .pipe(
        map(snapshot => snapshot.map(doc =>
          IncomeAndExpenseModel.fromFirestore(doc.payload.doc)),
        ),
      );
  }

  add(incomeAndExpense: IncomeAndExpenseModel): Promise<DocumentReference> {
    const userId = this.authService.user.uid;
    delete incomeAndExpense.uid;
    return this.firestore.doc<IncomeAndExpenseModel>(`${userId}/income-and-expenses`)
      .collection('items')
      .add({...incomeAndExpense});
  }

  delete(uid: string): Promise<void> {
    const userId = this.authService.user.uid;
    return this.firestore.doc<IncomeAndExpenseModel>(`${userId}/income-and-expenses/items/${uid}`).delete();
  }
}

