import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Engine from "./engine.js";
import {dodajStilove, kreirajSkretanje, kreirajMetu, kreirajGlavu, ukloniDijete} from "./pomocneFunkcije.js";

var _sirinaPolja = 25;
var _visinaDisplaya = 20;
var _sirinaDisplaya = 30;

function DisplayBodova({tekst, bodovi}) {
	
	var prikaz = "";
	if (bodovi < 10) {
		prikaz = "00" + bodovi;
	} else if (bodovi < 100) {
		prikaz = "0" + bodovi;
	} else {
		prikaz = bodovi;
	}
	
	return (
	    <div id="displaybodova">
	        <p id="displaybodova-tekst">{tekst}</p>
	        <p id="displaybodova-score">{prikaz}</p>
	    </div>
	)
}

function Skretanje() {
	return (
	    <div className="skretanje">
	        <div className="skretanje-el"></div>
	        <div className="skretanje-el1"></div>
	        <div className="skretanje-el2"></div>
	        <div className="skretanje-el3"></div>
	    </div>
	)
}

function GameOverEkran({sw, klik}) {
	const  r = React.useRef();
	
	React.useEffect(() => {
		if (sw) {
			dodajStilove(r.current, {display: "flex"});
		} else {
			dodajStilove(r.current, {display: "none"});
		}
	}, [sw]);
	
	return (
	    <div onClick={klik} ref={r} id="gameover-ekran">
	        <div id="gameover-ekran-naslov">GAME OVER</div>
	        <div id="gameover-ekran-uputa">Click Display For Restart</div>
	    </div>
	)
}

class Display extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			polja: this.inicirajPolje(_visinaDisplaya, _sirinaDisplaya, 0),
			gameOverSw: false, 
			score: 0
		}
		
		this.engine = new Engine(_visinaDisplaya, _sirinaDisplaya, this);
		
		//this.promijeniPolje = this.promijeniPolje.bind(this);
		
	}
	
	componentDidMount() {
		dodajStilove(this._div1, {height: _visinaDisplaya*_sirinaPolja + 100 + "px", width: _sirinaDisplaya*_sirinaPolja + 10 + "px"});
		dodajStilove(this._div2, {height: _visinaDisplaya*_sirinaPolja + "px", width: _sirinaDisplaya*_sirinaPolja + "px", gridTemplateRows: "repeat(" + _visinaDisplaya + ", " + _sirinaPolja + "px)", gridTemplateColumns: "repeat(" + _sirinaDisplaya + ", " + _sirinaPolja + "px)"});
		
		for (var i = 0; i < _visinaDisplaya*_sirinaDisplaya; i++) {
			let el = document.createElement("div");
			//el.classList.add("polje");
			//dodajStilove(el, {backgroundColor: "rgb(" + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + "," + Math.floor(Math.random()*256) + ")"});
			this._div2.appendChild(el);
		}
		console.log("broj dodanih div-ova je " + _visinaDisplaya * _sirinaDisplaya);
		
		
		/*this.promijeniPolje([[7,1,1]]);
		this.promijeniPolje([[7,1,0]]);
		this.promijeniPolje([[8,2,2]]);
		
		setTimeout(()=> {this.promijeniPolje([[8,2,0]])}, 10);
		this.promijeniPolje([[1,1,2]]);
		
		//this.promijeniPolje([[2,2,3],[3,3,4],[4,4,5],[5,5,6]]);
		
		this.promijeniPolje([[2,4,7], [4,4,8], [6,6,9], [8,6,10]]);*/
		
		document.addEventListener("keydown", this.engine.pritisakGumba);
        document.addEventListener("keyup", this.engine.pritisakGumbaUp);
		
		this.engine.startaj();
		
	}
	
	componentDidUpdate(prevProps, prevState) {
	    for (let i = 0; i < this.state.polja.length; i++) {
			for (let j = 0; j < this.state.polja[0].length; j++) {
				if (prevState.polja[i][j] !== this.state.polja[i][j]) {
					ukloniDijete(this._div2.children[i * _sirinaDisplaya + j]);
					//console.log("procesiramo: " + j + " / " + i + " / " + this.state.polja[i][j]);
					switch (this.state.polja[i][j]) {
						case (0):  // ovo je slucaj praznog polja
						    dodajStilove(this._div2.children[i * _sirinaDisplaya + j], {backgroundColor:"#444444"});   
						    break;
					    case (1):  // ovo je slucaj tijela zmije
					        //console.log("mjenjam polje " + j + ", " + i);
					        //console.log(this._div2.children[0]);
					        //this._div2.children[6].style.backgroundColor = "pink";
					        dodajStilove(this._div2.children[i * _sirinaDisplaya + j], {backgroundColor:"#64f227"});   
					        break;
					    case (2):  //  ovo je slucaj mete
					        kreirajMetu(this._div2.children[i * _sirinaDisplaya + j]);
					        break;
					    case (3): // ovo je slucaj glave okrenute prema gore
					        kreirajGlavu(this._div2.children[i * _sirinaDisplaya + j], "g");
					        break;    
					    case (4): // ovo je slucaj glave okrenute prema desno
					        kreirajGlavu(this._div2.children[i * _sirinaDisplaya + j], "d");
					        break;    
					    case (5): // ovo je slucaj glave okrenute prema dolje
					        kreirajGlavu(this._div2.children[i * _sirinaDisplaya + j], "do");
					        break; 
					    case (6): // ovo je slucaj glave okrenute prema lijevo
					        kreirajGlavu(this._div2.children[i * _sirinaDisplaya + j], "l");
					        break;   
					    
					    case (7): // ovo je slucaj zakrivljenja tijela od gore nalijevo
					        console.log("kreiram zakrivljenje1");
					        kreirajSkretanje(this._div2.children[i * _sirinaDisplaya + j], "g");
					        break;    
					    case (8): // ovo je slucaj zakrivljenja tijela od desno nalijevo
					        kreirajSkretanje(this._div2.children[i * _sirinaDisplaya + j], "d");
					        break;    
					    case (9): // ovo je slucaj zakrivljenja tijela od dolje nalijevo
					        kreirajSkretanje(this._div2.children[i * _sirinaDisplaya + j], "do");
					        break; 
					    case (10): // ovo je slucaj zakrivljenja tijela od lijevo nalijevo
					        kreirajSkretanje(this._div2.children[i * _sirinaDisplaya + j], "l");
					        break;  
					    default:
					        alert("cini se da imas krivi kod");
				    }
				}
			}
		}
	}
	

		
	inicirajPolje(x, y, vr) { // inicira polje [x][y] sa vrijednostima vr
	    var rez = [];
	    for (let i = 0; i < x; i++) {
		    var red = [];
		    for (let j = 0; j < y; j++) {
			    red.push(vr);
		    }
		    rez.push(red);
	    }
	    return rez;
    }
	
	render() {
		return (
		    <div ref={(e) => {this._div1 = e}} id="okvir">
		        <div id="display-el">
		            <DisplayBodova tekst="SCORE:" bodovi={this.state.score}/>
		            <DisplayBodova tekst="BEST:" bodovi={0}/>
		        </div>
		        <div ref={(e) => {this._div2 = e}} id="display">
		        </div>
		        <GameOverEkran sw={this.state.gameOverSw} klik={() => {this.setState({gameOverSw: false, score: 0}); this.engine.startaj()}}/>
		    </div>
		)
	} 
}




ReactDOM.render(
    <>
        <div id="pokus">
            <Skretanje/>
        </div>
        <Display/>
    </>,
    document.querySelector("#root")
)

