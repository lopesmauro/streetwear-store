import { Component, inject } from '@angular/core';
import { NotificationService } from '../../notifications/notification.service';

@Component({
  selector: 'app-notification-toast',
  templateUrl: './notification-toast.html',
})
export class NotificationToast {
  protected readonly notifications = inject(NotificationService);
}
