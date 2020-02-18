import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JokeModel } from '../../../shared/models';

const routes = {
  joke: () => `/jokes/random`,
};

@Injectable()
export class IncomeAndExpensesService {

  constructor(
    private httpClient: HttpClient,
  ) {}

  getRandomJoke(): Observable<JokeModel> {
    return this.httpClient
      .get<JokeModel>(routes.joke());
  }
}
