import './style.css'

//from grabs the 'form' id from the DOM
const form = document.querySelector('form');

//listens for submit to be clicked
//second arg is async callback function
//that handles when submit is clicked
form.addEventListener('submit', async(e) => {
  //by default when submit is clicked the page is reloaded
  //calling preventDefault() prevents this 
  e.preventDefault();

  //show spinner to show api call in progress
  showSpinner();

  //this data object behaves like a JS map
  const data = new FormData(form);

  //parsing prompt data from API response 
  const response = await fetch("http://localhost:8080/dream", {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json",
    },
    body : JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  if(response.ok){
    //await response to be populated and store in image
    const { image } = await response.json();

    //grabbing result id and replacing html when submit clicked
    const result = document.querySelector("#result");
    result.innerHTML = `<img src="${image}" width="512" \>`;
  }
  else{
    const err = await response.text();
    alert(err);
    console.error(err);
  }


  hideSpinner();
});


//functions to show api call in progress
function showSpinner(){
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Dreaming... <span class="spinner">🧠</span>';

}

function hideSpinner(){
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Dream';
}