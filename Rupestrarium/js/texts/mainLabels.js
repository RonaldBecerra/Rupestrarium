// This includes the title and the vertical texts. In this case we also put the id of the corresponding HTML object,
// so the elements are of the form [id, text].
// const mainLabels_texts = {
// 	spanish: [
// 		["subtitle", "Figuras Rupestres"], // 0
// 		["main-left-label", "Cueva de las manos - Argentina"], // 1
// 		["main-right-label", "Sur de Marruecos - África"], // 2
// 		["central-image-label", '<span style="font-style:italic">Alia, Diosa de la Fertilidad y del Amor</span>. Arabia Saudita'], // 3
// 		["footer-label", "Todos los derechos reservados. ©FUNDABITAT, 2022"], // 4
// 	],
// 	english: [
// 		["subtitle", "Rock Art Figures"], // 0
// 		["main-left-label", "Cave of the hands - Argentina"], // 1
// 		["main-right-label", "South of Morocco - Africa"], // 2
// 		["central-image-label", '<span style="font-style:italic">Alia, Goddess of Fertility and Love</span>. Saudi Arabia'], // 3
// 		["footer-label", "All rights reserved. ©FUNDABITAT, 2022"], // 4
// 	],
// }

const mainLabels_texts = {
	spanish: [
		{type:"id", location:"innerHTML", identifier:"subtitle", content:"Figuras Rupestres"}, // 1
		{type:"id", location:"innerHTML", identifier:"main-left-label", content:"Cueva de las manos - Argentina"}, // 2
		{type:"id", location:"innerHTML", identifier:"main-right-label", content:"Sur de Marruecos - África"}, // 3
		{type:"id", location:"innerHTML", identifier:"central-image-label", content:`<span style="font-style:italic">Alia, Diosa de la Fertilidad y del Amor</span>. Arabia Saudita`}, // 4
		{type:"id", location:"innerHTML", identifier:"footer-label", content:"Todos los derechos reservados. ©FUNDABITAT, 2022"}, // 5
	],
	english: [
		{type:"id", location:"innerHTML", identifier:"subtitle", content:"Rock Art Figures"}, // 1
		{type:"id", location:"innerHTML", identifier:"main-left-label", content:"Cave of the hands - Argentina"}, // 2
		{type:"id", location:"innerHTML", identifier:"main-right-label", content:"South of Morocco - Africa"}, // 3
		{type:"id", location:"innerHTML", identifier:"central-image-label", content:`<span style="font-style:italic">Alia, Goddess of Fertility and Love</span>. Saudi Arabia`}, // 4
		{type:"id", location:"innerHTML", identifier:"footer-label", content:"All rights reserved. ©FUNDABITAT, 2022"}, // 5
	],
}