import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from 'environments/environment';
import { ChatbotComponent } from "../chatbot/chatbot.component";

@Component({
  standalone: true,
  selector: 'cta-contact',
  imports: [
    CommonModule,
    TranslateModule,
    ChatbotComponent
],
  templateUrl: './cta-contact.component.html',
  styleUrl: './cta-contact.component.scss'
})
export class CtaContactComponent {
  environment = environment;
}
