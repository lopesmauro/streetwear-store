import { Component, ElementRef, viewChild } from '@angular/core';
import { Icon } from '../../../icon';

@Component({
  selector: 'app-help-dialog',
  imports: [Icon],
  templateUrl: './help-dialog.html',
})
export class HelpDialog {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  open(): void {
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }
}
