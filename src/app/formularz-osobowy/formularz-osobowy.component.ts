// komponent umożliwia użytkownikowi zarezerwowanie wizyty

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatePipe } from '@angular/common';
import Links from '../../Links';

// klasa barber zawiera informacje o wybranym barberze
export class Barber {
  id_barbera: number | undefined
  imie: string | undefined
  wartosc_doswiadczenia: number | undefined
}

// klasa wizyta zawiera informacje o wybranym rodzaju wizyty
export class Wizyta {
  id_rodzaju: number | undefined
  nazwa_rodzaju: string | undefined
  koszt_rodzaju: number | undefined
}

@Component({
  selector: 'app-formularz-osobowy',
  templateUrl: './formularz-osobowy.component.html',
  styleUrl: './formularz-osobowy.component.sass'
})
export class FormularzOsobowyComponent {

  hours: string[] = [];
  selectedDate: string | undefined;
  selectedHour: string | undefined;

  rodzajeWizyt: string[] = [];
  barbers: string[] = [];
  wybranaWizyta: string | undefined;
  wybranyBarber: string | undefined;
  barber: Barber = new Barber();
  wizyta: Wizyta = new Wizyta();
  cena: number | undefined;
  czyZajetyTermin: boolean = false;


  // na start komponent generuje do SELECT godziny, rodzaje wizyt oraz barberów
  constructor(private authService: AuthService, private datePipe: DatePipe) {
    this.generateHours();
    this.setRodzajeWizyt();
    this.setBarber();
  };


  // gettery pobierają imie i nazwisko do wyświetlenia na stronie
  get imie(): string | undefined {
    return this.authService.imie;
  }

  get nazwisko(): string | undefined {
    return this.authService.nazwisko;
  }

  // metoda ustala dzisiejszą datę jako najwcześniejszą, którą może użytkownik wybrać
  setMinDate(): string {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2,'0');
    const mm = String(today.getMonth() + 1).padStart(2,'0');
    const yyyy = today.getFullYear();
    const minDate = yyyy + '-' + mm + '-' + dd;
    return minDate;
  }

  // metoda gerneruje godziny w SELECT
  generateHours(): void {
    if (!this.selectedDate) return; // jeśli nie wybrano daty, to godziny nie wyświetlają się
    const currentDate = new Date(); // ustawienie dzisiejszej daty
    const currentHour = currentDate.getHours(); // i godziny
    const selectedDate = new Date(this.selectedDate); // ustalenie wybranej daty

    console.log("Dzisiejsza data: ", currentDate.setHours(0,0,0,0), " Wybrana data: ", selectedDate.setHours(0,0,0,0));

    this.hours = [];

    const maxHours = 17;

    // jeśli wybrana data  jest datą dzisiejszą to generują się tylko godziny po aktualnej godzinie
    if (currentDate.setHours(0,0,0,0) === selectedDate.setHours(0,0,0,0)) {
      for (let hour = currentHour + 1; hour <= maxHours; hour++) {
        const fHour = this.datePipe.transform(new Date(0,0,0,hour), 'HH:mm');
        if (fHour) {
          this.hours.push(fHour);
        }
      }
      // jeśli wybrano inny dzień to generują się wszystkie możliwe godziny
    } else {
      for (let hour = 10; hour <= maxHours; hour++) {
        const fHour = this.datePipe.transform(new Date(0,0,0, hour), "HH:mm");
        if (fHour) {
          this.hours.push(fHour);
        }
      }
    }
  }

  // metoda do zarezerwowania wizyty
  async zarezerwujWizyte() {

    console.log('Data: ', this.selectedDate,' Rodzaj: ',this.wizyta.id_rodzaju,' Barber: ',this.barber.id_barbera)

    // zarezerwowanie wizyty możliwe jest dopiero po wybraniu daty, rodzaju wizyty oraz barbera
    if (this.selectedDate && this.wizyta.id_rodzaju && this.barber.id_barbera) {
      let wybranaData = this.selectedDate + " " + this.selectedHour + ":00";
      console.log('Data: ', wybranaData,' Rodzaj: ',this.wybranaWizyta,' Barber: ',this.wybranyBarber)

      // zapytanie INSERT do serwera
      let sql = `INSERT INTO wizyta (termin_wizyty, id_rodzaju, id_barbera, id_klienta) VALUES (?, ?, ?, ?)`;
      const url = `${Links.postInsert}`;
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
          body: JSON.stringify({
            sql: sql,
            params: [
              wybranaData,
              this.wizyta.id_rodzaju,
              this.barber.id_barbera,
              this.authService.id_klienta
          ]
        })
      });
      // jeśli termin jest wolny to pomyślne zarezerwowanie wizyty
      if (response.ok) {
        console.log('Pomyślny insert')
        this.authService.szczegolWizyty(this.barber.id_barbera, this.wizyta.id_rodzaju, wybranaData)

        // jeśli termin zajęty to wyświetlenie komunikatu
      } else {
        console.error('Błąd podczas pobierania danych:', response.status);
        this.czyZajetyTermin = true;
      }
    }

  }

  // metoda generuje wszystkie dostępne rodzaje wizyt
  async setRodzajeWizyt() {

    // wysłanie zapytania SELECT do serwera
    let sql = `SELECT nazwa_rodzaju FROM rodzaj_wizyty`;
    const url = `${Links.postSelect}`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
        body: JSON.stringify({
          sql: sql,
          params: []
        })
    });

    if (response.ok) {        
      let responseData = await response.json();
      console.table(responseData);
      this.rodzajeWizyt = [];
      for (let data of responseData) {    // pętla wpisuje kolejne wartości do select
        if (data.nazwa_rodzaju) {
          this.rodzajeWizyt.push(data.nazwa_rodzaju);
        }
      }
    } else {
      console.error('Błąd podczas pobierania danych:', response.status);
    }
  }

  // metoda generuje wszystkich barberów z barbershopa
  async setBarber() {

    // wysłanie zapytania SELECT do serwera
    let sql = `SELECT imie FROM barber`;
    const url = `${Links.postSelect}`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
        body: JSON.stringify({
          sql: sql,
          params: []
        })
    });

    if (response.ok) {
      let responseData = await response.json();
      console.table(responseData);
      this.barbers = [];
      for (let data of responseData) {    // pętla wpisuje wszystkie imiona barberów do select
        if (data.imie) {
          this.barbers.push(data.imie);
        }
      }
    } else {
      console.error('Błąd podczas pobierania danych:', response.status);
    }
  }

  // metoda wyświetla obliczoną cenę za wizytę
  async obliczCene() {

    // wysłanie zapytania SELECT do serwera, sprawdza ile bierze wybrany barber za pracę
    let sql = `SELECT * FROM barber WHERE imie = ?;`;
    let url = `${Links.postSelectParams}`;
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
        body: JSON.stringify({
          sql: sql,
          params: [this.wybranyBarber]
        })
    });

    console.log(response);

    if (response.ok) {
      let responseData = await response.json();
      console.table(responseData);
      this.barber = new Barber();             // zapisanie wybranego barbera
      for (let data of responseData) {
        if (data) {
          this.barber.imie = data.imie;
          this.barber.id_barbera = data.id_barbera;
          this.barber.wartosc_doswiadczenia = data.wartosc_doswiadczenia;
        }
      }

    } else {
      console.error('Błąd podczas pobierania danych:', response.status);
    }

    // wysłanie zapytania SELECT do serwera, sprawdza bazowy koszt danego rodzaju wizyty
    sql = `SELECT * FROM rodzaj_wizyty WHERE nazwa_rodzaju = ?;`;
    url = `${Links.postSelectParams}`;
    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
        body: JSON.stringify({
          sql: sql,
          params: [this.wybranaWizyta]
        })
    });

    if (response.ok) {
      let responseData = await response.json();
      this.wizyta = new Wizyta();               // zapisanie wybranej wizyty
      for (let data of responseData) {
        if (data) {
          this.wizyta.id_rodzaju = data.id_rodzaju;
          this.wizyta.nazwa_rodzaju = data.nazwa_rodzaju;
          this.wizyta.koszt_rodzaju = data.koszt_rodzaju;
        }
      }

      // jeśli wybrano barbera i wizytę to obliczana jest końcowa cena i wyświetlana na stronie
      if (this.barber.wartosc_doswiadczenia && this.wizyta.koszt_rodzaju) {
        this.cena = this.barber.wartosc_doswiadczenia * this.wizyta.koszt_rodzaju;
      }
    } else {
      console.error('Błąd podczas pobierania danych:', response.status);
      // Obsługa błędów w przypadku niepowodzenia zapytania
    }
  }

  // metoda służy do wylogowania użytkownika
  wyloguj() {
    this.authService.wyloguj();
  }

}
