function setName(){
  var user_name = $('#name_input').val();
  var user_history = localStorage.getItem('user');
  var text_field = $('#custom_text');

  var output_text = "";
  var is_valid = true;

  //Some basic input validation
  if (user_name!=null && user_name.length>0){
    for (i=0;i<user_name.length-1;i++){
      if (!(user_name.toUpperCase().charAt(i)>='A' && user_name.toUpperCase().charAt(i)<='Z')){
          if (user_name.charAt(i)==' '){ //Hyphens and spaces are accepted
            continue;
          } else if(user_name.charAt(i)=='-'){
            continue;
          } else {
            is_valid=false;
          }
        }
      }

      if (!is_valid){
        if(language == "EN"){
          output_text = "You have entered an invalid name! ";
        } else {
          output_text = "Vous n'avez pas entré un nom valide!"
        }
      } else {
        localStorage.setItem('user', user_name);
        if(language == "EN"){
          output_text = "Hi "+user_name+"! ";         
        } else{
          output = "Salut "+user_name+"! ";
        }
      }
    } else if(user_history.length>0){
      if(language == "EN"){
        output_text = "Hi "+user_history+" ! ";
      } else {
        output_text = "Salut "+user_history+"! ";
      }
    }

    if(language == "EN"){
      output_text+="This page was created by Andrei Ungur, a second year Software Engineering student of McGill University, using Github/HTML5/JQuery/Javascript/CSS/Boostrap/Angularjs. Click on any of the tabs above for more information.";    
    } else {
      output_text+="Cette page a été crée par Andrei Ungur, un étudiant de deuxième année en Génie Logiciel à l'Université McGill, en utilisant Github/HTML5/JQuery/Javascript/CSS/Boostrap/Angularjs. Cliquez sur n'importe quel onglet pour plus d'information.";
    }
    
    text_field.text(output_text);
  }