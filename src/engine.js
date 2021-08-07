
import "./engine.css";

class Engine {
	constructor(_visinaDisplaya, _sirinaDisplaya, that) {
		
		this.stanjeZmije = this.inicirajZmiju();
		this.pozicijaMete = null;                 //  pozicija mete na displayu
		this.smjer = "d";  //  g, d, do, l je za gore, desno, dolje, lijevo, smjer kojim ide glava zmije
		this.noviSmjer = this.smjer;
		
		this.vrhRepaZmije = null;  //  zadnje polje zmije u prosloj iteraciji, sluzi brisanje polja, ako je null, ne brisati
		this.visinaDisplaya = _visinaDisplaya;
		this.sirinaDisplaya = _sirinaDisplaya;
		this.that = that;
		
		this._rez = JSON.parse(JSON.stringify(this.that.state.polja));
		
		this.intervalRef = null;
		this.keyDown = false;
		this.promijeniPolje = this.promijeniPolje.bind(this);
		this.pomakniZmiju = this.pomakniZmiju.bind(this);
		this.pritisakGumba = this.pritisakGumba.bind(this);
		this.pritisakGumbaUp = this.pritisakGumbaUp.bind(this);
		this.provjeriPomak = this.provjeriPomak.bind(this);
		this.startaj = this.startaj.bind(this);
		this.obrisiZmiju = this.obrisiZmiju.bind(this);
		this.postaviMetu = this.postaviMetu.bind(this);
	}
	
	startaj() {
		console.log("startali smo engine");
		
		this.obrisiZmiju();
		
		if (this.pozicijaMete !== null)  this.promijeniPolje([[...this.pozicijaMete, 0]]);
	    this.postaviMetu();
		
		
		
	    //setTimeout(() => {	
		    this.stanjeZmije = this.inicirajZmiju();
		    this.smjer = "d";
		    this.noviSmjer = this.smjer;
		    //this.promijeniPolje([[2,1,7], [4,1,8], [6,1,9], [8,1,10]]);
		    this.postaviZmiju();
		
		    /*setTimeout(() => {
		        this.postaviZmiju();
		    }, [10]);*/
		    this.intervalRef = setInterval(this.pomakniZmiju, 150);
	    //}, 10);  	
	}
	
	postaviMetu() {
		this.pozicijaMete = [Math.floor(Math.random()*this.sirinaDisplaya), Math.floor(Math.random()*this.visinaDisplaya)];
		while (!this.provjeriPomak(this.pozicijaMete)) {
			this.pozicijaMete = [Math.floor(Math.random()*this.sirinaDisplaya), Math.floor(Math.random()*this.visinaDisplaya)];
		}
		
		console.log("metu postavljamo na " + [...this.pozicijaMete, 2]);
		this.promijeniPolje([[...this.pozicijaMete, 2]]);
	}
	
	pomakniZmiju() {
		var x, y;
		[x, y] = this.stanjeZmije[this.stanjeZmije.length-1];
		this.vrhRepaZmije = [...this.stanjeZmije[0]];
		
		this.smjer = this.noviSmjer;
		
		switch (this.smjer) {
			case ("g"):
			    y -= 1;
			    if (y < 0)  y = this.visinaDisplaya - 1;
			    break;
			case ("d"):
			    x += 1;
			    if (x > this.sirinaDisplaya-1)  x = 0;
			    break;
			case ("do"):
			    y += 1;
			    if (y > this.visinaDisplaya-1)  y = 0;
			    break;
			case ("l"):
			    x -= 1;
			    if (x < 0)  x = this.sirinaDisplaya - 1;
			    break;
			default:
			    alert("pogreska, kod pomicanja zmije imas krivu sifru za smjer");
		}
		
		if (this.pozicijaMete[0] == x  &&  this.pozicijaMete[1] == y) {
		    this.postaviMetu();
		    this.vrhRepaZmije = null;
		    this.that.setState({score: this.that.state.score + 5});	
		} else {
		    this.stanjeZmije.shift();	
		}
		
		if (this.provjeriPomak([x, y])) {
		    this.stanjeZmije.push([x, y]);
		    this.postaviZmiju();
		    //console.log("zmija je pomaknuta " + Math.random());
		} else {
			this.stanjeZmije.push([x, y]);
		    this.postaviZmiju();
			//alert("Game over");
			clearInterval(this.intervalRef);
			this.that.setState({gameOverSw: true});
		}
	}
	
	provjeriPomak([x, y]) {
		var x1, y1;
		for (let i = this.stanjeZmije.length-1; i > -1; i--) {
			[x1, y1] = this.stanjeZmije[i];
			if (x == x1 && y == y1)  return false;
		}
		return true;
	}
	
	obrisiZmiju() {
		var pozicije = this.stanjeZmije.map((el)=> {return [...el, 0]});
		this.promijeniPolje(pozicije);
	}
	
	postaviZmiju() {
		var pozicije = [];
		if (this.vrhRepaZmije !== null) {
			pozicije.push([...this.vrhRepaZmije, 0]);
			console.log("ubacili smo brisanje na " + pozicije[0]);
			this.vrhRepaZmije = null;
		}
		var dulj = this.stanjeZmije.length;
		var x1, x2, y1, y2, x, y;
		for (var i = 0; i < dulj-1; i++) {
			
			if (i !== 0) {   //  da bi ovaj mehanizam radio, zmija mora biti minimalno duljin 3
			    x1 = this.stanjeZmije[i-1][0];
		        y1 = this.stanjeZmije[i-1][1];
		        x = this.stanjeZmije[i][0];
		        y = this.stanjeZmije[i][1];
		        x2 = this.stanjeZmije[i+1][0];
		        y2 = this.stanjeZmije[i+1][1];
		        
		        if (x1 < x2) {
					if (y1 < y2) {
						if (x > x1) {
						    pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],9]);
						} else {
							pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],7]);
						}
					} else if (y1 === y2) {
						pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],1]);		
					} else {
						if (x > x1) {
						    pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],10]);
						} else {
							pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],8]);
						}
					}
				} else if (x1 === x2) {
			        pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],1]);		
				} else {
					if (y1 < y2) {
						if (x < x1) {
						    pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],8]);
						} else {
							pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],10]);
						}
					} else if (y1 === y2) {
					    pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],1]);		
					} else {
						if (x < x1) {
						    pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],7]);
						} else {
							pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],9]);
						}
					}
				}
		    } else {
			    pozicije.push([this.stanjeZmije[i][0],this.stanjeZmije[i][1],1]);	
			}
		    
		    
			
			
		}
		
		x1 = this.stanjeZmije[dulj-2][0];
		y1 = this.stanjeZmije[dulj-2][1];
		x2 = this.stanjeZmije[dulj-1][0];
		y2 = this.stanjeZmije[dulj-1][1];
		
		if (x1 < x2) {
			pozicije.push([x2,y2,4]);
		} else if (x1 === x2) {
			if (y1 < y2) {
			    pozicije.push([x2,y2,5]);	
			} else {
				pozicije.push([x2,y2,3]);
			}
		} else {
			pozicije.push([x2,y2,6]);
		}
		
		this.promijeniPolje(pozicije);
	}
	
	inicirajZmiju() {
		//return [[5,5], [6,5], [7,5], [8,5], [9,5], [10,5]];
		return [[5,5], [6,5], [7,5]];
		//return [[5,5], [6,5], [6,6], [7,6], [8,6], [8,5], [9, 5], [10,5], [10,6], [10,7], [10,8], [9,8], [9,7],
		//    [8,7], [8,8], [8,9], [8,10], [9,10], [10,10], [11,10], [12,10], [12,9], [11,9]];
		//return [[5,5], [4,5], [4,6]];
	}
	
	promijeniPolje(podaci) {
		// ova funkcija uzima polje elemenata i mjenja stanje aplikacije. svaki element je polje 3 integera, 
		//[x, y, vr], pri cemu su x, y, koordinate, a vr je vrijednost boje.
		
		//var rez = JSON.parse(JSON.stringify(this.that.state.polja));
		for (let el of podaci) {
			if (el[1] >= 0 && el[1] < this.visinaDisplaya && el[0] >= 0 && el[0] < this.sirinaDisplaya) {
		        this._rez[el[1]][el[0]] = el[2];
		        //console.log(el[0] + " / " + el[1] + " / " + el[2]);
		    }
		}
		this.that.setState({polja: JSON.parse(JSON.stringify(this._rez))});
		//this.that.setState({polja: this._rez});
	}
	
	
	pritisakGumba(ev) {	
		ev.preventDefault();
		if (!this.keyDown) {
		    switch (ev.code) {
		        case ("ArrowUp"):
		            this.keyDown = "ArrowUp";
		            if (this.smjer === "l" ||  this.smjer === "d")  this.noviSmjer = "g";
		            break;
		        case ("ArrowDown"):
		            this.keyDown = "ArrowDown";
		            if (this.smjer === "l" ||  this.smjer === "d")  this.noviSmjer = "do";
		            break;
		        case ("ArrowLeft"):
		            this.keyDown = "ArrowLeft";
		            if (this.smjer === "g" ||  this.smjer === "do")  this.noviSmjer = "l";
		            break;
		        case ("ArrowRight"):
		            this.keyDown = "ArrowRight";
		            if (this.smjer === "g" ||  this.smjer === "do")  this.noviSmjer = "d";
		            break;
		    }
	    }
	}
	
	pritisakGumbaUp(ev) {	
		ev.preventDefault();
		if (this.keyDown) {
		    switch (ev.code) {
		        case ("ArrowUp"):
		            if (this.keyDown === "ArrowUp") {
						this.keyDown = false;
					}
		            break;
		        case ("ArrowDown"):
		            if (this.keyDown === "ArrowDown") {
						this.keyDown = false;
					}
		            break;
		        case ("ArrowLeft"):
		            if (this.keyDown === "ArrowLeft") {
						this.keyDown = false;
					}
		            break;
		        case ("ArrowRight"):
		            if (this.keyDown === "ArrowRight") {
						this.keyDown = false;
					}
		            break;
		    }
	    }
	}
	
}

export default Engine;
