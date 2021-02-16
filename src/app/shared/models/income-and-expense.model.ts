import { QueryDocumentSnapshot } from "@angular/fire/firestore";

export type IncomeAndExpenseType = 'income' | 'expense';

export class IncomeAndExpenseModel {
  constructor(
    public description: string,
    public amount: number,
    public type: IncomeAndExpenseType,
    public uid?: string,
  ) {}

  static fromFirestore(doc: QueryDocumentSnapshot<IncomeAndExpenseModel> ) {
    const { description, amount, type } = doc.data();
    return new IncomeAndExpenseModel(description, amount, type, doc.id);
  }
}
