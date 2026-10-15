WERWOLF – TAGRUNDEN-HINTERGRUND FIX v29

URSACHE
Die App setzt bereits die Klassen .shell.night und .shell.day. Der vorherige Fix legte tagrunde.png auf body. Der vollflaechige Pseudo-Hintergrund .shell::before lag darueber, weshalb weiterhin der bisherige Hintergrund sichtbar war. Das Mondsymbol war ausserdem in app.js fest eingetragen.

BEHOBEN
- tagrunde.png wird jetzt direkt auf .shell.day::before gesetzt.
- night-background.png bleibt fuer .shell.night unveraendert.
- Tagesbild bleibt zentriert, unverzerrt und per cover vollflaechig.
- In der Tagrunde wird oben eine Sonne angezeigt.
- In der Nachtrunde wird weiterhin der Mond angezeigt.
- tagrunde.png bleibt Bestandteil des Offline-Caches.

ZU TAUSCHEN
- index.html
- sw.js
- day-background.css
- day-background.js

ZUSAETZLICH
- tagrunde.png muss direkt im Hauptverzeichnis liegen.
- Cache-Version: werwolf-ui-v29-day-background-fix
