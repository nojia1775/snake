const character = document.getElementById('character');
const rond = document.getElementById('objet');
const score = document.getElementById('ecranScore');

//fonctions
let fonctionDroite;
let fonctionGauche;
let fonctionHaut;
let fonctionBas;

//régler le problème d'accumulation de direction
let deplacement = [];
let i = 0;
let dernierDeplacement = deplacement[i];

function allerADroite() {
    fonctionDroite = setInterval(() => {
        let x = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
        x += 20;
        character.style.left = `${x}px`;
    }, 150)
}

function allerAGauche() {
    fonctionGauche = setInterval(() => {
        let x = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
        x -= 20;
        character.style.left = `${x}px`;
    }, 150)
}

function allerEnBas() {
    fonctionBas = setInterval(() => {
        let y = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        y += 20;
        character.style.top = `${y}px`;
    }, 150)
}

function allerEnHaut() {
    fonctionHaut = setInterval(() => {
        let y = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        y -= 20;
        character.style.top = `${y}px`;
    }, 150)
}

//se déplacer
document.addEventListener('keydown', (e) => {

    let touche = e.keyCode;

    if(touche == 37 && dernierDeplacement != 37 && dernierDeplacement != 39) {

        allerAGauche();
        clearInterval(fonctionDroite);
        clearInterval(fonctionBas);
        clearInterval(fonctionHaut);
        dernierDeplacement = touche;
        character.style.transform = "rotate(-90deg)";
        i++;


    } else if(touche == 39 && dernierDeplacement != 39 && dernierDeplacement != 37) {

        allerADroite();
        clearInterval(fonctionGauche);
        clearInterval(fonctionBas);
        clearInterval(fonctionHaut);
        dernierDeplacement = touche;
        character.style.transform = "rotate(90deg)";
        i++;

    } else if(touche == 38 && dernierDeplacement != 38 && dernierDeplacement != 40) {
        allerEnHaut();
        clearInterval(fonctionBas);
        clearInterval(fonctionDroite);
        clearInterval(fonctionGauche);
        dernierDeplacement = touche;
        character.style.transform = "rotate(0deg)";
        i++;

    } else if(touche == 40 && dernierDeplacement != 40 && dernierDeplacement != 38) {

        allerEnBas();
        clearInterval(fonctionDroite);
        clearInterval(fonctionGauche);
        clearInterval(fonctionHaut);
        dernierDeplacement = touche;
        character.style.transform = "rotate(180deg)";
        i++;

    }
});

//collisions
document.addEventListener('keydown', (e) => {

    setInterval(function() {
        const gaucheC = parseInt(window.getComputedStyle(character).getPropertyValue('left'));
        const hautC = parseInt(window.getComputedStyle(character).getPropertyValue('top'));
        const xPosO = parseInt(window.getComputedStyle(rond).getPropertyValue('left')); //position X du rond
        const yPosO = parseInt(window.getComputedStyle(rond).getPropertyValue('top')); //position Y du rond
        const xPosOD = xPosO - 50;
        const yPosOD = yPosO + 70;

        //collision avec le rond vert

        if(gaucheC >= xPosOD && 
            gaucheC <= xPosO + 30 && 
            hautC >= yPosO && 
            hautC <= yPosOD) {

                let x = Math.floor(Math.random() * 760);
                let y = Math.floor(Math.random() * 290);
                rond.style.left = `${x}px`;
                rond.style.top = `${y}px`;
        }

        //collision avec les bords de l'écran 
        if(gaucheC <= -1 || gaucheC >= 800 || hautC <= -1 || hautC >= 500) {
            alert("perdu");
            character.style.top = "240px";
            character.style.left = "390px";
            rond.style.top = "55px";
            rond.style.left = "220px";
            clearInterval(fonctionDroite);
            clearInterval(fonctionBas);
            clearInterval(fonctionHaut);
            clearInterval(fonctionGauche);
            deplacement = [];
            dernierDeplacement = null;
            character.style.transform = "rotate(0deg)";
        }
    }, 300)
})