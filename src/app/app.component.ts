import { Component, inject, makeStateKey, REQUEST_CONTEXT, TransferState, VERSION, PLATFORM_ID } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ScrollTopModule } from 'primeng/scrolltop';
import { HeaderComponent } from './components/header/header.component';
import { CtaContactComponent } from './components/cta-contact/cta-contact.component';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

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
    private translate: TranslateService,
    private router: Router
  ) {

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

    // LANGUAGE MANAGEMENT
    // ===================

    this.translate.addLangs(['fr', 'en', 'nl']);

    if (isPlatformBrowser(this.platform)) { 

      const storedLang = localStorage.getItem('language');
      this.translate.setDefaultLang('fr');
  
      if (storedLang) {
        this.translate.use(storedLang);
      } 
      else {  
        const browserLang = this.translate.getBrowserLang();
        const defaultLang = browserLang?.match(/en|fr|nl/) ? browserLang : 'fr';

        this.translate.use(defaultLang);
        localStorage.setItem('language', defaultLang);
      }
    }
  }
}
