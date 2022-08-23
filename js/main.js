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
// Naviguation avec la barre de Nav - Reset - synchronisation - START

const allSection = ['home', 'presentation', 'achievement', 'cv', 'contact'];
const allBtnNavBar = document.querySelectorAll('.btn_nav_bar');
let activePage = 'home';

allBtnNavBar.forEach((btn, index) => {
  btn.addEventListener('click', function(){
    // reset();

    // une fois reset fini, on active la nouvelle page
    if(true){
      if (allSection[index] == 'home'){
        home();
      } else if (allSection[index] == 'presentation'){
        presentation();
      }
    }
  })
});


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

  const allTraitNavBar = document.querySelectorAll('.trait_nav_bar');
  const allLiBtnNavBar = document.querySelectorAll('.li_btn_nav_bar');
  const allLiBtnNavBarSlow = document.querySelectorAll('.li_btn_nav_bar_slow');

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


// Apparition de HOME
function home(){
  const home = document.querySelector("#home");
  const traitHome = document.querySelector('#trait_home');
  const titleHome = document.querySelectorAll('.title_home');
  const titleHome2 = document.querySelector('#title_home_2');

  home.style.display = "flex";

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

// apparition de présentation
function presentation(){
  document.querySelector('#home').style.display = "unset";
  console.log('presnetation')
}