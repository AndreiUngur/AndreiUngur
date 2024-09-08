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

function create_link(align, reference){
  node = document.createElement("a");
  node.href = reference;
  node.textContent = reference;
  return node;
}

function create_dom_element(element_type, class_name, align, text_content){
  if (element_type == "a") {
    return create_link(align, text_content);
  } else {
    node = document.createElement(element_type);
    node.className = class_name;
    node.textContent = text_content;
    node.align = align;
    return node;
  }
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
}

function write_about_me(language_data){
    document.querySelector('#label-about a').textContent = language_data.header;
    document.querySelector('#About .big-text h2').textContent = language_data.header;
    document.querySelector('#About #blurb-intro').textContent = language_data.blurb;

    var section = document.querySelector('#About .align-right .body')
    clear_content(section)
    language_data.content.forEach(subsection => {
        section.appendChild(create_dom_element('p', 'bolded', 'center', subsection.header));
        subsection.body.forEach(paragraph => {
          section.appendChild(create_dom_element('a', '', '', paragraph));
        });
    });
}

xmlhttp.onreadystatechange = function(){
  if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
      write_content(JSON.parse(xmlhttp.responseText));
  }
};

get_english_content();