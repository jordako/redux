import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivateComponent { }
