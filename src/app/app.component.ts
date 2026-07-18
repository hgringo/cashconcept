import { Component, inject, makeStateKey, REQUEST_CONTEXT, TransferState, VERSION, PLATFORM_ID, OnInit, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ScrollTopModule } from 'primeng/scrolltop';
import { HeaderComponent } from './components/header/header.component';
import { CtaContactComponent } from './components/cta-contact/cta-contact.component';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { TranslationService } from './services/translation.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    ScrollTopModule,
    HeaderComponent,
    CtaContactComponent
  ]
})
export class AppComponent {

  private readonly platform = inject(PLATFORM_ID);

  version = VERSION.full;
  server: string | undefined;
  transferState = inject(TransferState);
  serverKey = makeStateKey<string>('server');

  constructor(
    private translationService: TranslationService,
    @Inject(DOCUMENT) private document: Document
  ) {

    this.forceLightMode();

    const reqContext = inject(REQUEST_CONTEXT, { optional: true }) as {
      server: string;
    };

    if (reqContext) {
      // The context is defined in the server*.ts file
      this.server = reqContext.server;

      // Store this as this won't be available on hydration
      this.transferState.set(this.serverKey, this.server);
    }

    this.server = this.transferState.get(this.serverKey, '');
  }

  ngOnInit() {
    this.translationService.initLanguage();
  }

  forceLightMode() {

    this.document.documentElement.classList.remove('p-theme-dark');
    this.document.documentElement.classList.add('p-theme-light');

    // Explicitly set theme in PrimeNG format (if needed)
    this.document.documentElement.setAttribute('data-theme', 'aura-light-blue');
  }
}
