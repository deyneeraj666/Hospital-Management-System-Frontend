import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PmsService {
  dbEmails: string[] = [
    "john@gmail.com",
    "john1@gmail.com",
    "john2@gmail.com",
    "john3@gmail.com",
  ];
  constructor() { }

  verifyEmail(email: string) {
    return this.dbEmails.includes(email);
  }
}
