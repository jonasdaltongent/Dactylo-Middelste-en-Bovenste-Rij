# Dactylo · 4ORLO — oefenen: de middelste en de bovenste rij

Een oefenpagina voor het Dactylo-uur van **4ORLOa en 4ORLOb**. De leerlingen oefenen op hun eigen
computer de middelste en de bovenste rij samen. Oefening 7 is **de test** (test 3 in de typtool),
zodat ze die al kunnen inoefenen.

- **Lespagina:** <https://jonasdaltongent.github.io/Dactylo-Middelste-en-Bovenste-Rij/>
- **Repository:** <https://github.com/jonasdaltongent/Dactylo-Middelste-en-Bovenste-Rij>
- **De typtool (voor de test):** <https://jonasdaltongent.github.io/Dactylo-4ORLO/>, test 3

## Planning (Jonas, 10-11-2026)

| Wanneer | Wat |
|---|---|
| Dactylo-uur di 17-11 (4ORLOb uur 5, 4ORLOa uur 7) | oefenen op deze pagina |
| Dactylo-uur di 24-11 | test 3 in de typtool, een leerling na de andere |

## De oefeningen

| Nr | Oefening | Wat |
|---|---|---|
| 1 | De middelste rij | opwarmen: `fff jjj ddd …` |
| 2 | De bovenste rij | opwarmen: `rrr uuu eee …` |
| 3 | Op en neer | elke vinger van de middelste naar de bovenste rij en terug: `frf juj ded kik szs lol qaq mpm` |
| 4 | Korte woorden | `jas tas kip zus muis …` |
| 5 | Langere woorden | `tafel stoel fiets …` |
| 6 | Zinnen | `de kat zit op de stoel …` |
| 7 | De test | dezelfde tekst, 60 seconden en drempels als test 3 in de typtool |

Oefening 1–6 hebben geen tijdslimiet: de klok telt op tot de tekst af is. Daarna ziet de leerling de
snelheid, de nauwkeurigheid en de toetsen met de meeste fouten, met de drempels van de test ernaast.
Oefening 7 loopt 60 seconden (start bij de eerste toets) en toont de punten voor snelheid en
nauwkeurigheid (samen 8), en de zes techniekvragen (12 punten) als lijstje om zichzelf na te kijken.

Elke knop bovenaan toont het beste resultaat van die oefening. Dat staat alleen in de browser van
de leerling (`localStorage`): geen namen, geen punten bij de leerkracht, niets op GitHub.

## Aanpassen

De oefeningen staan in `js/oefeningen.js`. Alleen kleine letters en toetsen van de twee rijen
(a z e r t y u i o p · q s d f g h j k l m). **Oefening 7 en test 3 in
`2026-2027/Dactylo - Typetest 4ORLO/js/testen.js` hebben dezelfde tekst, tijd en drempels**: pas je
de ene aan, pas dan ook de andere aan.

Opmaak en lettertypes komen uit de typtool (`css/style.css`, onderaan het blok *Oefenpagina*).

---

*Gemaakt op 10 november 2026. Getest in Chrome met gesimuleerde aanslagen: alle zeven oefeningen,
de klok van de test (afloop na de tijd), de QWERTY-melding, het beste resultaat, op 1280×650 en op
een smal scherm (375 px, zonder horizontaal scrollen). Nog niet met een klas gebruikt.*
