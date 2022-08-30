//====================================================
// THREE.JS - Fond etoilé en 3D - Animation - Début

let scene, camera, renderer, stars, starGeo;

function init() {

  //nouvelle scene avec la couleur du fond
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x040D20 );

  camera = new THREE.PerspectiveCamera(60,window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = Math.PI/2;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  //création d'une géometry avec 2000 coins
  starGeo = new THREE.Geometry();
  for(let i=0;i<2000;i++) {
    star = new THREE.Vector3(
      Math.random() * 600 - 300,
      Math.random() * 600 - 300,
      Math.random() * 600 - 300
    );
    star.velocity = 0;
    star.acceleration = 0.02;
    starGeo.vertices.push(star);
  }

  //ajout à chaque coin, la texture star.png
  let sprite = new THREE.TextureLoader().load( 'images/star.png' );
  let starMaterial = new THREE.PointsMaterial({
    //couleur du png + taille
    color: 0xfbfbfb,
    size: .6,
    map: sprite
  });

  stars = new THREE.Points(starGeo,starMaterial);
  //ajout du tout à la scène
  scene.add(stars);

  window.addEventListener("resize", onWindowResize, false);

  animate(); 
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
function animate() {

  //On fait tourner notre forme géométrique et ses 2000coins/stars
  stars.rotation.y +=0.0003;

  renderer.render(scene, camera);
  // chargement en boucle de la fonction animate
  requestAnimationFrame(animate);
}
init();

// THREE.JS - Fond etoilé en 3D - Animation - Fin !
//====================================================
//====================================================
//====================================================
//====================================================
// All Const Start

//All Const - Pour chaque page
const allSection = ['home', 'presentation', 'achievement', 'cv', 'contact'];
const allFullVh = document.querySelectorAll(".fullVh");
let blockSpam = "none";

//Const NavBar
const allBtnNavBar = document.querySelectorAll('.btn_nav_bar');
const navBar = document.querySelector('#navBar');
const allTraitNavBar = document.querySelectorAll('.trait_nav_bar');
const allLiBtnNavBar = document.querySelectorAll('.li_btn_nav_bar');
const allLiBtnNavBarSlow = document.querySelectorAll('.li_btn_nav_bar_slow');

//Const pour Home
const homePage = document.querySelector("#home");
const traitHome = document.querySelector('#trait_home');
const titleHome = document.querySelectorAll('.title_home');
const titleHome2 = document.querySelector('#title_home_2');

//Const pour presentation 
const presentationPage = document.querySelector("#presentation");
const allTraitPresentationTop = document.querySelectorAll('.trait_presentation_top');
const traitPresentationBotLeft = document.querySelector('#trait_presentation_bot_left');
const traitPresentationBotRight = document.querySelector('#trait_presentation_bot_right');
const pDivPresentation = document.querySelector('#div_p_presentation');
const imagePresentation = document.querySelector('#img_presentation');
const pageTitlePresentation = document.querySelector('#page_title_presentation');

//Const pour achievement 
const achievementPage = document.querySelector("#achievement");
const pageTitleAchievement = document.querySelector('#page_title_achievement');
const allAchievementRight = document.querySelectorAll(".achievement_right");
const allAchievementLeft = document.querySelectorAll(".achievement_left");

// All Const Stop 
//=======================================================
// Naviguation avec la barre de Nav - Reset - synchronisation - START

//quand on click sur un des btn de la barre de nav, on reset pour switch
allBtnNavBar.forEach((btn, index) => {
  btn.addEventListener('click', function(){

    let indexNewPage = index;

    // Ajout d'une protection anti-spam
    if(blockSpam !== "actif"){

      // On vérifie déjà si la demande est pour la page active (inutile donc de reset elle est déjà là)
      if (allFullVh[index].dataset.pageActive !== 'active'){

        blockSpam = "actif";

        //si la page demandé est home, on reset aussi la navBar
        if(allSection[index] == "home"){
          resetNavBar();
        }
        // On reset alors la page active, donc on lance l'annimation de sortie
        reset(indexNewPage);

        setTimeout(() => {
          blockSpam = "none";
        }, 1200);
      }
    }
  })
});

// lancement de l'apparition de la nouvelle bonne page
function newPageActive(indexNewPage){

  if (allSection[indexNewPage] == 'home'){
    spawnHome();
  } else if (allSection[indexNewPage] == 'presentation'){
    spawnPresentation();
  } else if (allSection[indexNewPage] == 'achievement'){
    spawnAchievement();
  } else if (allSection[indexNewPage] == 'cv'){
    spawnCv()
  } else if (allSection[indexNewPage] == 'contact'){
    spawnContact()
  }
}

function reset(indexNewPage){

  // Reset de la page active  
  allFullVh.forEach((fullVh, index) => {

    //Si c'est la page active, on lance son reset
    if (fullVh.dataset.pageActive === 'active'){
      if (allSection[index] == 'home'){
        resetHome(indexNewPage);
      } else if (allSection[index] == 'presentation'){
        resetPresentation(indexNewPage);
      } else if (allSection[index] == 'achievement'){
        resetAchievement(indexNewPage);
      } else if (allSection[index] == 'cv'){
        resetCv(indexNewPage)
      } else if (allSection[index] == 'contact'){
        resetContact(indexNewPage)
      }

    //le reset est fait, on dit que la page n'est plus active
    fullVh.dataset.pageActive = "false";
    }
  });
}

// Naviguation avec la barre de Nav - Reset - synchronisation - END
//=======================================================
// Toutes les apparitions START ! 

// Une fois la page HTML chargé, on active la navBar + Home
window.addEventListener('load', function(){
  spawnNavBar();
  spawnHome()
})


// Apparition de la NavBar
function spawnNavBar(){

  // les multiples traits
  allTraitNavBar.forEach(trait => {
    trait.style.height = "50px"; 
  });

  //les boutons (a)
  setTimeout(() => {
    allLiBtnNavBar.forEach(btn => {
      btn.style.transform = "translateY(0px)";
      btn.style.opacity = "1";
    });
    allLiBtnNavBarSlow.forEach(btn => {
      btn.style.transform = "translateY(0px)";
      btn.style.opacity = "1";
    })
  }, 100);
}

//Slide de la navBar
function navBarSlide(){
  navBar.style.right = '-48vw';
}

// Apparition de HOME
function spawnHome(){

  // On rend actif la page home
  homePage.style.display = "flex";
  // On la marque comme page active
  homePage.dataset.pageActive = "active";

  //barre du milieu
  setTimeout(() => {
    traitHome.style.width = "1500px";
  }, 200);

  //les deux titres
  setTimeout(() => {
    titleHome.forEach(title => {
      title.style.transform = 'translateY(0px)';
      title.style.opacity = "1";
    });
    titleHome2.style.transform = 'translateY(0px)';
    titleHome2.style.opacity = "1";
  }, 1000);
}



// apparition de PRESENTATION
function spawnPresentation(){

  // On rend actif la page
  presentationPage.style.display = "flex";
  // On la marque comme page active
  presentationPage.dataset.pageActive = "active";

  setTimeout(() => {
    pageTitlePresentation.style.opacity = "1";

    //trait
    allTraitPresentationTop.forEach(trait => {
      trait.style.transform = "translateY(0%)"    
    });
    traitPresentationBotRight.style.width = "100%";
    traitPresentationBotLeft.style.width = "100%"
  }, 100);

  setTimeout(() => {
    pDivPresentation.style.bottom = "400px";
    imagePresentation.style.bottom = "400px";
  }, 500);
}

function spawnAchievement(){

  // On rend actif la page
  achievementPage.style.display = "flex";
  // On la marque comme page active
  achievementPage.dataset.pageActive = "active";

  setTimeout(() => {
    pageTitleAchievement.style.opacity = "1";
  }, 50);

  setTimeout(() => {
    allAchievementLeft.forEach(left =>{
      left.style.transform = "translateY(0%)";
    })
    allAchievementRight.forEach(right =>{
      right.style.transform = "translateY(0%)";
    })
  }, 700);
}

// Toutes les apparitions END !
//=============================================
// =================================================
// =====================================================
// ========================================================
// Reset de chaque Page Active - Display none - START

//Reset de NavBar
function resetNavBar(){

  //On change la vitesse de reset en plus rapide que la vitesse pour spawn

  //les boutons (a)
  allLiBtnNavBar.forEach(btn => {
    btn.style.transition = "all .7s ease-in-out";
    btn.style.transform = "translateY(-130%)";
    btn.style.opacity = "0";
  });
  allLiBtnNavBarSlow.forEach(btn => {
    btn.style.transition = "all .5s ease-in-out";
    btn.style.transform = "translateY(-130%)";
    btn.style.opacity = "0";
  })

  // les multiples traits
  allTraitNavBar.forEach(trait => {
    trait.style.transition = "all .7s ease-in-out";
    trait.style.height = "0px"; 
  });

  setTimeout(() => {
    navBar.style.transition = "all .1s ease-in-out";
    navBar.style.right = '0px';
  }, 900);

  setTimeout(() => {
    //on reset la vitesse des transition avant de relancer l'anim du spawn
    navBar.style.transition = "all 1.5s ease-in-out";
    allLiBtnNavBar.forEach(btn => {
      btn.style.transition = "all 1.5s ease-in-out";
    })
    allLiBtnNavBarSlow.forEach(btn => {
      btn.style.transition = "all 1.1s ease-in-out";
    })

    // Spawn de la NavBar
    spawnNavBar();
  }, 1000);
}

//Reset de HOME
function resetHome(indexNewPage){

  //On déplace aussi la navBar car c'est plus home la page Active
  navBarSlide();

  //les deux titres
  titleHome.forEach(title => {
    title.style.transition = "all .7s ease-in-out";
    title.style.transform = 'translateY(130%)';
    title.style.opacity = "0";
  });
  titleHome2.style.transition = "all .7s ease-in-out";
  titleHome2.style.transform = 'translateY(-130%)';
  titleHome2.style.opacity = "0";
    
  //barre du milieu
  setTimeout(() => {
    traitHome.style.transition = "all .7s ease-in-out";
    traitHome.style.width = "0px";
  }, 100);

  setTimeout(() => {
    
    //reset des temps d'animation
    traitHome.style.transition = "all 1.5s ease-in-out";
    titleHome2.style.transition = "all 1.5s ease-in-out";
    titleHome.forEach(title => {
      title.style.transition = "all 1.5s ease-in-out";
    });

    //Une fois l'animation de sortie fini, on display none + lancement de la nouvelle page
    homePage.style.display = "none";
    newPageActive(indexNewPage);
  }, 1000);
}

// reset de presentation
function resetPresentation(indexNewPage){

  setTimeout(() => {

    pageTitlePresentation.style.opacity = "0";
    pageTitlePresentation.style.transition = "all .7s ease-in-out";

    setTimeout(() => {
      pDivPresentation.style.transition = "all .7s ease-in-out";
      imagePresentation.style.transition = "all .7s ease-in-out";

      pDivPresentation.style.bottom = "0px";
      imagePresentation.style.bottom = "0px";
    }, 100);

    //trait
    allTraitPresentationTop.forEach(trait => {
      trait.style.transition = "all .7s ease-in-out";
      trait.style.transform = "translateY(100%)"; 
    });

    traitPresentationBotLeft.style.transition = "all .7s ease-in-out";
    traitPresentationBotRight.style.transition = "all .7s ease-in-out";

    traitPresentationBotRight.style.width = "0px";
    traitPresentationBotLeft.style.width = "0px";
  }, 200);

  setTimeout(() => {

    //reset des temps d'anim
    traitPresentationBotLeft.style.transition = "all 1.5s ease-in-out";
    traitPresentationBotRight.style.transition = "all 1.5s ease-in-out";
    allTraitPresentationTop.forEach(trait => {
      trait.style.transition = "all 1.5s ease-in-out";
    })
    pDivPresentation.style.transition = "all 1.5s ease-in-out";
    imagePresentation.style.transition = "all 1.5s ease-in-out";
    pageTitlePresentation.style.transition = "all 1.5s ease-in-out";

    //reset fini, on lance la nouvelle page + display none
    presentationPage.style.display = "none";
    newPageActive(indexNewPage);
  }, 1000);
}

//reset Achievement
function resetAchievement(indexNewPage){
      //reset fini, on lance la nouvelle page + display none
      achievementPage.style.display = "none";
      newPageActive(indexNewPage);
}