var involvement_container = document.querySelector('#involvement-content-container');
var projects_container = document.querySelector('#projects-content-container');
var jobs_container = document.querySelector('#jobs-content-container');

var isInViewport = function (elem) {
  var distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <= window.innerHeight &&
    distance.right <= window.innerWidth
  );
};

function populate_from_dom(dom_id, list_id){
  var list = [];

  for (var i=0; i < document.querySelector(dom_id).children.length; i++){
    list.push(document.querySelector(list_id + '-' + i));
  }
  return list;
}

var involvement = populate_from_dom('#Involvement #selectors', '#involvement-logo');
var projects = populate_from_dom('#Projects #selectors', '#project-img');
var job_titles = populate_from_dom('#Experience #selectors', '#job-title');
var company_logos = populate_from_dom('#Experience #selectors', '#company');

const basic_classes = "selector centered";

involvement_container.addEventListener('scroll', function (event) {
  for (i in involvement){
      selector = document.querySelector('#involvement-selector-'+i);
      if (isInViewport(involvement[i])) {
        selector.className = basic_classes + " selector-" + i + " selected";
      } else{
        selector.className = basic_classes + " selector-" + i;
      }
  };
}, false);

projects_container.addEventListener('scroll', function (event) {
  for (i in projects){
      selector = document.querySelector('#projects-selector-'+i);
      if (isInViewport(projects[i])) {
        selector.className = basic_classes + " selector-" + i + " selected";
      } else{
        selector.className = basic_classes + " selector-" + i;
      }
  };
}, false);

jobs_container.addEventListener('scroll', function (event) {
  for (i in job_titles){
    if (isInViewport(job_titles[i])) {
      for (l in company_logos){
        let new_i = (company_logos[l].getAttribute("meta") - i) % job_titles.length;
        if (new_i < 0){
          new_i += job_titles.length;
        }
        company_logos[l].id = "company-" + new_i;
      }
    }
  };
}, false);
