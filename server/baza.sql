--Baza Danych

CREATE TABLE Barber
(
  id_barbera INT NOT NULL AUTO_INCREMENT,
  imie VARCHAR(20) NOT NULL,
  wartosc_doswiadczenia FLOAT NOT NULL,
  PRIMARY KEY (id_barbera)
);

INSERT INTO Barber (id_barbera, imie, wartosc_doswiadczenia)
VALUES
(1, 'Kamil', 1.2),
(2, 'Patryk', 1.6),
(3, 'Zuzanna', 1.8);


CREATE TABLE Rodzaj_wizyty
(
  id_rodzaju INT NOT NULL AUTO_INCREMENT,
  nazwa_rodzaju VARCHAR(15) NOT NULL,
  koszt_rodzaju INT NOT NULL,
  PRIMARY KEY (id_rodzaju)
);

INSERT INTO Rodzaj_wizyty (id_rodzaju, nazwa_rodzaju, koszt_rodzaju)
VALUES
(1, 'Włosy', 80),
(2, 'Broda', 50),
(3, 'Włosy+Broda', 130),
(4, 'Depilacja', 50),
(5, 'Brwi', 30),
(6, 'Maska na Twarz', 20);

CREATE TABLE Klient
(
  imie VARCHAR(20) NOT NULL,
  nazwisko VARCHAR(30) NOT NULL,
  id_klienta INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(40) NOT NULL,
  haslo VARCHAR(30) NOT NULL,
  PRIMARY KEY (id_klienta)
);

CREATE TABLE Wizyta
(
  termin_wizyty DATETIME NOT NULL,
  id_rodzaju INT NOT NULL,
  id_barbera INT NOT NULL,
  id_klienta INT NOT NULL,
  PRIMARY KEY (termin_wizyty, id_barbera),
  FOREIGN KEY (id_rodzaju) REFERENCES Rodzaj_wizyty(id_rodzaju),
  FOREIGN KEY (id_barbera) REFERENCES Barber(id_barbera),
  FOREIGN KEY (id_klienta) REFERENCES Klient(id_klienta)
);

