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
const allSection = ['home', 'presentation', 'achievement', 'skill', 'contact'];
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
const allPPresentation = document.querySelectorAll('.p_presentation');
const imagePresentation = document.querySelector('#img_presentation');
const pageTitlePresentation = document.querySelector('#page_title_presentation');
const traitPresentationLeft = document.querySelector('#trait_presentation_left');
const traitPresentationRight = document.querySelector('#trait_presentation_right');

//Const pour achievement 
const achievementPage = document.querySelector("#achievement");
const pageTitleAchievement = document.querySelector('#page_title_achievement');
const allAchievementRight = document.querySelectorAll(".achievement_right");
const allAchievementLeft = document.querySelectorAll(".achievement_left");
const arrow = document.querySelector("#arrow")

const linkBaume = document.querySelectorAll('.link_baume');
const linkBaumeAdmin = document.querySelectorAll('.link_baume_admin');
const linkHoneyLance = document.querySelectorAll('.link_honeylance');
const linkShifumi = document.querySelectorAll('.link_shifumi');
const linkBash = document.querySelectorAll('.link_bash');

//Const pour Skill
const skillPage = document.querySelector('#skill');
const pageTitleSkill = document.querySelector('#page_title_skill');
const allTraitDescription = document.querySelectorAll('.trait_description');
const allPSkill = document.querySelectorAll('.p_skill');
const allSpanDesc = document.querySelectorAll('.span_desc');
const allLogoSkill = document.querySelectorAll('.logo_skill');
const Iam = document.querySelector('#Iam');

//Const pour contact
const contactPage = document.querySelector('#contact');
const pageTitleContact = document.querySelector('#page_title_contact');
const allPContact = document.querySelectorAll('.p_contact');
const traitContactLeft = document.querySelector('#trait_contact_left');
const allInput = document.querySelectorAll('.input');
const submit = document.querySelector('#submit');
const allLogoSocial = document.querySelectorAll('.logo_social');
const allTraitContact = document.querySelectorAll('.trait_contact');
const logoSocial1 = document.querySelector('#logo_social_1');
const logoSocial2 = document.querySelector('#logo_social_2');
const logoSocial3 = document.querySelector('#logo_social_3');
const logoSocial4 = document.querySelector('#logo_social_4');
const placeholder = ["Nom :","Email :","Votre message..."];

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

        // On initialise le block spam pour toute la durée du reset/chargement
        blockSpam = "actif";

        //si la page demandé est home, on reset aussi la navBar
        if(allSection[index] == "home"){
          resetNavBar();
        }
        // On reset alors la page active, donc on lance l'annimation de sortie
        reset(indexNewPage);

        //On rénialise après 2s le blockSpam
        setTimeout(() => {
          blockSpam = "none";
        }, 2000);
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
  } else if (allSection[indexNewPage] == 'skill'){
    spawnSkill()
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
      } else if (allSection[index] == 'skill'){
        resetSkill(indexNewPage)
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
  if (window.innerWidth > 768){
    allTraitNavBar.forEach(trait => {
      trait.style.height = "3.125rem"; 
    });
  } else {
    allTraitNavBar.forEach(trait => {
      trait.style.height = "4.5rem"; 
    });
  }

  //les boutons (a)
  setTimeout(() => {
    allLiBtnNavBar.forEach(btn => {
      btn.style.transform = "translateY(0rem)";
      btn.style.opacity = "1";
    });
    allLiBtnNavBarSlow.forEach(btn => {
      btn.style.transform = "translateY(0rem)";
      btn.style.opacity = "1";
    })
  }, 100);
}

//Slide de la navBar
function navBarSlide(){
  navBar.style.right = '-50rem';
}

// Apparition de HOME
function spawnHome(){

  // On rend actif la page home
  homePage.style.display = "flex";
  // On la marque comme page active
  homePage.dataset.pageActive = "active";

  //barre du milieu
  setTimeout(() => {
    traitHome.style.width = "90%";
  }, 200);

  //les deux titres
  setTimeout(() => {
    titleHome.forEach(title => {
      title.style.transform = 'translateY(0rem)';
      title.style.opacity = "1";
    });
    titleHome2.style.transform = 'translateY(0rem)';
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
    traitPresentationLeft.style.width = '100%';
    traitPresentationRight.style.height = "100%";
  }, 100);

  setTimeout(() => {
    allPPresentation.forEach(p => {
      p.style.transform = "translateY(0%)";
    });
    imagePresentation.style.transform = 'translateX(0)';
  }, 900);
}

// Apparition de Achievement
function spawnAchievement(){

  // On rend actif la page
  achievementPage.style.display = "flex";
  // On la marque comme page active
  achievementPage.dataset.pageActive = "active";

  setTimeout(() => {
    pageTitleAchievement.style.opacity = "1";
    arrow.style.opacity = "1";
  }, 50);

  setTimeout(() => {
    allAchievementLeft.forEach(left =>{
      left.style.transform = "translateY(0%)";
    })
    allAchievementRight.forEach(right =>{
      right.style.transform = "translateY(0%)";
    })
    // arrow.classList.add('bounce');
  }, 700);
}

// Apparition de Skill
function spawnSkill(){

  // On rend actif la page
  skillPage.style.display = "flex";
  // On la marque comme page active
  skillPage.dataset.pageActive = "active";

  setTimeout(() => {
    // Les traits
    allTraitDescription.forEach(trait =>{
      trait.style.height = "100%";
    })
  }, 50);

  //Le "je suis"
  setTimeout(() => {
    Iam.style.transform = "translateX(0%)";
  }, 350);

  setTimeout(() => {
    allPSkill.forEach(skill => {
      skill.style.transform = "translateX(0)";
    });

    //le titre
    pageTitleSkill.style.opacity = "1";

  }, 600);

  //Les logo
  setTimeout(() => {

    let p=0;

    allLogoSkill.forEach(logo => {
      p += 100;

      setTimeout(() => {
        logo.style.transform = "translateY(0)";
      }, p);
    });  

  }, 700);
}

// Apparition de Contact
function spawnContact(){

  // On rend actif la page
  contactPage.style.display = "flex";
  // On la marque comme page active
  contactPage.dataset.pageActive = "active";

  setTimeout(() => {
    //apparition titre
    pageTitleContact.style.opacity = "1";

    allTraitContact.forEach(trait => {
      trait.style.height = "100%"
    });
    allInput.forEach(input => {
      input.style.width = "31rem";
    });
    traitContactLeft.style.width = "100%";
  }, 50);

  setTimeout(() => {
    for(let h=0;h<3;h++){
      allInput[h].placeholder= placeholder[h];
    }
  }, 400);

  setTimeout(() => {
    allPContact.forEach(p => {
      p.style.transform = "translateY(0%)";
    });
    logoSocial1.style.transform = "translateY(0%)";
  }, 650);

  setTimeout(() => {
    logoSocial2.style.transform = "translateY(0%)";
  }, 750);

  setTimeout(() => {
    logoSocial3.style.transform = "translateY(0%)";
  }, 850);

  setTimeout(() => {
    logoSocial4.style.transform = "translateY(0%)";
  }, 950);

  setTimeout(() => {
    submit.style.transform = "translateY(0%)";
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
    trait.style.height = "0rem"; 
  });

  setTimeout(() => {
    navBar.style.transition = "all .1s ease-in-out";
    navBar.style.right = '0rem';
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

  if(window.innerWidth > 768){
    //On déplace aussi la navBar car c'est plus home la page Active
    navBarSlide();
  }


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
    traitHome.style.width = "0rem";
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
    allPPresentation.forEach(p => {
      p.style.transition = "all .7s ease-in-out";
      p.style.transform = "translateY(300%)";
    });
    imagePresentation.style.transition = "all .7s ease-in-out";
    imagePresentation.style.transform = 'translateX(150%)';

    pageTitlePresentation.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    traitPresentationLeft.style.transition = "all .7s ease-in-out";
    traitPresentationRight.style.transition = "all .7s ease-in-out";

    traitPresentationLeft.style.width = '0%';
    traitPresentationRight.style.height = "0%";
  }, 250);

  setTimeout(() => {

    traitPresentationLeft.style.transition = "all 1.5s ease-in-out";
    traitPresentationRight.style.transition = "all 1.5s ease-in-out";
    imagePresentation.style.transition = "all 1.5s ease-in-out";
    allPPresentation.forEach(p =>{
      p.style.transition = "all 1.5s ease-in-out";
    })

    //reset fini, on lance la nouvelle page + display none
    presentationPage.style.display = "none";
    newPageActive(indexNewPage);
  }, 1000);
}

//reset Achievement
function resetAchievement(indexNewPage){

  setTimeout(() => {
    pageTitleAchievement.style.transition = "all .7s ease-in-out";
    pageTitleAchievement.style.opacity = "0";
    arrow.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    allAchievementLeft.forEach(left =>{
      left.style.transition = "all .7s ease-in-out";
      left.style.transform = "translateY(110%)";
    })
    allAchievementRight.forEach(right =>{
      right.style.transition = "all .7s ease-in-out";
      right.style.transform = "translateY(-120%)";
    })
  }, 50);

  setTimeout(() => {

  pageTitleAchievement.style.transition = "all 1.5s ease-in-out";

  allAchievementLeft.forEach(left =>{
    left.style.transition = "all 1.5s ease-in-out";
  });

  allAchievementRight.forEach(right =>{
    right.style.transition = "all 1.5s ease-in-out";
  })

  //reset de la fleche qui bounce
  // arrow.classList.remove('bounce');

  //reset fini, on lance la nouvelle page + display none
  achievementPage.style.display = "none";
  newPageActive(indexNewPage);
  }, 1000);
}

//reset de Skill
function resetSkill(indexNewPage){

  setTimeout(() => {

    //Les logo 
    allLogoSkill.forEach(logo => {
      logo.style.transition = "all .7s ease-in-out";
        logo.style.transform = "translateY(120%)";
    });  

    //le titre
    pageTitleSkill.style.transition = "all .7s ease-in-out";
    pageTitleSkill.style.opacity = "0";

    allPSkill.forEach(skill => {
      skill.style.transition = "all .7s ease-in-out";
      skill.style.transform = "translateX(-120%)";
    });

    Iam.style.transition = "all .7s ease-in-out";
    Iam.style.transform = "translateX(-120%)";

  }, 50);

  setTimeout(() => {
    // Les traits
    allTraitDescription.forEach(trait =>{
      trait.style.transition = "all .7s ease-in-out";
      trait.style.height = "0%";
    })
  }, 350);

  setTimeout(() => {

  //reset de tous les timers
  allLogoSkill.forEach(logo => {
    logo.style.transition = "all 1.5s ease-in-out";
  });

  Iam.style.transition = "all 1.5s ease-in-out";
  pageTitleSkill.style.transition = "all 1.5s ease-in-out";

  allPSkill.forEach(skill => {
    skill.style.transition = "all 1.5s ease-in-out";
  });

  allTraitDescription.forEach(trait =>{
    trait.style.transition = "all 1.5s ease-in-out";
  });

  //reset fini, on lance la nouvelle page + display none
  skillPage.style.display = "none";
  newPageActive(indexNewPage);
  }, 1000);
}

function resetContact(indexNewPage){

  submit.style.transform = "translateY(-200%)";

  setTimeout(() => {
    logoSocial4.style.transform = "translateY(-200%)";
  }, 50);

  setTimeout(() => {
    logoSocial3.style.transform = "translateY(-200%)";
  }, 100);

  setTimeout(() => {
    logoSocial2.style.transform = "translateY(-200%)";
  }, 150);

  setTimeout(() => {
    logoSocial1.style.transform = "translateY(-200%)";
  }, 200);

  setTimeout(() => {
    allPContact.forEach(p => {
      p.style.transform = "translateY(500%)";
    });
  }, 300);

  setTimeout(() => {
    allTraitContact.forEach(trait => {
      trait.style.height = "0%"
    });
    allInput.forEach(input => {
      input.style.width = "0rem";
      input.placeholder = " ";
    });
    pageTitleContact.style.transition = "all .7s ease-in-out";
    pageTitleContact.style.opacity = "0";
    traitContactLeft.style.transition = "all .7s ease-in-out";
    traitContactLeft.style.width = "0%";
  }, 350);
  
  setTimeout(() => {

  pageTitleContact.style.transition = "all 1.5s ease-in-out";
  traitContactLeft.style.transition = "all 1.5s ease-in-out";

  //reset fini, on lance la nouvelle page + display none
  contactPage.style.display = "none";
  newPageActive(indexNewPage);
  }, 1050);
}

/* Reset End */
/* =================================================== */
/* ===================================================== */
/* Hover + Redirection start */ 

/* Achievement */

// Link vers Baume.fr
linkBaume.forEach(link => {
  link.addEventListener('click', ()=>{
    window.open('https://baume-les-messieurs.netlify.app/', '_blank');
  })  
});

// link vers Baume.fr/admin
linkBaumeAdmin.forEach(link => {
  link.addEventListener('click', ()=>{
    window.open('https://baume-les-messieurs.netlify.app/admin.html', '_blank');
  })  
});

// Link vers HoneyLance
linkHoneyLance.forEach(link => {
  link.addEventListener('click', ()=>{
    window.open('https://honeylance.vinvui.com/', '_blank');
  })
});

// Link vers le Github Shifumi
linkShifumi.forEach(link => {
  link.addEventListener('click', ()=>{
    window.open('https://github.com/Elwindria/rock-paper-scissors', '_blank');
  })  
});

// Link vers le Github Bash
linkBash.forEach(link => {
  link.addEventListener('click', ()=>{
    window.open('https://github.com/Elwindria/bash', '_blank');
  })  
});

/* Hover + Redirection end */
//===============================
/* Animation Arrow de Achievement Start + oberver */

const callback = function( entries ) {

  let observedImg = entries[0];

  if(!observedImg.isIntersecting){
    arrow.classList.remove('bounce');
    arrow.style.cursor = "pointer";
    setTimeout(() => {
      arrow.style.transform = "rotate(180deg)";
    }, 50);
  } else {
    arrow.style.transform = "rotate(0deg)";
    setTimeout(() => {
      arrow.classList.add('bounce');
      arrow.style.cursor = "unset"; 
    }, 700);
  }
}

const observer = new IntersectionObserver(callback);
observer.observe(pageTitleAchievement);

//remonte en haut de la page au clic sur la fleche
arrow.addEventListener('click', ()=>{
  window.scroll(0, 0);
})

/* Animation Arrow de Achievement Stop */
/* Form to Email START */

//All Const Form
const form = document.querySelector('#form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputTextForm = document.querySelector('#text_form');

const errorName = document.querySelector('#error_name');
const errorEmail = document.querySelector('#error_email');
const errorTextForm = document.querySelector('#error_text_form');
const spanConfirm = document.querySelector('#confirm');

form.addEventListener('submit', function(e){
  //empeche le rafraichissement de la page
  e.preventDefault();

  //Lance la vérification JS du Form et de ses inputs
  checkValidityForm();
})

//Function vérification inputs du Form
function checkValidityForm(){

  //initialisation d'une variable validate
  let validate = true;

  //Vérification de l'input Name
  if(inputName.validity.valueMissing){
    errorName.textContent = "Le champ est obligatoire.";
    validate = false;
  } else if(inputName.validity.typeMismatch){
    errorName.textContent = "Le champ n'est pas valide";
    validate = false;
  }

  //Vérification de l'input Email
  if(inputEmail.validity.valueMissing){
    errorEmail.textContent = "Le champ est obligatoire.";
    validate = false;
  } else if(inputEmail.validity.typeMismatch){
    errorEmail.textContent = "Le champ n'est pas valide";
    validate = false;
  }

  //Vérification de l'input TextForm
  if(inputTextForm.validity.valueMissing){
    errorTextForm.textContent = "Le champ est obligatoire.";
    validate = false;
  } else if(inputTextForm.validity.typeMismatch){
    errorTextForm.textContent = "Le champ n'est pas valide";
    validate = false;
  }

  //Si validate = true alors par d'erreur donc on peut lancer la request Ajax 

  if(validate){
    spanConfirm.textContent = "Votre message à bien été transmis, merci beaucoup";
    
    createAjaxForFormToEmail();
  }
}

function createAjaxForFormToEmail(){

  //Création d'un FormData pour récup les infos de notre Form
  const formData = new FormData(form);

  //J'envoie mon formData en méthod POST au fichier formToEmail.php
  fetch("php/formToEmail.php", { method: "POST", body: formData})

  //Je récupère ensuite la réponse de mon fichier php (en Json)
  //Donc traduction =>
  .then(response =>response.json())

  //Je récupère le résultat et l'exploite
  .then((result) => {
    if(result === true){
      spanConfirm.textContent = "Votre message à bien été transmis, merci beaucoup";

      //Reset des inputs
      resetAllInput();

    } else if(result === false){
      spanConfirm.style.color= "#FF3C30";
      spanConfirm.textContent = "Une erreur s'est produite";
    } else {
      spanConfirm.style.color= "#FF3C30";
      spanConfirm.textContent = "Les champs ne peuvent pas être vides.";
    }
  })
}


//reset des inputs
function resetAllInput(){

  spanConfirm.style.color= "#1BBA02";

  form.reset();

  errorName.textContent = " ";
  errorEmail.textContent = " ";
  errorTextForm.textContent = " ";
}

/* Form to Email END */
