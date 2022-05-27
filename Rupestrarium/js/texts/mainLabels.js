// This includes the title and the vertical texts. In this case we also put the id of the corresponding HTML object,
// so the elements are of the form [id, text].
const mainLabels_texts = {
	spanish: [
		{type:"class", location:"src", identifier:"rupestrarium-title", content:"img/text/title_es.png"}, // 0
		{type:"id", location:"innerHTML", identifier:"subtitle", content:"Figuras Rupestres"}, // 1
		{type:"id", location:"innerHTML", identifier:"main-left-label", content:"Cueva de las manos - Argentina"}, // 2
		{type:"id", location:"innerHTML", identifier:"main-right-label", content:"Sur de Marruecos - África"}, // 3
		{type:"id", location:"innerHTML", identifier:"central-image-label", content:`<span style="font-style:italic">Alia, Diosa de la Fertilidad y del Amor</span>. Arabia Saudita`}, // 4
		{type:"id", location:"innerHTML", identifier:"footer-label", content:"Todos los derechos reservados. ©FUNDABITAT, 2022"}, // 5
	],
	english: [
		{type:"class", location:"src", identifier:"rupestrarium-title", content:"img/text/title_en.png"}, // 0
		{type:"id", location:"innerHTML", identifier:"subtitle", content:"Rock Art Figures"}, // 1
		{type:"id", location:"innerHTML", identifier:"main-left-label", content:"Cave of the hands - Argentina"}, // 2
		{type:"id", location:"innerHTML", identifier:"main-right-label", content:"South of Morocco - Africa"}, // 3
		{type:"id", location:"innerHTML", identifier:"central-image-label", content:`<span style="font-style:italic">Alia, Goddess of Fertility and Love</span>. Saudi Arabia`}, // 4
		{type:"id", location:"innerHTML", identifier:"footer-label", content:"All rights reserved. ©FUNDABITAT, 2022"}, // 5
	],
}