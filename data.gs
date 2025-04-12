function submit() {

  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var form = ss.getSheetByName("Form");
  var department=form.getRange("E14").getValue()
  var datasheet=ss.getSheetByName(department);
  var ui=SpreadsheetApp.getUi();
 if(department==""){
    ui.alert("Department field is blank. ")
    return;//to exit from this function
  }
  var response=ui.alert("Submit", "Are you sure?", 
   ui.ButtonSet.YES_NO);
 if(response==ui.Button.NO){
  return;//to exit from this function
 }
    var blankRow=datasheet.getLastRow()+1;//identify the next blank row
   
  datasheet.getRange(blankRow,1).setValue(form.getRange("E8").getValue());
  datasheet.getRange(blankRow,2).setValue(form.getRange("E10").getValue());
  datasheet.getRange(blankRow,3).setValue(form.getRange("E12").getValue());
  datasheet.getRange(blankRow,4).setValue(form.getRange("E14").getValue());
  datasheet.getRange(blankRow,5).setValue(form.getRange("E16").getValue());
  datasheet.getRange(blankRow,6).setValue(form.getRange("E18").getValue()); 


  form.getRange("E6").clearContent();
  form.getRange("E8").clearContent();
  form.getRange("E10").clearContent();
  form.getRange("E12").clearContent();
  form.getRange("E14").clearContent();
  form.getRange("E16").clearContent();
  form.getRange("E18").clearContent();

  ui.alert('New Employee Submitted. ');

}

//Function resetForm
function resetForm(){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var form=ss.getSheetByName("Form");
  var ui=SpreadsheetApp.getUi();
  var response=ui.alert("Rerset", "Do You wamt to reset the form?" , ui.ButtonSet.YES_NO);
if (response==ui.Button.NO){
    return;
}  

  form.getRange("E6").clearContent();
  form.getRange("E8").clearContent();
  form.getRange("E10").clearContent();
  form.getRange("E12").clearContent();
  form.getRange("E14").clearContent();
  form.getRange("E16").clearContent();
  form.getRange("E18").clearContent();

}

var SEARCH_COL_IDX = 0;
var RETURN_COL_IDX = 0;

function searchStr() {

  var ss  =  Spreadsheet.getActiveSpreadsheet();
  var form  = ss.getSheetByName("Form");//form shee
  var str   =  form.getRange("E6").getValue();
  ["HR","R&D","Finance","Sales"].forEach(function (s) { 
    var values = ss.getSheetByName(s).getDataRange().getValues();
  for (var i = 0; i < values.length; i++)
  {
    var row = values[i];
    if (row[SEARCH_COL_IDX] == str)
    {
      form.getRange("E8").setValue(row[0]);
      form.getRange("E10").setValue(row[1]);
      form.getRange("E12").setValue(row[2]);
      form.getRange("E14").setValue(row[3]);
      form.getRange("E16").setValue(row[4]);
      form.getRange("E18").setValue(row[5]);


      return row[RETURN_COL_IDX];

    }
  }
})
}

function updateData() {
  var SEARCH_COL_IDX = 0;
  var RETURN_COL_IDX = 0;


  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var form = ss.getSheetByName("Form");//form sheet
  var datasheet = form.getRange("E6:E6").getValues
  ()[0][0];

  ["HR", "R&D", "Finanace", "Sales"].forEach(function (s) {
    var values = ss.getSheetByName
    (s).getDataRange().getValues();

    for (var i = 0; i < values.length; i++){
      var row = values[i];
      if (row[SEARCH_COL_IDX]  ==  datasheet){
        var INT_R = i+1;

        var values1 = [[form.getRange("E8").getValue(),
                        form.getRange("E10").getValue(),
                        form.getRange("E12").getValue(),
                        form.getRange("E14").getValue(),
                        form.getRange("E16").getValue(),
                        form.getRange("E18").getValue()
        
        ]];
        ss.getSheetByName(s).getRange(INT_R, 1, 1, 6).setValues(values1);
        SpreadsheetApp.getUi().alert(' "Data Updated" ');
        return row[RETURN_COL_IDX];
      }
    }
  })
}
 


 function rowDelete(){

  var ss =  SpreadsheetApp.getActiveSpreadsheet();
  var form = ss.getSheetByName("Form");//form sheet
      var ui = SpreadsheetApp.getUi();
      var response = ui.alert('Delete ?',  ui.ButtonSet.YES_NO);
  if (response == ui.Button.YES){
  var datasheet = form.getRange("E6").getValue();
   ["HR", "R&D", "Finanace", "Sales"].forEach(function (s) {
     var values = ss.getSheetByName(s).getDataRange().getValues();
   for(var i = 0; i < values.length; i++){
     var row = values[i];
     if (row[SEARCH_COL_IDX]  ==  datasheet){
      var INT_R = i+1
 ss.getSheetByName(s).deleteRow(INT_R);

     form.getRange("E6").clear();
     form.getRange("E8").clear();
     form.getRange("E10").clear();
     form.getRange("E12").clear();
     form.getRange("E14").clear();
     form.getRange("E16").clear();
     form.getRange("E18").clear();
      return row[RETURN_COL_IDX];

     }
   }
   })
  }
 }

