// This includes the title, subtitle and the vertical texts. Since the title is an image, not a plain text,
// we need to put its URL instead, so this time we differentiate according of if what we will modify is the
// source or the inner HTML. Moreover, we need to differentiate if we will apply this to a class or to an id.
const mainLabels_texts = {
	spanish: [
		{type:"class", location:"src", identifier:"rupestrarium-title", content:"img/text/title_es.png"}, // 0
		{type:"id", location:"innerHTML", identifier:"subtitle", content:"Figuras Rupestres"}, // 1
		{type:"id", location:"innerHTML", identifier:"main-left-label", content:"Cueva de las manos - Argentina"}, // 2
		{type:"id", location:"innerHTML", identifier:"main-right-label", content:"Sur de Marruecos - África"}, // 3
		{type:"id", location:"innerHTML", identifier:"central-image-label", content:`<span style="font-style:italic">Alia, Diosa de la Fertilidad y del Amor</span>. Arabia Saudita`}, // 4
		{type:"id", location:"innerHTML", identifier:"footer-label", content:"Todos los derechos reservados. ©FUNDABITAT, 2022"}, // 5
		{type:"id", location:"src", identifier:"index-title", content:"img/index/appname_es.png"}, // 6
	],
	english: [
		{type:"class", location:"src", identifier:"rupestrarium-title", content:"img/text/title_en.png"}, // 0
		{type:"id", location:"innerHTML", identifier:"subtitle", content:"Rock Art Figures"}, // 1
		{type:"id", location:"innerHTML", identifier:"main-left-label", content:"Cave of the hands - Argentina"}, // 2
		{type:"id", location:"innerHTML", identifier:"main-right-label", content:"South of Morocco - Africa"}, // 3
		{type:"id", location:"innerHTML", identifier:"central-image-label", content:`<span style="font-style:italic">Alia, Goddess of Fertility and Love</span>. Saudi Arabia`}, // 4
		{type:"id", location:"innerHTML", identifier:"footer-label", content:"All rights reserved. ©FUNDABITAT, 2022"}, // 5
		{type:"id", location:"src", identifier:"index-title", content:"img/index/appname_en.png"}, // 6
	],
}