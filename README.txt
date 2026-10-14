WERWOLF – OVERLAYFREIES UPDATE v15

Dieses Update entfernt alle grossflaechigen transparenten Ebenen:
- kein Gradient ueber dem Nachtbild
- kein transparentes Stage-Feld
- kein Board-Hintergrund
- kein Blur oder Schatten ueber der gesamten Spielflaeche
- keine Pseudo-Overlay-Ebene

Das Nachtbild selbst bleibt unveraendert, zentriert und mit background-size: cover sichtbar.
Lokale Karten, Dialoge und Menues behalten ihre eigenen Flaechen, damit Texte lesbar bleiben.

GITHUB:
1. index.html und sw.js ersetzen.
2. overlay-free.css neu ins Hauptverzeichnis hochladen.
3. Die bestehenden Dateien styles.css, app.js, pwa.js, manifest.webmanifest, night-background.png und Icons beibehalten.
4. Commit changes.
5. GitHub-Pages-Seite einmal direkt neu laden.
6. PWA vollstaendig schliessen und erneut starten. Bei altem Cache die PWA neu installieren.
