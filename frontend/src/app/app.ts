import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartDrawer } from './core/layout/cart-drawer/cart-drawer';
import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';
import { HelpDialog } from './core/layout/help-dialog/help-dialog';
import { NotificationToast } from './core/layout/notification-toast/notification-toast';

registerLocaleData(localePt, 'pt-BR');

@Component({
  selector: 'app-root',
  imports: [CartDrawer, Footer, Header, HelpDialog, NotificationToast, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
