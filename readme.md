Denne mappen inneholder skript og lignende som jeg har laget for Nomademat A/S

Skriptene epostutsending og påmeldte er skrevet i googlescripts (.gs) og benytter seg av google sin developer API.
Epostutsening sender automatisk ut en epost med spørreskjema, lagret som en egen fil med kundenavn.html. Det er meningen å bruke dette ved hjelp av google sine egne triggere slik at scriptet blir kjørt en gang i uken. Epostene hentes fra eget tilkoblet sheet.

Påmeldte kjøres i spreadsheet som lagrer svarene fra spørreskjema. findNumberAttending(kundenavn) går igjennom hvert enkelt sheet (fra hvert spørreskjema) og finner antall påmeldte siden forrige fredag kl 7. Den finner også eventuelle påmeldte gjester og kommentarer. Dette skrives/visualiseres på fremsiden (eget sheet) i spreadsheetet ved hjelp av updateAttending() som også finner navnet på kundene basert på fremsiden.