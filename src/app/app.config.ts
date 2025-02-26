import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import Aura from '@primeng/themes/aura';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { provideShareButtonsOptions, SharerMethods, withConfig } from 'ngx-sharebuttons';
import { shareIcons } from 'ngx-sharebuttons/icons';
import { provideClientHydration, withEventReplay, withI18nSupport } from '@angular/platform-browser';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'environments/environment';
import { NgxSeoHelperModule } from 'ngx-seo-helper';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, `${environment.baseUrl}/assets/i18n/`, '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideTranslateService({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    importProvidersFrom(
      NgxSeoHelperModule
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    providePrimeNG({
      theme: {
          preset: Aura
      }
    }),
    provideShareButtonsOptions(
      shareIcons(),
      withConfig({
        debug: true,
        sharerMethod: SharerMethods.Anchor,
      })
    ),
    provideClientHydration(withEventReplay(), withI18nSupport())
  ]
};
