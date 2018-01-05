const about_me_header = $('#am');
const about_me_text = $('#about');

const education_header = $('#ed');
const education_text = $('#education');

const experience_header = $('#ex');
const experience_text = $('#experience');

const projects_header = $('#pj');
const projects_text = $('#other');

const intro_text = $('#etc');

function showIntroText(header){
  intro_text.fadeIn();
  header.css('background','white');
}

function showContent(content, header){
  if(content != projects_text){
    projects_header.css('background','white');
    projects_text.hide();
  }
  if (content != about_me_text){
    about_me_header.css('background','white');
    about_me_text.hide();
  }
  if (content != experience_text){
    experience_header.css('background','white');
    experience_text.hide();
  }
  if (content != education_text){
    education_header.css('background','white');
    education_text.hide();
  }
  intro_text.hide();
  content.slideToggle();
  header.css('background','#bababa');
}

$(document).ready(function(){
  about_me_header.click(function(){
    showContent(about_me_text, about_me_header);
    setTimeout(function(){if (about_me_text.css("display")!="block"){
      showIntroText(about_me_header);
    }},500);
  });
  education_header.click(function(){
    showContent(education_text, education_header);
    setTimeout(function(){if (education_text.css("display")!="block"){
      showIntroText(education_header);
    }},500);
  });
  experience_header.click(function(){
    showContent(experience_text, experience_header);
    setTimeout(function(){if (experience_text.css("display")!="block"){
      showIntroText(experience_header);
    }},500);
  });
  projects_header.click(function(){
    showContent(projects_text, projects_header);
    setTimeout(function(){if (projects_text.css("display")!="block"){
      showIntroText(projects_header);
    }},500);
  });
});