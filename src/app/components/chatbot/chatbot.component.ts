import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';

interface Product { name: string; url: string; image: string; }
interface ChatMessage {
  role: 'bot' | 'user';
  html?: string;
  cards?: Product[];
  typing?: boolean;
  options?: Option[];
  optionsFull?: boolean;
}
interface Option { label: string; value: any; }

@Component({
  standalone: true,
  selector: 'cashbox-chatbot',
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('body') private bodyRef?: ElementRef<HTMLDivElement>;

  readonly whatsappNumber = environment.whatsappNumber;

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private t(key: string, params?: object): string {
    return this.translate.instant(key, params);
  }

  // ---------- Catalogue ----------
  private readonly products: Record<string, Product> = {
    s:   { name: 'CashBox S',           url: 'https://cashconcept.be/product/292af756-288c-4942-a6f3-c7d69f889545', image: 'https://cashconcept.be/assets/products/CashBox%20S%20-%20New/CashBox%20S_front.png' },
    b3:  { name: 'CashBox 3',           url: 'https://cashconcept.be/product/9c9172aa-d80e-4f84-a620-7dcf1c54e869', image: 'https://cashconcept.be/assets/products/CashBox%203/CashBox%203_front.png' },
    b5:  { name: 'CashBox 5',           url: 'https://cashconcept.be/product/597cb73c-6a8e-499e-8f5e-4fccb55879cc', image: 'https://cashconcept.be/assets/products/CashBox%205/CashBox%205_front.png' },
    b5v: { name: 'CashBox 5+ Vertical', url: 'https://cashconcept.be/product/65648d9c-2896-48e8-a6fd-7820b9627d80', image: 'https://cashconcept.be/assets/products/CashBox%205+/CashBox%205+_front.png' },
    pro: { name: 'CashBox Pro',         url: 'https://cashconcept.be/product/a91ecc97-f2a0-47e3-820a-7a91cf3f619a', image: 'https://cashconcept.be/assets/products/CashBox%20Pro/CashBox%20Pro_front.png' },
    b7:  { name: 'CashBox 7',           url: 'https://cashconcept.be/product/50a28d9c-2896-48e8-a6fd-7820b95t4d8n', image: 'https://cashconcept.be/assets/products/CashBox%207%20-%20New/CashBox%207_front.png' },
    b7p: { name: 'CashBox 7+',          url: 'https://cashconcept.be/product/65648d9c-2896-48e8-a6fd-7820b9627f70', image: 'https://cashconcept.be/assets/products/CashBox%207+/CashBox%207+_front.png' },
    b7v: { name: 'CashBox 7+ Vertical', url: 'https://cashconcept.be/product/65648d9c-2896-48e8-a6fd-7820b962a4f2', image: 'https://cashconcept.be/assets/products/CashBox%207+%20Vertical/CashBox%207+%20Vertical.png' },
    b8:  { name: 'CashBox 8',           url: 'https://cashconcept.be/product/65648d9c-2896-48e8-a6fd-7820b9627f10', image: 'https://cashconcept.be/assets/products/CashBox%208/CashBox%208_front.png' },
    b8p: { name: 'CashBox 8+',          url: 'https://cashconcept.be/product/65648d9c-2896-48e8-a6fd-7820b962a5d1', image: 'https://cashconcept.be/assets/products/CashBox%208+/CashBox%208+_front.png' }
  };

  private readonly amounts: { labelKey: string; models: string[] }[] = [
    { labelKey: 'chatbot.amount1', models: ['s'] },
    { labelKey: 'chatbot.amount2', models: ['b3'] },
    { labelKey: 'chatbot.amount3', models: ['b5', 'b5v'] },
    { labelKey: 'chatbot.amount4', models: ['pro'] },
    { labelKey: 'chatbot.amount5', models: ['b7', 'b7p', 'b7v'] },
    { labelKey: 'chatbot.amount6', models: ['b8', 'b8p'] }
  ];

  private readonly establishmentKeys = [
    'chatbot.estBakery', 'chatbot.estButcher', 'chatbot.estSnack', 'chatbot.estGrocery',
    'chatbot.estHoreca', 'chatbot.estHair', 'chatbot.estWholesale', 'chatbot.estOther'
  ];

  // ---------- State ----------
  open = false;
  messages: ChatMessage[] = [];
  footMode: 'form' | 'none' = 'none';
  progress = 0;
  private readonly totalSteps = 4;
  private pickHandler: ((o: Option) => void) | null = null;
  sending = false;

  // collected answers
  answers: any = {};

  // contact form model
  form = { fullname: '', phone: '', email: '' };
  formError = '';

  private shouldScroll = false;

  showTeaser = false;
  private teaserDismissed = false;

  private savedScrollY = 0;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        if (!this.open && !this.teaserDismissed) {
          this.showTeaser = true;
        }
      }, 1500);
    }
  }

  ngAfterViewChecked(): void {
    if (this.shouldScroll && this.bodyRef) {
      this.bodyRef.nativeElement.scrollTop = this.bodyRef.nativeElement.scrollHeight;
      this.shouldScroll = false;
    }
  }

  ngOnDestroy(): void {
    this.lockScroll(false);
  }

  private lockScroll(lock: boolean): void {
    if (!isPlatformBrowser(this.platformId)) { return; }
    const body = document.body;
    if (lock) {
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      this.savedScrollY = window.scrollY;
      body.style.position = 'fixed';
      body.style.top = `-${this.savedScrollY}px`;
      body.style.width = '100%';
      if (sbw > 0) { body.style.paddingRight = `${sbw}px`; }
    } else {
      body.style.position = '';
      body.style.top = '';
      body.style.width = '';
      body.style.paddingRight = '';
      window.scrollTo(0, this.savedScrollY);
    }
  }

  openFromTeaser(): void {
    this.showTeaser = false;
    this.teaserDismissed = true;
    if (!this.open) { this.toggle(); }
  }

  dismissTeaser(event?: Event): void {
    event?.stopPropagation();
    this.showTeaser = false;
    this.teaserDismissed = true;
  }

  // ---------- Open / close ----------
  toggle(): void {
    this.showTeaser = false;
    this.teaserDismissed = true;
    this.open = !this.open;
    this.lockScroll(this.open);
    if (this.open && this.messages.length === 0) { this.start(); }
  }

  get progressWidth(): string {
    return Math.min(100, (this.progress / this.totalSteps) * 100) + '%';
  }

  // ---------- Flow ----------
  start(): void {
    this.answers = {};
    this.messages = [];
    this.footMode = 'none';
    this.progress = 0;
    this.sending = false;
    this.pickHandler = null;
    this.form = { fullname: '', phone: '', email: '' };
    this.formError = '';
    this.bot(this.t('chatbot.welcome'), () => this.askEstablishmentYesNo(), 500);
  }

  private askEstablishmentYesNo(): void {
    this.bot(this.t('chatbot.askEstablishment'), () => {
      this.showOptions(
        [{ label: this.t('chatbot.yes'), value: true }, { label: this.t('chatbot.no'), value: false }],
        (o) => {
          this.answers.hasEstablishment = o.value;
          this.user(o.label);
          this.progress = 1;
          this.askType();
        });
    });
  }

  private askType(): void {
    const q = this.answers.hasEstablishment ? this.t('chatbot.askTypeExisting') : this.t('chatbot.askTypeNew');
    this.bot(q, () => {
      this.showOptions(
        this.establishmentKeys.map(k => ({ label: this.t(k), value: this.t(k) })),
        (o) => {
          this.answers.type = o.value;
          this.user(o.label);
          this.progress = 2;
          this.askAmount();
        });
    });
  }

  private askAmount(): void {
    this.bot(this.t('chatbot.askAmount'), () => {
      this.showOptions(
        this.amounts.map((a, i) => ({ label: this.t(a.labelKey), value: i })),
        (o) => {
          this.answers.amount = o.value;
          this.user(o.label);
          this.progress = 3;
          this.recommend();
        },
        true
      );
    });
  }

  private recommend(): void {
    const bucket = this.amounts[this.answers.amount];
    const intro = this.t(bucket.models.length > 1 ? 'chatbot.recommendPlural' : 'chatbot.recommendSingle');
    const cards = bucket.models.map(k => this.products[k]);
    this.botWithCards(intro, cards, () => this.askRenting(), 850);
  }

  private askRenting(): void {
    this.bot(this.t('chatbot.askRenting'), () => {
      this.showOptions(
        [{ label: this.t('chatbot.yes'), value: true }, { label: this.t('chatbot.no'), value: false }],
        (o) => {
          this.answers.renting = o.value;
          this.user(o.label);
          this.progress = 4;
          this.coordsForm(o.value ? 'chatbot.coordsFormRenting' : 'chatbot.coordsForm');
        });
    });
  }

  // Affiche le formulaire de coordonnées
  private coordsForm(msgKey: string): void {
    this.footMode = 'none';
    this.bot(this.t(msgKey), () => { this.footMode = 'form'; this.shouldScroll = true; }, 800);
  }

  // ---------- Envoi de la demande ----------
  sendByEmail(): void {
    if (this.sending || !this.captureForm()) { return; }

    this.user(this.t('chatbot.emailSent'));
    this.footMode = 'none';
    this.sending = true;

    this.http.post(environment.endpointChatBot, this.buildLeadPayload()).subscribe({
      next: () => {
        this.sending = false;
        this.finishLead();
      },
      error: () => {
        this.sending = false;
        this.bot(this.t('chatbot.emailError'), () => { this.footMode = 'form'; this.shouldScroll = true; }, 600);
      }
    });
  }

  sendByWhatsapp(): void {
    if (!this.captureForm()) { return; }
    window.open(this.whatsappLink(), '_blank', 'noopener');
    this.user(this.t('chatbot.whatsappSent'));
    this.finishLead();
  }

  // Valide le formulaire et enregistre les coordonnées dans answers
  private captureForm(): boolean {
    const f = this.form;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim());
    if (!f.fullname.trim() || !f.phone.trim() || !emailOk) {
      this.formError = this.t('chatbot.formError');
      return false;
    }
    this.formError = '';
    this.answers.contact = { ...f };
    return true;
  }

  // Charge utile envoyée à l'API (modèle ChatbotLead côté backend)
  private buildLeadPayload() {
    const a = this.answers;
    const bucket = this.amounts[a.amount];
    const c = a.contact;
    return {
      fullName: c.fullname,
      company: '',
      phone: c.phone,
      email: c.email,
      vat: '',
      hasEstablishment: !!a.hasEstablishment,
      type: a.type ?? '-',
      amount: bucket ? this.t(bucket.labelKey) : '-',
      models: bucket ? bucket.models.map((k: string) => this.products[k].name).join(', ') : '-',
      renting: !!a.renting
    };
  }

  private finishLead(): void {
    this.footMode = 'none';
    this.bot(
      this.t('chatbot.finish'),
      () => this.showOptions([{ label: this.t('chatbot.restartSim'), value: 'restart' }], () => this.start(), true),
      800
    );
  }

  // ---------- low-level rendering ----------
  pick(o: Option): void {
    const h = this.pickHandler;
    this.messages.forEach(m => { m.options = undefined; });
    this.pickHandler = null;
    if (h) { h(o); }
  }

  private showOptions(opts: Option[], handler: (o: Option) => void, full = false): void {
    const last = this.messages[this.messages.length - 1];
    if (last && last.role === 'bot' && !last.typing) {
      last.options = opts;
      last.optionsFull = full;
    }
    this.pickHandler = handler;
    this.shouldScroll = true;
  }

  private user(html: string): void {
    this.messages.push({ role: 'user', html });
    this.shouldScroll = true;
  }

  private bot(html: string, cb?: () => void, delay = 750): void {
    this.pushTyping();
    setTimeout(() => {
      this.popTyping();
      this.messages.push({ role: 'bot', html });
      this.shouldScroll = true;
      if (cb) { cb(); }
    }, delay);
  }

  private botWithCards(html: string, cards: Product[], cb?: () => void, delay = 750): void {
    this.pushTyping();
    setTimeout(() => {
      this.popTyping();
      this.messages.push({ role: 'bot', html, cards });
      this.shouldScroll = true;
      if (cb) { cb(); }
    }, delay);
  }

  private pushTyping(): void {
    this.messages.push({ role: 'bot', typing: true });
    this.footMode = 'none';
    this.shouldScroll = true;
  }
  private popTyping(): void {
    const i = this.messages.findIndex(m => m.typing);
    if (i > -1) { this.messages.splice(i, 1); }
  }

  onImgError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }

  // Récapitulatif texte pour le message WhatsApp
  private buildRecapText(): string {
    const a = this.answers;
    const bucket = this.amounts[a.amount];
    const models = bucket ? bucket.models.map(k => this.products[k].name).join(', ') : '-';
    const c = a.contact;
    const yes = this.t('chatbot.yes');
    const no = this.t('chatbot.no');

    const lines = [
      this.t('chatbot.recapIntro'),
      '',
      `• ${this.t('chatbot.recapHasEstablishment')} ${a.hasEstablishment ? yes : no}`,
      `• ${this.t('chatbot.recapType')} ${a.type ?? '-'}`,
      `• ${this.t('chatbot.recapAmount')} ${bucket ? this.t(bucket.labelKey) : '-'}`,
      `• ${this.t('chatbot.recapModels')} ${models}`,
      `• ${this.t('chatbot.recapRenting')} ${a.renting ? yes : no}`
    ];

    if (c) {
      lines.push(
        '',
        this.t('chatbot.recapContact'),
        `• ${this.t('chatbot.recapFullname')} ${c.fullname}`,
        `• ${this.t('chatbot.recapPhone')} ${c.phone}`,
        `• ${this.t('chatbot.recapEmail')} ${c.email}`
      );
    }
    return lines.join('\n');
  }

  private whatsappLink(): string {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.buildRecapText())}`;
  }
}