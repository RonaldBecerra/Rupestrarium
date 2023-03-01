/*  
 *  These values define the app state
 *
*/

// Source: https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
window.mobileAndTabletCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
};

// It is "true" in case a mobile device is used, like a phone or a tablet, and "false" in case a PC is used
// >>> UNUSED FOR THE MOMENT
const isMobileDevice = window.mobileAndTabletCheck();

// String that indicates the kind of stylesheet used at the moment: 
// 'wide', 'medium' or 'narrow';
var sizeStyleSheet = null;

var language = null;
const possible_languages = ["spanish", "english"];
// This is to avoid that two equivalent emails are sent by clicking two times the button.
// Don't confuse it with the constant that determines if in this version the send email view will appear or not
var sendEmailAllowed = true; 

// ------ BEGIN: Variables that determine if the user is currently in a determined view ---------------
var centralImage = true; // It refers to any of the views: Presentation, Instructions, etc., that actually consist on an image on the center
var figures = false; // It is false when there is no slider figure in the view; otherwise it indicates if it is a petroglyph or a rock painting
var quiz = false; // Indicates if the user is currently solving the quiz
var quizFinished = false;
var sendingEmail = false; // Indicates if the user is in the form view to send an email
// ------ END

// ------ BEGIN: Variables related to the slider figures
var figureType = 0; // Kind of slider figure that the user could be currently seeing (0: petroglyph1, 1: petroglyph2, 2: rockPainting1; 3: rockPainting2)
var currentFigure = null; // Unlike "figureType", it has the array with the uris of the images that represent the figure.
var head_body_feet = [0, 0, 0]; // Indicates in which of the three parts below each of the three sections of the figure currently is
var kindNotClicked = true; // Determines if the kind of the figure must be box shadowed when hovering it.
var draggingAvailable = true; // Semaphore that determines if the user can drag the figure and slide it, or not.
// ------ END

// ------ BEGIN: Variables related to the quiz
var numQuestion = 0;
var currentAttempt = 1;
var userAnswers = [];
var incorrectAnswers = []; // This will be ["a", "a", ...]
var head_body_feet_forQuiz = [0, 0, 0]; // Equivalent to "head_body_feet", but used for the quiz figure
var quizFigureNum = 0;
var totalQuestions = null;
// This will be shuflled later and will indicate the order of the options in the dropdown menu,
// because we don't want them to always appear in the same order. It will be initialized as [0,1,2,3,...]
var lastQ_optionsOrder = []; 
var lastQ_selectedOption = 0;
// ------ END

// ------ BEGIN: Processes to perform when an index option is chosen
const indexOptionsFunctions = [
	`if( !['b0', 'b1', 'b2'].includes(pressedMainButtonId()) ){
	 	restoreDefaultValues(); loadCentralImage(0); makeMainButtonBlack(0); showIndexOptionAsSelected(0)
	 }`, // 0
	`restoreDefaultValues(); loadDef(0); makeMainButtonBlack(5); showIndexOptionAsSelected(1)`, // 1
	`restoreDefaultValues(); loadDef(1); makeMainButtonBlack(6); showIndexOptionAsSelected(2)`, // 2
	`restoreDefaultValues(); loadDef(2); makeMainButtonBlack(7); showIndexOptionAsSelected(3)`, // 3
	`restoreDefaultValues(); loadDef(3); makeMainButtonBlack(8); showIndexOptionAsSelected(4)`, // 4
	`restoreDefaultValues(); loadQuiz(); makeMainButtonBlack(9); showIndexOptionAsSelected(5)`, // 5
	`restoreDefaultValues(); loadCentralImage(3); makeMainButtonBlack(3); showIndexOptionAsSelected(6)`, // 6
]
// ------ END

// ------ BEGIN: Images directions
var Root = "img/art/petroglyph1/";
const petroglyph1 = [
	[Root+"cabeza_antro_petro.png", Root+"cabeza_geo_petro.png", Root+"cabeza_zoo_petro.png"],
	[Root+"cuerpo_antro_petro.png", Root+"cuerpo_geo_petro.png", Root+"cuerpo_zoo_petro.png"],
	[Root+"inferior_antro_petro.png", Root+"inferior_geo_petro.png", Root+"inferior_zoo_petro.png"],
];

Root = "img/art/petroglyph2/";
const petroglyph2 = [
	[Root+"cabeza_antro_petro2.png", Root+"cabeza_geo_petro2.png", Root+"cabeza_zoo_petro2.png"],
	[Root+"cuerpo_antro_petro2.png", Root+"cuerpo_geo_petro2.png", Root+"cuerpo_zoo_petro2.png"],
	[Root+"inferior_antro_petro2.png", Root+"inferior_geo_petro2.png", Root+"inferior_zoo_petro2.png"],
];

Root = "img/art/rockPainting1/";
const rockPainting1 = [
	[Root+"cabeza_antro.png", Root+"cabeza_geo.png", Root+"cabeza_zoo.png"],
	[Root+"cuerpo_antro.png", Root+"cuerpo_geo.png", Root+"cuerpo_zoo.png"],
	[Root+"inferior_antro.png", Root+"inferior_geo.png", Root+"inferior_zoo.png"],
];

Root = "img/art/rockPainting2/";
const rockPainting2 = [
	[Root+"cabeza_antro2.png", Root+"cabeza_geo2.png", Root+"cabeza_zoo2.png"],
	[Root+"cuerpo_antro2.png", Root+"cuerpo_geo2.png", Root+"cuerpo_zoo2.png"],
	[Root+"inferior_antro2.png", Root+"inferior_geo2.png", Root+"inferior_zoo2.png"],
];

const possible_figures = [petroglyph1, petroglyph2, rockPainting1, rockPainting2];

const imagesThatVaryWithLanguage = {
	spanish: {
		presentation: {
			web: "img/text/presentacion_web_es.png",
			narrow: "img/text/presentacion_mob_es.png",
		},
		intro: "img/text/introduccion_es.png",
		instructions: {
			web: "img/text/instrucciones_web_es.png", 
			narrow: "img/text/instrucciones_mob_es.png",
		},
		credits: {
			web: "img/text/creditos_web_es.png",
			narrow: "img/text/creditos_mob_es.png",
		},
		contact: "img/text/contacto.png",
	},
	english: {
		presentation: {
			web: "img/text/presentacion_web_en.png",
			narrow: "img/text/presentacion_mob_en.png",
		},
		intro: "img/text/introduccion_en.png",
		instructions: {
			web: "img/text/instrucciones_web_en.png",
			narrow: "img/text/instrucciones_mob_en.png",
		},
		credits: {
			web: "img/text/creditos_web_en.png",
			narrow: "img/text/creditos_mob_en.png",
		},
		contact: "img/text/contacto.png",
	},
}

const indexOptions_images = [
	"img/index/options/start.png", // 0
	"img/index/options/petroglyphs.png", // 1
	"img/index/options/petroglyphs2.png", // 2
	"img/index/options/rock_paintings.png", // 3
	"img/index/options/rock_paintings2.png", // 4
	"img/index/options/recapitulate.png", // 5
	"img/index/options/credits.png", // 6
]
// ------ END
 