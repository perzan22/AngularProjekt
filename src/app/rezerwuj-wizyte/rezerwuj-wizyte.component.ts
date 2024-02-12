// komponent otwiera ekrany logowania i rejestracji, ale również wywołuje metody get do sprawdzenia jakie wyświetlać treści na stronie

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponentComponent } from '../register-component/register-component.component';
import { LoginComponentComponent } from '../login-component/login-component.component';

@Component({
  selector: 'app-rezerwuj-wizyte',
  templateUrl: './rezerwuj-wizyte.component.html',
  styleUrl: './rezerwuj-wizyte.component.sass'
})
export class RezerwujWizyteComponent {
  
  constructor(private authService: AuthService,public dialog: MatDialog) {}


  // metoda otwiera okno rejestracji, po poprawnej rejestracji zamyka się okno
  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // metoda otwiera okno logowania, po poprawnej rejestracji zamyka się okno
  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  // gettery sprawdzają, które dane zostały już podane, aby wyświetlać odpowiednie treści
  get czyZalogowany(): boolean {
    return this.authService.czyZalogowany;
  }

  get imie(): string | undefined {
    return this.authService.imie;
  }

  get nazwisko(): string | undefined {
    return this.authService.nazwisko;
  }

  get czyZarezerwowano(): boolean {
    return this.authService.czyZarezerwowano;
  }

  get data_wizyty(): string | undefined {
    return this.authService.data_wizyty;
  }

  // metoda służy wylogowaniu użytkownika
  wyloguj() {
    this.authService.wyloguj();
  }
}
