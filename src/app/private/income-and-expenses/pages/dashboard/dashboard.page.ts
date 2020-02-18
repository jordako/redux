import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';

import { IncomeAndExpensesService } from '../../services/income-and-expenses.service';
import { JokeModel } from '../../../../shared/models';

@Component({
  selector: 'app-incoming-and-expenses-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app-incoming-and-expenses-dashboard' },
})
export class DashboardPage implements OnInit {

  constructor(
    public incomeAndExpensesService: IncomeAndExpensesService,
  ) {}

  ngOnInit() {
    this.incomeAndExpensesService
      .getRandomJoke()
      .subscribe((joke: JokeModel) => {
        console.log(joke);
      });
  }
}
