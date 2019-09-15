// TODO: This code could use some refactoring.
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

var involvement = [
    document.querySelector('#involvement-logo-0'),
    document.querySelector('#involvement-logo-1'),
    document.querySelector('#involvement-logo-2')
];

var projects = [
    document.querySelector('#project-img-0'),
    document.querySelector('#project-img-1'),
    document.querySelector('#project-img-2')
];

var jobs = [
    document.querySelector('#job-title-0'),
    document.querySelector('#job-title-1'),
    document.querySelector('#job-title-2'),
    document.querySelector('#job-title-3'),
];

var company_logos = [
    document.querySelector('#company-0'),
    document.querySelector('#company-1'),
    document.querySelector('#company-2'),
    document.querySelector('#company-3'),    
]

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
    for (i in jobs){
        console.log(isInViewport(jobs[i]));
        if (isInViewport(jobs[i])) {
            // Minus one, modulo 4 (len of jobs)
            for (l in company_logos){
                let new_i = (company_logos[l].getAttribute("meta") - i) % 4;
                if (new_i < 0){
                    new_i += 4;
                }
                company_logos[l].id = "company-" + new_i;
            }
        }
    };
}, false);