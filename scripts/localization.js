const xmlhttp = new XMLHttpRequest();

function build_card(card, card_i, card_type_id){
  var card_title = document.querySelector(card_type_id + '-title-' + card_i + " h3");
  clear_content(card_title);

  card_title.appendChild(create_dom_element('span', '', '', card.header.title));
  card_title.appendChild(create_dom_element('br', '', '', ''));
  card_title.appendChild(create_dom_element('span', 'light-heading', '', card.header.position));
  card_title.appendChild(create_dom_element('br', '', '', ''));
  card_title.appendChild(create_dom_element('span', 'light-heading', '', card.header.date));
  var card_content = document.querySelector(card_type_id + '-content-' + card_i);

  clear_content(card_content);
  card.body.forEach((content) => {
    card_content.appendChild(create_dom_element('p', 'bolded', 'left', content.header));
    card_content.appendChild(create_dom_element('p', '', 'left', content.body));
  });
}

function clear_content(section){
    while (section.firstChild){
        section.removeChild(section.lastChild);
    }
}

function create_dom_element(element_type, class_name, align, text_content){
    node = document.createElement(element_type);
    node.className = class_name;
    node.textContent = text_content;
    node.align = align;
    return node;
}

function get_english_content(){
    xmlhttp.open("GET","../languages/english.json", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.send();
}

function get_french_content(){
    xmlhttp.open("GET","../languages/french.json", true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json');
    xmlhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xmlhttp.send();
}

function write_content(language_data){
    write_about_me(language_data.sections.about);
    write_experience(language_data.sections.experience);
    write_projects(language_data.sections.projects);
    write_involvement(language_data.sections.involvement);
}

function write_about_me(language_data){
    document.querySelector('#label-about a').textContent = language_data.header;
    document.querySelector('#About .big-text h2').textContent = language_data.header;
    document.querySelector('#About #blurb-intro').textContent = language_data.blurb;

    var section = document.querySelector('#About .align-right .body')
    clear_content(section)
    language_data.content.forEach(subsection => {
        section.appendChild(create_dom_element('p', 'bolded', 'left', subsection.header));
        subsection.body.forEach(paragraph => {
          section.appendChild(create_dom_element('p', '', 'left', paragraph));
        });
    });
}

function write_experience(language_data){
  document.querySelector('#label-experience a').textContent = language_data.header;
  document.querySelector('#Experience .big-text h2').textContent = language_data.header;

  language_data.content.forEach((exp_card, exp_i) => {
      build_card(exp_card, exp_i, '#job');
  });
}

function write_projects(language_data){
  document.querySelector('#label-projects a').textContent = language_data.header;
  document.querySelector('#Projects .big-text h2').textContent = language_data.header;
  document.querySelector('#projects-content-container .intro p').textContent = language_data.blurb;

  language_data.content.forEach((project, project_i) => {
    document.querySelector('#project-title-' + project_i).textContent = project.header;

    content = document.querySelector('#project-content-' + project_i)
    clear_content(content);
    project.body.forEach((content_body) => {
      content.appendChild(create_dom_element('p', '', 'left', content_body));
    });
  });
}

function write_involvement(language_data){
  document.querySelector('#label-involvement a').textContent = language_data.header;
  document.querySelector('#Involvement .big-text h2').textContent = language_data.header;
  document.querySelector('#involvement-content-container .intro p').textContent = language_data.blurb;

  language_data.content.forEach((inv_card, inv_i) => {
    build_card(inv_card, inv_i, '#involvement');
  });
}

xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
      write_content(JSON.parse(xmlhttp.responseText));
  }
};

get_english_content();