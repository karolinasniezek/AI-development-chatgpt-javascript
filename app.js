const API_KEY = 'PRIVATE_KEY'
const submitButton = document.querySelector('#submit')
const outputElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const newChatButton = document.querySelector('button')

function changeInput (value) {
    const inputElement = document.querySelector('input')
    inputElement.value = value
}
async function getMessage() {
    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: inputElement.value
                }],
                max_tokens: 100
        })
    }
    try {
        // ToDo: change output after switching between items in history
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        outputElement.textContent = data.choices[0].message.content
        if (data.choices[0].message.content && inputElement.value) {
            const pElement = document.createElement('p')
            pElement.textContent = inputElement.value
            pElement.addEventListener('click', () => changeInput(pElement.textContent))
            historyElement.append(pElement)
        }
    } catch (error) {
        console.error(error)
    }
}
// ToDo: clear output alfer pressing NetChat
function clearInput () {
    inputElement.value = ''
}

submitButton.addEventListener('click', getMessage)
newChatButton.addEventListener('click', clearInput)