window.onload = function () {

    const buttonSendMessage = document.getElementById('button-send-message');
    const inputMessage = document.getElementById('input-message');
    const chat = document.getElementById('field-messages');
    const botSwitch = document.getElementById('bot-switch');
    const AvatarImg = document.getElementById('background-avatar');
    let isCheckboxChecked = false;

    const arrayWord = ["Очень интересно",
        "Расскажи еще что нибудь",
        "Продолжай не останавливайся",
        "Ты прирожден писать, ударение поставь сам",
        "Рад видеть твои сообщения",
        "Вот как",
        "Поговорим",
        "Совсем тебе скучно",
        "Даже не знаю, что на это ответить",
        "Понятно",
        "Ясно",
        "хаха"];

    const classNamesMessages = {
        USER_MESSAGES: "user-messages",
        BOT_MESSAGES: "bot-messages",
        TIMESTAMP: "timestamp"
    }

    const stateAttribute = {
        DISABLED: "disabled"
    }
    const objectWitchClassName = {
        INACTIVE: "inactive"
    }

    function selectRandomWord() {
        return arrayWord[Math.floor(Math.random() * arrayWord.length)];
    }

    function createTimestamp() {
        return new Date().toLocaleTimeString().slice(0, -3);
    }

    function createDiv() {
        return document.createElement("div");
    }

    function createMessageUser() {
        const messageContainer = createDiv();
        messageContainer.className = classNamesMessages.USER_MESSAGES;
        messageContainer.innerHTML = inputMessage.value;
        appendTimestamp(messageContainer);
        return messageContainer;
    }

    function createMessageBot (){
        const messageContainer = createDiv();
        messageContainer.className = classNamesMessages.BOT_MESSAGES;
        messageContainer.innerHTML = selectRandomWord();
        appendTimestamp(messageContainer);
        return messageContainer;
    }

    function appendTimestamp(message) {
        const timestampContainer = createDiv();
        timestampContainer.className = classNamesMessages.TIMESTAMP;
        timestampContainer.innerHTML = createTimestamp();
        message.append(timestampContainer);
    }

    function sendMessage() {
        chat.append(createMessageUser());
        if(isCheckboxChecked){
            chat.append(createMessageBot());
        }
    }

    function switchAvatar() {
        if (isCheckboxChecked) {

            AvatarImg.classList.remove(objectWitchClassName.INACTIVE);
        }
        else {
            AvatarImg.classList.add(objectWitchClassName.INACTIVE);
        }
    }

    function isInputEmpty() {
        return inputMessage.value === "";
    }

    function disabletButtonIfInputEmpty() {
        if (isInputEmpty()) {
            buttonSendMessage.setAttribute(stateAttribute.DISABLED, true);
        }
        else {
            buttonSendMessage.removeAttribute(stateAttribute.DISABLED);
        }
    }

    function scrollChat() {
        chat.scrollBy({ top: 1000, left: 0, behavior: 'smooth' });
    }

    function clearInput() {
        inputMessage.value = "";
    }

    function resetInput() {
        clearInput();
        disabletButtonIfInputEmpty()
    }

    botSwitch.onclick = function () {
        isCheckboxChecked = botSwitch.checked
        switchAvatar();
    }

    inputMessage.oninput = function () {
        disabletButtonIfInputEmpty()
    }

    buttonSendMessage.onclick = function () {
        sendMessage();
        resetInput()
        scrollChat();
    }
}