import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-facebook-feed',
  imports: [
    CommonModule
  ],
  templateUrl: './facebook-feed.component.html',
  styleUrl: './facebook-feed.component.scss'
})
export class FacebookFeedComponent {
}
