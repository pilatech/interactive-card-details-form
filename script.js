const form = document.querySelector('.form')
const main = document.querySelector('.main')
const inputs = document.querySelectorAll('.form__input')
const errorElements = document.querySelectorAll('.error')
const thanksBtn = document.querySelector('.thank-you__btn')

let error = true

const details = {
  name: '',
  cardNumber: '',
  month: '',
  cvc: '',
  year: ''
}

thanksBtn.addEventListener('click', e => {
 document.location.reload()
})

inputs.forEach(input => {
 input.value = details[input.name]
 input.addEventListener('input', e => {
  const { name, value } = e.target

  function err(name){
   e.target.style.borderColor = 'hsl(0, 100%, 66%)'
   printError(name)
  }

  function unErr(name){
   e.target.style.borderColor = 'hsl(270, 3%, 87%)'
   removeError(name)
  }

   if(!details[name].trim()){
    err(name)
   } else {
    unErr(name)
   }

   if(name === 'cardNumber'){
     (parseInt(details[name]) && details[name].toString().trim().length === 15) ? unErr(name) : err(name)
   } 
   if(name === 'cvc') {
    parseInt(details[name]) && details[name].toString().length === 2 ? unErr(name) : err(name)
   }

   if(name === 'year' || name === 'month') {
    (parseInt(details['year']) && (parseInt(details['year']) >= 22) && (parseInt(details['year']) < 100)) && parseInt(details['month']) && (parseInt(details['month']) <= 12) && (parseInt(details['month']) >= 1) && details['month'].toString().length === 2 && details['year'].toString().length === 2 ? unErr(name) : err(name)
   }

   details[name] = value
   updateCard()
 })
})

function printError(name){
 errorElements.forEach(element => {
  const theErrorElement = findErrorElement(element, name)
  theErrorElement.textContent = 'Invalid input'
 })
} 

function removeError(name){
 errorElements.forEach(element => {
  const theErrorElement = findErrorElement(element, name)
  theErrorElement.textContent = ''
 })
}

form.addEventListener('submit', e => {
 e.preventDefault()
 errorsAvailable()
 if(error){
  main.classList.remove('active')
 } else {
  main.classList.add('active')
 } 
})

function errorsAvailable(){
 inputs.forEach(input => {
  if(!details[input.name].trim()){
   error = true
  } else {
   error = false
  }
 })
}

function findErrorElement(element, name){
 let foundElement = ''
 if(element.classList.contains(name)) {
  foundElement = element
 } 
 return foundElement
}

function updateCard(){
 document.querySelector('.card__title').textContent = details.name.slice(0, 23)
 document.querySelector('.card__number').textContent = details.cardNumber.slice(0, 16)
 document.querySelector('.card__cvc').textContent = details.cvc.slice(0, 3)
 document.querySelector('.card__exp').textContent = `${details.month.slice(0, 2)}/${details.year.slice(0, 2)}`
}

