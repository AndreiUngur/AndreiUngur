const text_field = $('#intro_text');
function setName(){
    if(language == "EN"){
      text_field.text("This page was created by Andrei Ungur, a Software Engineering student of McGill University, using Github/HTML5/JQuery/Javascript/CSS/Boostrap/Angularjs. Click on any of the tabs above for more information.");    
    } else {
      text_field.text("Cette page a été crée par Andrei Ungur, un étudiant en Génie Logiciel à l'Université McGill, en utilisant Github/HTML5/JQuery/Javascript/CSS/Boostrap/Angularjs. Cliquez sur n'importe quel onglet pour plus d'information.");
    }
  }
