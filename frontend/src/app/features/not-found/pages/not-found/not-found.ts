import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../../../icon';

@Component({
  selector: 'app-not-found',
  imports: [Icon, RouterLink],
  templateUrl: './not-found.html',
})
export class NotFound {}
