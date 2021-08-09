
export function dodajStilove(el, stilovi) {
	for (let key in stilovi) {
		el.style[key] = stilovi[key];
	}
}

export function kreirajSkretanje(polje, strana) {
	// ova funkcija kreira zakrivljeni dio tijela zmije, za "g" zmijino tijelo skrece iz smjera od gore lijevo, za "d"/"do"/"l"
	// zmijino tijelo skrece od desno/dolje/lijevo uvijek na lijevo
	let el = document.createElement("div");
	el.classList.add("skretanje");
	
	var el1 = document.createElement("div");
	el1.classList.add("skretanje-el");
	el.appendChild(el1);
	
	el1 = document.createElement("div");
	el1.classList.add("skretanje-el1");
	
	let el2 = document.createElement("div");
	el2.classList.add("skretanje-el2");
	
	let el3 = document.createElement("div");
	el3.classList.add("skretanje-el3");
	
	switch (strana) {
		case "g":
		    dodajStilove(el1, {top: "0px", left: "0px"}); 
		    dodajStilove(el2, {top: "0px", right: "0px"}); 
		    dodajStilove(el3, {bottom: "0px", right: "0px"}); 
		    break;
		case "d":
		    dodajStilove(el1, {top: "0px", right: "0px"}); 
		    dodajStilove(el2, {bottom: "0px", left: "0px"}); 
		    dodajStilove(el3, {bottom: "0px", right: "0px"}); 
		    break;
		case "do":
		    dodajStilove(el1, {top: "0px", left: "0px"}); 
		    dodajStilove(el2, {bottom: "0px", left: "0px"}); 
		    dodajStilove(el3, {bottom: "0px", right: "0px"}); 
		    break;
		case "l":
		    dodajStilove(el1, {top: "0px", left: "0px"}); 
		    dodajStilove(el2, {top: "0px", right: "0px"}); 
		    dodajStilove(el3, {bottom: "0px", left: "0px"}); 
		    break;
		default:
		    alert("kod kreiranja zakrivljenja tijela imas nepostojecu sifru");
	}
	
	el.appendChild(el1);
	el.appendChild(el2);
	el.appendChild(el3);
	
	polje.appendChild(el);
}

export function kreirajMetu(polje) {
	let el = document.createElement("div");
	el.classList.add("meta");
	let el1 = document.createElement("div");
	el1.classList.add("meta-el1");
	el.appendChild(el1);
	
	el1 = document.createElement("div");
	el1.classList.add("meta-el2");
	el.appendChild(el1);
	
	el1 = document.createElement("div");
	el1.classList.add("meta-el3");
	el.appendChild(el1);
	
	el1 = document.createElement("div");
	el1.classList.add("meta-el4");
	el.appendChild(el1);
	
	polje.appendChild(el);
}

export function kreirajGlavu(polje, strana) {
	// ova funkcija kreira glavu zmije. za stranu="g" kreira glavu okrenutu prema gore, a za "do"/"l"/"d", kreira glave okrenuto prema dolje/lijevo/desno
	let el = document.createElement("div");
	el.classList.add("glava");
	let el1 = document.createElement("div");
	el1.classList.add("glava-el1");
	el.appendChild(el1);
	
	el1 = document.createElement("div");
	el1.classList.add("glava-el2");
	switch (strana) {
		case "g":
		    dodajStilove(el1, {height: "50%", width: "100%", bottom: "0px", left: "0px"}); 
		    break;
		case "d":
		    dodajStilove(el1, {height: "100%", width: "50%", bottom: "0px", left: "0px"}); 
		    break;
		case "do":
		    dodajStilove(el1, {height: "50%", width: "100%", top: "0px", left: "0px"}); 
		    break;
		case "l":
		    dodajStilove(el1, {height: "100%", width: "50%", top: "0px", right: "0px"}); 
		    break;
		default:
		    alert("kod kreiranja glave imas nepostojecu sifru");
		
	}
	el.appendChild(el1);
	
	polje.appendChild(el);
}

export function ukloniDijete(parent) {
	if (parent.children.length === 1) {
		parent.removeChild(parent.childNodes[0]);
		//console.log("dijete je uklonjeno");
	} else if (parent.children.length === 0) {
		//console.log("djeteta nema");
	} else {
		alert("cini se da je nesto pogresno, imas vise djece u elementu");
	}
}
