//kan legge navn på kunde til parameterne i funksjonen, og sette det som navn på fil, f.eks sånn at funksjonen kan brukes flere ganger?

//henter epostmottakere fra googlesheet
function getEmails(kundenavn) {
  var emails = [];
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(kundenavn);
  var data = sheet.getDataRange().getValues();
  for (var i = 0; i < data.length; i++) {
    emails.push(data[i][0]);
  }
  return emails.join();
}

// sender påmeldingsepost
function sendSkjemaMail(kundenavn) {
    var toEmailAddress = getEmails(kundenavn);
    var htmlMessage = HtmlService.createHtmlOutputFromFile(kundenavn+".html").getContent();
    var subject = "[Test]Påmeldingsskjema for lunsj fra Nomademat";
    var message = "Hei,\n\nDenne meldingen er sendt av en robot. \nVennligst gi oss beskjed om noe er galt (det er meningen at det skal være et skjema her) ved å sende mail til kontakt@nomademat.no eller ved å svare på denne eposten.";
    MailApp.sendEmail(toEmailAddress, subject, message, {
      htmlBody: htmlMessage,
      //from: kontakt@nomademat.no,  (sjekk gjennom GmailApp.getAliases() hva det er mulig å sende fra)
      //bcc: toEmailAdress,   bedre det med tanke på å ikke offentliggjøre hvem det sendes til?
      name: "Nomademat",
      replyTo: "kontakt@nomademat.no"
    });
};

function sendTilKunder() {
  sendSkjemaMail("Test");
  //var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  //for (var i = 0; i < sheets.length -1; i++) {
   //sendSkjemaMail(sheets[i].getName())
  //}
}
