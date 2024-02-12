// komponent umozliwia użytkownikowi zalogowanie się do serwisu

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../register-component/register-component.component';
import Links from '../../Links';
import { MatDialog } from '@angular/material/dialog';

export class UserLogin {
  email: string | undefined;
  password: string | undefined;
}

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.sass'
})
export class LoginComponentComponent {

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  userData: UserLogin = new UserLogin();
  userZalogowany: User = new User();
  bladLogowania: boolean = false;

  // getter sprawdza czy błąd we wprowadzonych danych
  get czyBladLogowania(): boolean {
    console.log(this.bladLogowania)
    return this.bladLogowania;
  }

  // metoda logująca użytkownika
  async login() {

  
    // wysłanie zapytania do serwera
    let sql = `SELECT * FROM klient WHERE email = ? AND haslo = ?`;
    const url = `${Links.postSelectParams}`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
        body: JSON.stringify({
          sql: sql,
          params: [
            this.userData.email,
            this.userData.password,
          ]
        })
    });

    console.table(response)

    if (response.ok) {
      let responseData = await response.json();     // jeśli poprawnie wprowadzono dane to
      console.log(responseData)                     // zapisanie wszystkich danych użytkownika w aplikacji

      if (responseData.length !== 0) {
        this.userZalogowany.email = responseData[0].email;
        this.userZalogowany.password = responseData[0].haslo;
        this.userZalogowany.imie = responseData[0].imie;
        this.userZalogowany.nazwisko = responseData[0].nazwisko;
        this.userZalogowany.id_klienta = responseData[0].id_klienta;
        this.bladLogowania = false;
        this.authService.register(this.userZalogowany);

        this.dialog.closeAll();
      } else {
        this.bladLogowania = true;      // jeśli niepoprawnie wprowadzono dane to wyświetla komunikat
      }
    } else {
      console.error('Błąd podczas pobierania danych:', response.status);
      this.bladLogowania = true;
    }

    
    console.log(this.authService.czyZalogowany, this.authService.imie);

  }

  
}
