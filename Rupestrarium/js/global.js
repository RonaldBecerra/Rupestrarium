/*  
 *  These values define the app state
 *
*/

const smtpServerURL = "http://localhost:2526/mailServer";
var language = null;
const possible_languages = ["spanish", "english"];

// ------ BEGIN: Variables that determine if the user is currently in a determined view ---------------
var figures = false; // It is false when there is no slider figure in the view; otherwise it indicates if it is a petroglyph or a rock painting
var quiz = false; // Indicates if the user is currently solving the quiz
var quizFinished = false;
var sendingEmail = false; // Indicates if the user is in the form view to send an email
var espdoc = false; // Indicates if the user is currently in the "For teachers only" space
// ------ END

// ------ BEGIN: Variables related to the slider figures
var figureType = 0; // Kind of slider figure that the user could be currently seeing (0: petroglyph1, 1: petroglyph2, 2: rockPainting1; 3: rockPainting2)
var currentFigure = null; // Unlike "figureType", it has the array with the uris of the images that represent the figure.
var head_body_feet = [0, 0, 0]; // Indicates in which of the three parts below each of the three sections of the figure currently is
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