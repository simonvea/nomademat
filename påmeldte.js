

//finner antall påmeldte
function findNumberAttending(kundenavn) {
  
  var attending = [[0,0],[0,0],[0,0],[0,0],[0,0]];
  var comments = [];
  var ukedager = ["mandag","tirsdag","onsdag","torsdag","fredag"];
  var gjester = ["Én gjest", "To gjester", "Tre gjester", "Fire gjester"];
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(kundenavn);
  var data = sheet.getDataRange().getValues(); //data[row][column]
  
  
  //finne start rad å loope fra
  var start = 1;
  var prevFriday = new Date();
  prevFriday.setDate(prevFriday.getDate() - (prevFriday.getDay() + 2) % 7);
  prevFriday.setHours(7,0);
  
  for (var i = 0; i < data.length; i++) {
    if(data[i][0] >= prevFriday) {
      start = i;
      break;
    }; 
  };
  
  // gå igjennom påmeldingskolonne, lagre antall påmeldte
  for (var i = start; i < data.length; i++) {
    for (var dag = 0; dag < ukedager.length; dag++) {
      var dagReg = new RegExp(ukedager[dag], "i");
      if(dagReg.test(data[i][1])) {attending[dag][0]++}
    };
  };
  
  // gå igjennom resterende, kolonner og lagre eventuelle påmeldte gjester
  for (var i = 2; i < data[0].length; i++) { //gå igjennom hver kolonne etter påmeldte
    //finne hvilken dag vi er i
    var dagIndex = 5;
    for (var dag = 0; dag < ukedager.length; dag++) {
      var dagReg = new RegExp(ukedager[dag], "i");
      if(dagReg.test(data[0][i])) {
        dagIndex = dag;
        break;
      };
    };
    
    if(dagIndex < 5) {
    //gå igjennom hver rad etter start
      for (var j = start; j < data.length; j++) { 
        //sjekker cellen for antall påmeldte og legger evt. til attending på riktig dag
        for (var gjest = 0; gjest < gjester.length; gjest++) {
          var gjestReg = new RegExp(gjester[gjest], "i");
          if(gjestReg.test(data[j][i])) {attending[dagIndex][1] += gjest + 1};
        };
      };        
    } else { //lagre evt. kommentarer
      for (var j = start; j < data.length; j++) {
        if (data[j][i] != "") {comments.push(data[j][i])};
      }
    };    
  };
  
  //returnerer et array med antall påmeldte og gjester per dag [ansatte,gjester], der mandag = [0], tirsdag = [1], osv - NB! siste array er kommentarer
  attending.push(comments);
  return attending
};

function updateAttending() {
 var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Fremside");
 var data = sheet.getDataRange().getValues();
 var ukedager = ["mandag","tirsdag","onsdag","torsdag","fredag"];
  
 var idag = new Date();
 var oppdatert = sheet.getRange("C2:C2");
 oppdatert.setValue(idag);
  
 //finner raden med kundenavn, kolonne er "B"[1], etter rad 5 ([4])
  for (var row = 5; row < data.length; row++) {
    
    var kundenavn = data[row][1];
    var attending = findNumberAttending(kundenavn);
    var comments = attending[attending.length-1].join("; ");
    var temp = [];
    var newRow = row + 1;
    var attendingRange = "C" + newRow + ":L" + newRow;
    
    for (var i = 0; i < attending.length -1; i++) {
      temp = temp.concat(attending[i]);
    }
    //påmeldte
    var attendingRow = sheet.getRange(attendingRange);
    attendingRow.setValues([temp]);
    //kommentarer
    var commentsRange = sheet.getRange("M"+newRow+":M"+newRow)
    commentsRange.setValue(comments);
    
  } 
  
}


        
function testFunction() {
  
  Logger.log(findNumberAttending("Oslotre"));
  
}
