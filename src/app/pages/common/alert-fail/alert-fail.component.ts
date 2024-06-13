import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-fail',
  standalone: true,
  imports: [],
  templateUrl: './alert-fail.component.html',
  styleUrl: './alert-fail.component.css',
})
export class AlertFailComponent {
  @Input() text: string = '';
}
