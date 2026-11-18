import { Component, input } from '@angular/core';

const paths = {
  search: 'm21 21-4.4-4.4 M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  bag: 'M5 7h14l1 14H4L5 7Z M9 8V6a3 3 0 0 1 6 0v2',
  heart:
    'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  arrow: 'M4 12h16 M14 6l6 6-6 6',
  close: 'm6 6 12 12 M6 18 18 6',
  menu: 'M4 7h16 M4 12h16 M4 17h16',
  truck:
    'M1 4h13v13H1Z M14 8h4l4 5v4h-8 M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4 M18 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4',
  return: 'M4 10a8 8 0 1 1 1 8 M4 4v6h6',
  sun: 'M12 2v2 M12 20v2 M2 12h2 M20 12h2 M5 5l1.5 1.5 M17.5 17.5 19 19 M5 19l1.5-1.5 M17.5 6.5 19 5 M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  check: 'm5 12 4 4L19 6',
  minus: 'M5 12h14',
  plus: 'M5 12h14 M12 5v14',
};

@Component({
  selector: 'app-icon',
  template:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path [attr.d]="paths[name()]" /></svg>',
  styles:
    ':host { display: inline-flex; width: 1.35rem; height: 1.35rem; flex-shrink: 0; } svg { width: 100%; height: 100%; }',
})
export class Icon {
  readonly name = input.required<keyof typeof paths>();
  protected readonly paths = paths;
}
