/*
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 *
*/

//storing the Ul element in navMenu which will contain section links
const navMenu=document.getElementById('navbar__list');
//getting all sections in the DOM and storing them in an array
const sections=document.querySelectorAll('section');
const arrayOfSections=Array.from(document.querySelectorAll('section'));

/**
 * End Global Variables
 * Start Helper Functions
 *
*/

//function that adds and generate sections to the navigation bar

function scrollSmoothly(event)
{

//looping over every section to check which section link has been clicked
for(section of arrayOfSections)
{

 //if the section link has been clicked
  if((event.target.getAttribute('href'))===`#${section.id}`)
   {
      //prevent the default action
       event.preventDefault();
       //scroll that section into view smoothly
       section.scrollIntoView({behavior:'smooth'});
   }

}


}



function generatingMenuOfSections()
{
   //looping over each section
   for( section of arrayOfSections)
   {
        // getting the section name from the data-nav attribute to use it in naming the link
        const sectionName=section.getAttribute('data-nav');
         //getting id to use it in the section link
        const sectionId=section.getAttribute('id');

        //creating new list element
        const liElement=document.createElement('li');
        //creating anchor element
        const anchorLink=document.createElement('a');

        //adding a class'menu_link' to the anchor element
        anchorLink.classList.add('menu__link') ;
        //adding the href attribute to attach the link of the the section
        anchorLink.setAttribute('href',`#${sectionId}`);
        //setting the text content of the anchor link to the name of the section
        anchorLink.textContent=sectionName;
        //appending the anchor link to its parent the li element
       liElement.appendChild(anchorLink);
       //appending the list element  to its parent the navigation menu
       navMenu.appendChild(liElement);
   }
}



//function that detects the position of the section on the screen

function checkViewPort(element){

//getting the position
 const position=element.getBoundingClientRect();
 const heightOfElement=element.offsetHeight;
 const widthOfElement=element.offsetWidth;

//if the position of the section at the top of screen
 if (
	position.top >= -heightOfElement &&
	position.left >= -widthOfElement &&
	position.right <=( (window.innerWidth || document.documentElement.clientWidth)+widthOfElement) &&
	position.bottom <= ((window.innerHeight || document.documentElement.clientHeight)+heightOfElement))

 {
   return true;
 }

 return false;

}

//function that toggles the active class attribute depending on the position of each section

function modifyActiveClass()
{


  //looping over sections
  for(section of sections)
  {

    //checking if the section is at viewport
     if(checkViewPort(section))
     {
       //toggling the active class

          //if the class doesnot exist
        if(section.classList.contains('your-active-class')===false)
         {
           //add the class
           section.classList.add('your-active-class');
         }
     }

   else {
          //remove the class
          section.classList.remove('your-active-class');

        }
  }


}


/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav

//calling the function that builds our navigation bar(list of sections);
generatingMenuOfSections();

// Add class 'active' to section when near top of viewport

//this line of code listens for the scrolling event to call the modifyActiveClass  function
document.addEventListener('scroll',modifyActiveClass);

// Scroll to anchor ID using scrollTO event
//this line of code enables soft scrolling after clicking on any link on the navigationbar sections

navMenu.addEventListener('click',scrollSmoothly);




/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
