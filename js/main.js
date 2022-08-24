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
// All Const Start

//All Const - Pour chaque page
const allSection = ['home', 'presentation', 'achievement', 'cv', 'contact'];
const allFullVh = document.querySelectorAll(".fullVh");

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
const AllPPresentation = document.querySelectorAll('.p_presentation');
const imagePresentation = document.querySelector('#img_presentation');

// All Const Stop 
//=======================================================
// Naviguation avec la barre de Nav - Reset - synchronisation - START

//quand on click sur un des btn de la barre de nav, on reset pour switch
allBtnNavBar.forEach((btn, index) => {
  btn.addEventListener('click', function(){

    let indexNewPage = index;
    // On vérifie déjà si la demande est pour la page active (inutile donc de reset elle est déjà là)
    if (allFullVh[index].dataset.pageActive !== 'active'){

      //si la page demandé est home, on reset aussi la navBar
      if(allSection[index] == "home"){
        resetNavBar();
      }
      // On reset alors la page active, donc on lance l'annimation de sortie
      reset(indexNewPage);
    }
  })
});

// lancement de l'apparition de la nouvelle bonne page
function newPageActive(indexNewPage){

  if (allSection[indexNewPage] == 'home'){
    home();
  } else if (allSection[indexNewPage] == 'presentation'){
    presentation();
  } else if (allSection[indexNewPage] == 'achievement'){
    achievement();
  } else if (allSection[indexNewPage] == 'cv'){
    cv()
  } else if (allSection[indexNewPage] == 'contact'){
    contact()
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
  home()
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
  }, 1550);
}

//Slide de la navBar
function navBarSlide(){
  navBar.style.right = '-48vw';
}

// Apparition de HOME
function home(){

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
function presentation(){

  // On rend actif la page
  presentationPage.style.display = "flex";
  // On la marque comme page active
  presentationPage.dataset.pageActive = "active";
}

// Toutes les apparitions END !
//=============================================
// Reset de chaque Page Active - Display none - START

//Reset de NavBar
function resetNavBar(){
  navBar.style.right = '0';
}

//Reset de HOME
function resetHome(indexNewPage){

  //On déplace aussi la navBar car c'est plus home la page Active
  navBarSlide();

  //les deux titres
  titleHome.forEach(title => {
    title.style.transform = 'translateY(130%)';
    title.style.opacity = "0";
  });
  titleHome2.style.transform = 'translateY(-130%)';
  titleHome2.style.opacity = "0";
    
  //barre du milieu
  setTimeout(() => {
    traitHome.style.width = "0px";
  }, 400);

  setTimeout(() => {
    //Une fois l'animation de sortie fini, on display none + lancement de la nouvelle page
    homePage.style.display = "none";
    newPageActive(indexNewPage);
  }, 1800);
}

// reset de presentation
function resetPresentation(indexNewPage){
  presentationPage.style.display = "none";

  newPageActive(indexNewPage);
}