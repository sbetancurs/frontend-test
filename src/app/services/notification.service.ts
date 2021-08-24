import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class NotificationService {
  private subject = new Subject<any>();

  sendNotification(notification: string) {
    this.subject.next({ text: notification });
  }

  clearNotification() {
    this.subject.next();
  }

  getNotification(): Observable<any> {
    return this.subject.asObservable();
  }
}
