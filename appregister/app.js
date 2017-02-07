const form = document.getElementById('registar');
const input = form.querySelector('input');

const ul = document.getElementById('invitedList');



function createLI(text){
	 const li = document.createElement('li');
  li.textContent = text;
 // add label and checkbox
  const label = document.createElement('label');
  label.textContent = 'Confirmed';
   const checkbox = document.createElement('input');
   checkbox.type ='checkbox';
   label.appendChild(checkbox);
   li.appendChild(label);
// edit BTN 
const editButton = document.createElement('button');
  editButton.textContent = 'edit';
    li.appendChild(editButton);
   //END
   //end - ADD REMOVE BTN 
const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    li.appendChild(removeButton);
   //END ADD
   return li;
}


form.addEventListener('submit', (e) => {
	e.preventDefault();
  // console.log(input.value);
  const text = input.value;
  input.value = '';   //clear value inside imput after adding text 
  //const ul = document.getElementById('invitedList');
  const li = createLI(text);
   ul.appendChild(li);
});

ul.addEventListener('change', (e) => {
	//console.log(e.target.checked);
	const checkbox = event.target;
	const checked =checkbox.checked;
	const listItem = checkbox.parentNode.parentNode;

	if (checked){
		listItem.className ='responded';
	} else{
		listItem.className = '';
	}

});

ul.addEventListener('click', (e) => {
     if(e.target.tagName === 'BUTTON'){
     	const btn = e.target;

     	const li = btn.parentNode;
     	const ul = li.parentNode;
     	if (btn.textContent ==='remove'){

     	ul.removeChild(li);
            } else  if(btn.textContent ==='edit') {
            	console.log('EDIOT');
            }
     

     }
});
  


33333333333333333333333333333333333