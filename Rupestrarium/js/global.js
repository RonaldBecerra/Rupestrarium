/*  
 *  These values define the app state
 *
*/

const smtpServerURL = "http://localhost:2526/mailServer";
var language = null;
const possible_languages = ["spanish", "english"];

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
var kindNotClicked = true; // Dtermines if the kind of the figure must be box shadowed when hovering it.
// ------ END

// ------ BEGIN: Variables related to the quiz
var numQuestion = 0;
var currentAttempt = 1;
var userAnswers = [];
var incorrectAnswers = []; // This will be ["a", "a", ...]
var head_body_feet_forQuiz = [0, 0, 0]; // Equivalent to "head_body_feet", but used for the quiz figure
var figureNum = 0;
var totalQuestions = null;
// This will be shuflled later and will indicate the order of the options in the dropdown menu,
// because we don't want them to always appear in the same order. It will be initialized as [0,1,2,3,...]
var lastQ_optionsOrder = []; 
var lastQ_selectedOption = 0;
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
		presentation: "img/text/presentacion_es.png",
		intro: "img/text/introduccion_es.png",
		instructions: {
			web: "img/text/instrucciones_web.png", // CAMBIAR
			narrow: "img/text/instrucciones_mob_es.png",
		},
		credits: {
			web: "img/text/creditos_web_es.png",
			narrow: "img/text/creditos_mob_es.png",
		},
		contact: "img/text/contacto.png",
	},
	english: {
		presentation: "img/text/presentacion_en.png",
		intro: "img/text/introduccion_en.png",
		instructions: {
			web: "img/text/instrucciones_web.png", // CAMBIAR
			narrow: "img/text/instrucciones_mob_en.png",
		},
		credits: {
			web: "img/text/creditos_web_en.png",
			narrow: "img/text/creditos_mob_en.png",
		},
		contact: "img/text/contacto.png",
	},
}
// ------ END