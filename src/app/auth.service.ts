// Serwis przechopwuje informacje po autoryzacji użytkownika oraz dotyczące wybranej przez niego aktualnej wizyty
// dzięki serwisowo można korzystać z tych danych w każdym komponencie aplikacji

import { Injectable } from '@angular/core';
import { User } from './register-component/register-component.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    czyZalogowany: boolean = false;
    email: string | undefined;
    haslo: string | undefined;
    imie: string | undefined;
    nazwisko: string | undefined;
    id_klienta: number | undefined;
    id_rodzaju: number | undefined;
    id_barbera: number | undefined;
    data_wizyty: string | undefined;
    czyZarezerwowano: boolean = false;

    // metoda zapisuje dane użytkownika po zarejestrowaniu lub zalogowaniu
    register(userData: User) {
      this.czyZalogowany = true;
      this.email = userData.email;
      this.haslo = userData.password;
      this.nazwisko = userData.nazwisko;
      this.imie = userData.imie;
      this.id_klienta = userData.id_klienta;

      console.log(this.imie);
    }

    // metoda zapisuje dane dotyczące rezerwowanej wizyty
    szczegolWizyty(id_barbera: number, id_rodzaju: number, data_wizyty: string) {
      this.id_barbera = id_barbera;
      this.id_rodzaju = id_rodzaju;
      this.data_wizyty = data_wizyty;
      this.czyZarezerwowano = true;
    }

    // metoda zeruje wszystkie wartości dzięki czemu użytkownik może się wylogować
    wyloguj() {
      this.czyZalogowany = false;
      this.email = undefined;
      this.haslo = undefined;
      this.nazwisko = undefined;
      this.imie = undefined;
      this.id_klienta = undefined;
      this.id_barbera = undefined;
      this.id_rodzaju = undefined;
      this.data_wizyty = undefined;
      this.czyZarezerwowano = false;
    }


}
