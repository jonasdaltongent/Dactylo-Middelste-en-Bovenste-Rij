/* ==========================================================================
   Dactylo · 4ORLO — de oefeningen op de middelste en de bovenste rij
   --------------------------------------------------------------------------
   Pas hier de oefeningen aan. Alleen kleine letters en toetsen van de twee
   rijen (a z e r t y u i o p · q s d f g h j k l m), woorden gescheiden door
   één spatie.

   Oefening 7 is de test: dezelfde tekst, tijd en drempels als test 3 in de
   typtool (2026-2027/Dactylo - Typetest 4ORLO/js/testen.js). Pas je de ene
   aan, pas dan ook de andere aan.
   ========================================================================== */
window.OEFENEN = {
  opslag: 'dactylo_oefenen_middel_boven_v1',

  oefeningen: [
    {
      titel: 'De middelste rij',
      uitleg: 'Opwarmen: je vingers liggen op hun plek.',
      toetsen: 'qsdfghjklm',
      tekst: 'fff jjj ddd kkk sss lll qqq mmm ggg hhh fjf dkd sls qmq fgf jhj sdf jkl qsdf jklm gfds hjkl'
    },
    {
      titel: 'De bovenste rij',
      uitleg: 'Na elke toets gaat je vinger terug naar de middelste rij.',
      toetsen: 'azertyuiop',
      tekst: 'rrr uuu eee iii zzz ooo aaa ppp ttt yyy rt yu er ui ze io az op ty re iu ez oi za po'
    },
    {
      titel: 'Op en neer',
      uitleg: 'Elke vinger gaat naar boven en terug.',
      toetsen: 'azertyuiopqsdfghjklm',
      tekst: 'frf juj ded kik szs lol qaq mpm ftf jyj fgf jhj fr ju de ki sz lo qa mp ft jy frf juj ded kik szs lol qaq mpm'
    },
    {
      titel: 'Korte woorden',
      uitleg: 'Twee rijen door elkaar.',
      toetsen: 'azertyuiopqsdfghjklm',
      tekst: 'jas tas kip zus muis melk soep deur dorp spel film kast gras lamp ijs dag hoed zeep lief geit pot yoga quiz'
    },
    {
      titel: 'Langere woorden',
      uitleg: 'Typ rustig. Juist is belangrijker dan snel.',
      toetsen: 'azertyuiopqsdfghjklm',
      tekst: 'tafel stoel fiets zomer pauze sport regel papier dokter potlood appel taart pyjama aquarium hartje regels'
    },
    {
      titel: 'Zinnen',
      uitleg: 'Spatie met je duim.',
      toetsen: 'azertyuiopqsdfghjklm',
      tekst: 'de kat zit op de stoel ik eet graag soep de juf typt de les op de tafel ligt papier hij eet frietjes met mayo de quiz is leuk'
    },
    {
      titel: 'De test',
      uitleg: 'Dit is de test. 60 seconden, de tijd start bij je eerste toets.',
      toetsen: 'azertyuiopqsdfghjklm',
      test: true,
      duur: 60,
      tekst:
        'frf juj ded kik szs lol qaq mpm ftf jyj ' +
        'fiets tafel stoel kast melk soep lamp deur dorp kip geit jas ' +
        'zomer pauze sport spel film regel papier dokter potlood taart ' +
        'de kat zit op de stoel ik eet graag soep de juf typt de les ' +
        'yoga quiz pyjama aquarium hartje ruzie hoofd zeep lief tip',
      // [minimum, punten], zoals in de typtool
      snelheid: [[8, 4], [6, 3], [4, 2], [2, 1]],
      nauwkeurigheid: [[95, 4], [90, 3], [85, 2], [80, 1]],
      // de vragen van de leerkracht bij test 3 (samen 12 punten)
      techniek: [
        'Ik kijk naar het scherm, niet naar mijn vingers. (3 punten)',
        'Ik gebruik voor elke toets de juiste vinger. (3 punten)',
        'Ik typ met twee handen: a z e r t en q s d f g links, y u i o p en h j k l m rechts. (2 punten)',
        'Mijn wijsvingers liggen op F en J, en mijn vingers komen na elke toets terug naar de middelste rij. (2 punten)',
        'Ik druk de spatiebalk in met mijn duim. (1 punt)',
        'Ik zit rechtop, met mijn polsen los van de tafel. (1 punt)'
      ]
    }
  ]
};
