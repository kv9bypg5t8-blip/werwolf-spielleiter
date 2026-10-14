WERWOLF – KONSOLIDIERT KORRIGIERT

Der Fehler der ersten konsolidierten Ausgabe wurde korrigiert:
- Nach einer Rollenzuweisung wechselt die App direkt zur Rollenaktion.
- Der Rolleninhaber bleibt gold hervorgehoben und wird nicht wie ein ungültiger Spieler ausgegraut.
- Bereits vergebene Sonderrollen können weiterhin nicht doppelt vergeben werden.
- Amor: eine Person zuweisen, danach genau zwei andere Verliebte wählen.
- Werwolf: mehrere Werwölfe wählen, bestätigen, danach genau ein Opfer wählen und bestätigen.

Keine Hotfix-Dateien. Die gesamte Logik liegt in app.js.

GitHub: Alten Repository-Inhalt durch alle Dateien dieses Pakets ersetzen. Alte amorfix.js, rolefix.js, newgame.js und hotfix.css löschen. Danach Commit, Seite neu laden und die PWA bei Bedarf neu installieren.
