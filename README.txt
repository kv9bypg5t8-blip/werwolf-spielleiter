WERWOLF v31.1 - BEREINIGUNG DORFBEWOHNER-BILD

Aenderungen:
- dorfbewohner.png aus dem PWA-Cache entfernt.
- Passive Dorfbewohner benoetigen kein Rollenaktionsbild.
- Cache-Version auf werwolf-consolidated-v31-1 erhoeht.

ZU ERSETZEN:
- sw.js

APP.JS:
In v31 ist zusaetzlich die unnoetige Bildzuordnung Dorfbewohner:'dorfbewohner.png' enthalten. Fuer einen vollstaendig bereinigten Stand diese Zuordnung bei der naechsten app.js-Fassung entfernen. Sie wird im aktiven Spiel nicht aufgerufen; entscheidend fuer die PWA-Installation ist die Entfernung aus sw.js.
