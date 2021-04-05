// sem začni psát svůj program
// nadefinujeme globální proměnné
// ty jsou pak použitelné kdekoliv v programu
let panacek, panacekX, panacekY, panacekSirka, panacekVyska;
let mince, minceX, minceY, minceSirka, minceVyska;

panacek = document.querySelector("#panacek");
mince = document.querySelector("#mince");
zvukMince = document.querySelector("#zvukmince");
zvukFanfara = document.querySelector("#zvukfanfara");

let score = document.querySelector("#score");
let scoreCount = 0;

hudba = document.querySelector("#hudba");

window.addEventListener("keydown", gameIsOn);


// funkce pro nahodné vygenerování nové pozice mince
// a umístění mince na tyto souřadnice
function novaMince() {
	// zjistíme šířku a výšku mince
	minceVyska = mince.height;
	minceSirka = mince.width;

// a vygenerujeme první minci na náhodné pozici
	minceX = Math.round(Math.random() * (window.innerWidth - minceSirka));
	minceY = Math.round(Math.random() * (window.innerHeight - minceVyska));

	mince.style.top = minceY + "px";
	mince.style.left = minceX + "px";
}


// tato funkce se spustí při načtení stránky
// tj. ve chvíli, kdy je načtené komplet HTML, CSS a všechny obrázky a zvuky
function priNacteniStranky() {

	novaMince();
	// do globálních proměnných si uložíme odkaz na objekty panáčka a mince,
	// abychom je nemuseli při každém použití znovu na stránce hledat pomocí document.querySelector



	// zjistíme šířku a výšku panáčka
		panacekVyska = panacek.height;
		panacekSirka = panacek.width;

	// a umístíme panáčka do středu okna

		panacekX= Math.round(window.innerWidth/2 - panacekSirka/2);
		panacekY= Math.round(window.innerHeight/2 - panacekVyska/2);

		panacek.style.left = panacekX + "px";
		panacek.style.top = panacekY + "px";

	
	// umístíme panáčka na startovní pozici

}



// tato funkce se zavolá při stisku klávesy
// do proměnné "udalost" se vloží objekt s parametry události¨
// kde lze najít např. i vlastnost "key",
// která obsahuje znak stisknuté klávesy
function gameIsOn(event) {
	
	//hraje hudba
	if(event.key) {
		hudba.play();
	} 

	// šipka nahoru
	if (event.key === "ArrowUp") {
		panacekY = panacekY - 10; 
		panacek.style.top = panacekY + "px";
		panacek.src="obrazky/panacek-nahoru.png";

		if (panacekY < 0) {
			panacekY = 0;
		}
		
	}

	// šipka vpravo
	if (event.key === "ArrowRight") {
		panacekX = panacekX + 10;
		panacek.style.left = panacekX + "px";
		panacek.src="obrazky/panacek-vpravo.png";

		if (panacekX > innerWidth - panacekSirka) {
			panacekX = innerWidth - panacekSirka;
		}

	}

	// šipka vlevo
	if (event.key === "ArrowLeft") {
		panacekX = panacekX - 10;
		panacek.style.left = panacekX + "px";
		panacek.src="obrazky/panacek-vlevo.png";

		if (panacekX < 0) {
			panacekX = 0;
		}
	}


	// šipka dolů
	if (event.key === "ArrowDown") {
		panacekY = panacekY + 10; 
		panacek.style.top = panacekY + "px";
		panacek.src="obrazky/panacek.png"

		if (panacekY > innerHeight - panacekVyska) {
			panacekY = innerHeight - panacekVyska;
		}

	}

	//střet panáčka a mince
	if (panacekX - minceX < 30 && panacekX - minceX > -50 && panacekY - minceY < 30 && panacekY - minceY > -50) {
		mince.style.left = -999 + "px";
		zvukMince.play();
		if (mince.style.left === -999 + "px") {
			scoreCount = scoreCount + 1;
			novaMince();
			score.innerHTML = scoreCount;
			if (scoreCount === 5) {
				alert ("Vyhrál/a jsi!");
				zvukFanfara.play();
			}
		}
	}

	

}



