import { Modal } from './modal.js'
import { AlertError } from './alert-error.js'
import { calculateIMC, isNotANumber } from './utils.js'

const form = document.querySelector('form')
const inputWeight = document.querySelector('#weight')
const inputHeight = document.querySelector('#height')

inputWeight.focus()

inputWeight.oninput = () => AlertError.close()
inputHeight.oninput = () => AlertError.close()

function displayResultMessage(result) {
  const message = `Seu IMC é de ${result}`

  Modal.message.innerText = message
  Modal.open()
}

form.onsubmit = (event) => {
  event.preventDefault()

  const weight = Number(inputWeight.value)
  const height = Number(inputHeight.value)

  const weightOrHeightIsNotANumber =
    isNotANumber(weight) || isNotANumber(height)

  if (weightOrHeightIsNotANumber) {
    AlertError.open()
    inputWeight.value = inputWeight.value = ''
    inputWeight.focus()
    inputHeight.value = inputHeight.value = ''
    return
  }

  AlertError.close()

  const result = calculateIMC(weight, height)
  displayResultMessage(result)
  inputWeight.value = inputWeight.value = ''
  inputHeight.value = inputHeight.value = ''
}
