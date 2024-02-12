// komponent umożliwia nowemu użytkownikowi zarejestrowanie się do serwisu, w celu zapamietania danych w bazie danych

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import Links from '../../Links';
import { MatDialog } from '@angular/material/dialog';

// klasa User przechowuje dane o utworzonym użytkowniku
export class User {
  email: string | undefined;
  password: string | undefined;
  imie: string | undefined;
  nazwisko: string | undefined;
  id_klienta: number | undefined;
}

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.sass'
})
export class RegisterComponentComponent {

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  userData: User = new User();
  bladRejestracji: boolean = false;

  // getter sprawdza czy nie ma błędu w podanych danych
  get czyBladRejestracji(): boolean {
    console.log(this.bladRejestracji)
    return this.bladRejestracji;
  }

  // metoda wywołana po przycisku rejestruje użytkownika
  async zarejestruj() {

  // wysłanie zapytania do serwera
    let sql = `INSERT INTO klient (email, haslo, imie, nazwisko) VALUES (?, ?, ?, ?)`;
    const url = `${Links.postInsert}`;
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
            this.userData.imie,
            this.userData.nazwisko
          ]
        })
    });
    if (response.ok) {                                  // jeśli poprawnie wprowadzono dane
      let responseData = await response.json();         // to zapisanie wprowadzonych danych w aplikacji
      this.userData.id_klienta = responseData.insertId;
      this.authService.register(this.userData);

      this.dialog.closeAll();

    } else {
      console.error('Błąd podczas pobierania danych:', response.status);  // jesli błąd we wprowadzonych danych
      this.bladRejestracji = true;                                        // to wyświetlenie komunikatu
    }
    console.log(this.authService.czyZalogowany);
  }

}
