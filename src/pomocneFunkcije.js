
var _bojaTijela = "#63d90f";
var _bojaPozadine = "#444444";
var _sirinaTijela = 66;

export function dodajStilove(el, stilovi) {
	for (let key in stilovi) {
		el.style[key] = stilovi[key];
	}
}

export function kreirajZaokret(polje, strana) {
	// ova funkcija kreira zavijeni dio tijela zmije. parametar strana za "g"/"d"/"do"/"l" odreduje zavoj od gore/od desno/od dolje/od lijevo  nalijevo
	const zakrivljenostPar = 100;
	
	let el = document.createElement("div");
	el.classList.add("pozadina");
	let el1 = document.createElement("div");
	let el2 = document.createElement("div");
	let el3 = document.createElement("div");
	let el4 = document.createElement("div");
	let el5 = document.createElement("div");
	let el6 = document.createElement("div");
	
	dodajStilove(el5, {position: "absolute", width: _sirinaTijela + "%", height: _sirinaTijela + "%", top: (100-_sirinaTijela)/2 + "%", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaPozadine, overflow: "hidden"});
	
	switch (strana) {
		case ("g"):
	        dodajStilove(el1, {position: "absolute", width: (_sirinaTijela/2 + 50) + "%", height: (100-_sirinaTijela)/2 + "%", top: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", width: (100-_sirinaTijela)/2 + "%", height: _sirinaTijela + "%", top: (100-_sirinaTijela)/2 + "%", right: "0px", backgroundColor: _bojaTijela});	       
	        dodajStilove(el3, {position: "absolute", width: (100-_sirinaTijela)/2 + "%", height: (100-_sirinaTijela)/2 + "%", top: "0px", right: "0px", backgroundColor: _bojaTijela, overflow: "hidden"});
	        dodajStilove(el4, {position: "absolute", width: zakrivljenostPar*2 + "%", height: zakrivljenostPar*2 + "%", top: 100-2*zakrivljenostPar + "%", left: "0px", backgroundColor: _bojaPozadine, borderRadius: "20%"});	
	        dodajStilove(el6, {position: "absolute", width: "200%", height: "200%", top: "-100%", left: "0px", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    case ("d"):
	        dodajStilove(el1, {position: "absolute", height: (_sirinaTijela/2 + 50) + "%", width: (100-_sirinaTijela)/2 + "%", bottom: "0px", right: "0px", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", height: (100-_sirinaTijela)/2 + "%", width: _sirinaTijela + "%", bottom: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});	        
	        dodajStilove(el3, {position: "absolute", width: (100-_sirinaTijela)/2 + "%", height: (100-_sirinaTijela)/2 + "%", bottom: "0px", right: "0px", backgroundColor: _bojaTijela, overflow: "hidden"});
	        dodajStilove(el4, {position: "absolute", width: zakrivljenostPar*2 + "%", height: zakrivljenostPar*2 + "%", top: "0px", left: "0px", backgroundColor: _bojaPozadine, borderRadius: "20%"});	
	        dodajStilove(el6, {position: "absolute", width: "200%", height: "200%", top: "0px", left: "0px", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    case ("do"):
	        dodajStilove(el1, {position: "absolute", height: (_sirinaTijela/2 + 50) + "%", width: (100-_sirinaTijela)/2 + "%", bottom: "0px", left: "0px", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", height: (100-_sirinaTijela)/2 + "%", width: _sirinaTijela + "%", bottom: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});	        
	        dodajStilove(el3, {position: "absolute", width: (100-_sirinaTijela)/2 + "%", height: (100-_sirinaTijela)/2 + "%", bottom: "0px", left: "0px", backgroundColor: _bojaTijela, overflow: "hidden"});
	        dodajStilove(el4, {position: "absolute", width: zakrivljenostPar*2 + "%", height: zakrivljenostPar*2 + "%", top: "0px", left: 100-2*zakrivljenostPar + "%", backgroundColor: _bojaPozadine, borderRadius: "20%"});	
	        dodajStilove(el6, {position: "absolute", width: "200%", height: "200%", top: "0px", left: "-100%", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    case ("l"):
	        dodajStilove(el1, {position: "absolute", height: (_sirinaTijela/2 + 50) + "%", width: (100-_sirinaTijela)/2 + "%", top: "0px", left: "0px", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", height: (100-_sirinaTijela)/2 + "%", width: _sirinaTijela + "%", top: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});	     
	        dodajStilove(el3, {position: "absolute", width: (100-_sirinaTijela)/2 + "%", height: (100-_sirinaTijela)/2 + "%", top: "0px", left: "0px", backgroundColor: _bojaTijela, overflow: "hidden"});
	        dodajStilove(el4, {position: "absolute", width: zakrivljenostPar*2 + "%", height: zakrivljenostPar*2 + "%", top: 100-2*zakrivljenostPar + "%", left: 100-2*zakrivljenostPar + "%", backgroundColor: _bojaPozadine, borderRadius: "20%"});
	        dodajStilove(el6, {position: "absolute", width: "200%", height: "200%", top: "-100%", left: "-100%", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    default:
	        alert("imas pogresnu sifru u funkciji za kreiranje zaokreta tijela zmije");
    }
		
	el.appendChild(el1);
	el3.appendChild(el4);
	el.appendChild(el2);
	el.appendChild(el3);
	el5.appendChild(el6);
	el.appendChild(el5);
	
	polje.appendChild(el);
}

export function kreirajTijelo(polje, sw) {
	// ova funkcija za sw=true generira horizontalni dio tijela, za false vertikalni
	
	let el = document.createElement("div");
	el.classList.add("pozadina");
	
	let el1 = document.createElement("div");
	if (sw) {
		dodajStilove(el1, {position: "absolute", width: "100%", height: _sirinaTijela + "%", top: (100-_sirinaTijela)/2 + "%", left: "0px", backgroundColor: _bojaTijela});
	} else {
		dodajStilove(el1, {position: "absolute", width: _sirinaTijela + "%", height: "100%", top: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});
	}
	el.appendChild(el1);
	
	polje.appendChild(el);
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
	let el = document.createElement("div");
	el.classList.add("pozadina");
	
	let el1 = document.createElement("div");
	let el2 = document.createElement("div");
	
	switch (strana) {
		case "g":
	        dodajStilove(el1, {position: "absolute", width: _sirinaTijela + "%", height: (100-_sirinaTijela/2) + "%", bottom: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", width: _sirinaTijela + "%", height: _sirinaTijela + "%", top: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    case "d":
	        dodajStilove(el1, {position: "absolute", height: _sirinaTijela + "%", width: (100-_sirinaTijela/2) + "%", left: "0px", top: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", width: _sirinaTijela + "%", height: _sirinaTijela + "%", right: "0px", top: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    case "do":
	        dodajStilove(el1, {position: "absolute", width: _sirinaTijela + "%", height: (100-_sirinaTijela/2) + "%", top: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", width: _sirinaTijela + "%", height: _sirinaTijela + "%", bottom: "0px", left: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    case "l":
	        dodajStilove(el1, {position: "absolute", height: _sirinaTijela + "%", width: (100-_sirinaTijela/2) + "%", right: "0px", top: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela});
	        dodajStilove(el2, {position: "absolute", width: _sirinaTijela + "%", height: _sirinaTijela + "%", left: "0px", top: (100-_sirinaTijela)/2 + "%", backgroundColor: _bojaTijela, borderRadius: "50%"});
	        break;
	    default:
	        alert("imas pogresku kod kreiranja glave zmije");
	}
	
	el.appendChild(el1);	
	el.appendChild(el2);
	polje.appendChild(el);
}

export function kreirajGlavu1(polje, strana) {
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
