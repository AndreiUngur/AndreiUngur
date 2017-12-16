var ENG;
var FR;
var lang_data = {"EN":"","FR":""};
var language;
const projects_max = 7;

//Set-up on document start
$(document).ready(function() {
	$.ajaxSetup({ cache: false });
});

$.ajaxSetup({
	cache: false
});

//Get data from english JSON file
$.getJSON( "./scripts/content/english.json"+'?', { cache: false},function() {})
.done(function( data ) {
	ENG = data;
	lang_data.EN = ENG;
})
.fail( function(d, textStatus, error) {
	console.error("getJSON failed, status: " + textStatus + ", error: "+error)
})
.always(function() {
});

//Get data from french JSON file
$.getJSON( "./scripts/content/french.json"+'?', { cache: false},function() {})
.done(function( data ) {
	FR = data;
	lang_data.FR=FR;
})
.fail( function(d, textStatus, error) {
	console.error("getJSON failed, status: " + textStatus + ", error: "+error)
})
.always(function() {
});

//Write data based on user selection
$('#FR-Select').click(function($e){
	$e.preventDefault();
	writeData("FR");
});

$('#ENG-Select').click(function($e){
	$e.preventDefault();
	writeData("EN");
});

//Defines which id's map to which spots in the JSON file
function writeData(lang){
	language = lang;
	//About
	$('#am').text(lang_data[lang].about);
	$('#a_p1').text(lang_data[lang].about_1);
	$('#a_p2').text(lang_data[lang].about_2);
	$('#a_p3').text(lang_data[lang].about_3);
	
	//Education
	$('#ed').text(lang_data[lang].education);
	$('#mcgill_edu').text(lang_data[lang].mcgill_edu);
	$('#mcgill_desc_1').text(lang_data[lang].mcgill_desc[0]);
	$('#mcgill_desc_2').text(lang_data[lang].mcgill_desc[1]);
	$('#mcgill_desc_3').text(lang_data[lang].mcgill_desc[2]);
	$('#breb_edu').text(lang_data[lang].breb_edu);
	$('#breb_desc_1').text(lang_data[lang].breb_desc[0]);
	$('#breb_desc_2').text(lang_data[lang].breb_desc[1]);
	$('#breb_desc_3').text(lang_data[lang].breb_desc[2]);
	$('#beaubois_edu').text(lang_data[lang].beaubois_edu);
	$('#beaubois_desc_1').text(lang_data[lang].beaubois_desc[0]);
	$('#beaubois_desc_2').text(lang_data[lang].beaubois_desc[1]);
	$('#beaubois_desc_3').text(lang_data[lang].beaubois_desc[2]);

	//Experience
	$('#ex').text(lang_data[lang].experience);
	//Activities
	$('#activities').text(lang_data[lang].activities);
	$('#act-intro').text(lang_data[lang].activities_1);
	$('#act-1').text(lang_data[lang].activities_list[0]);
	$('#act-2').text(lang_data[lang].activities_list[1]);
	$('#act-3').text(lang_data[lang].activities_list[2]);
	$('#act-code').text(lang_data[lang].activities_code);
	
	//Work
	var worklabel = "work";
	$('#'+worklabel).text(lang_data[lang][worklabel]);
	for(var i=0;i<3;i++){
		$('#'+(worklabel+"-"+(i+1))).text(lang_data[lang][(worklabel+'_'+i)]);
		for(var j=0;j<lang_data[lang][(worklabel+"_"+i)].length;j++){
			$('#'+worklabel+"-"+(i+1)+"-"+(j+1)).text(lang_data[lang][(worklabel+"_"+i+"_list")][j]);
		}
	}
	
	//Volunteering
	$('#volunteering').text(lang_data[lang].volunteering);
	$('#vol').text(lang_data[lang].volunteering_1);
	$('#vol-1').text(lang_data[lang].volunteering_list[0]);
	$('#vol-2').text(lang_data[lang].volunteering_list[1]);
	
	//Projects
	$('#pj').text(lang_data[lang].projects);
	$('#projects_intro').text(lang_data[lang].projects_contact);
	$('#projects_more').text(lang_data[lang].projects_about);
	
	for(var i=0;i<projects_max;i++){
		$('#proj-'+(i+1)+'-title').text(lang_data[lang]["projects_"+i][0]);
		$('#proj-'+(i+1)+'-description').text(lang_data[lang]["projects_"+i][1]);
	}
}