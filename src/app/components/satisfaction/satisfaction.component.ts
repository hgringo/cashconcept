import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-satisfaction',
  imports: [CommonModule, TranslatePipe],
  templateUrl: './satisfaction.component.html',
  styleUrl: './satisfaction.component.scss'
})
export class SatisfactionComponent {
}