window.onload = function () {

    const buttonSendMessage = document.getElementById('button-send-message');
    const inputMessage = document.getElementById('input-message');
    const fieldForRecordingMessages = document.getElementById('field-messages');
    const botSwitch = document.getElementById('bot-switch');
    const AvatarImgSwitch = document.getElementById('background-avatar');
    let isCheckboxChecked = false;

    const arrayWord = ["Очень интересно", "Расскажи еще что нибудь", "Продолжай не останавливайся", "Ты прирожден писать, ударение поставь сам", "Рад видеть твои сообщения", "Вот как", "Поговорим", "Совсем тебе скучно", "Даже не знаю, что на это ответить", "Понятно", "Ясно", "хаха"];

    const classNameMessages = {
        USER_TEXT: "user-text",
        USER_TIMESTAMP: "user-timestamp",
        BOT_TEXT: "bot-text",
        BOT_TIMESTAMP: "bot-timestamp"
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

    function createUserMessage() {
        const messageContainer = createDiv();
        messageContainer.className = classNameMessages.USER_TEXT;
        messageContainer.innerHTML = inputMessage.value;
        appendTimestampToUserMessage(messageContainer);
        return messageContainer;
    }

    function appendTimestampToUserMessage(message) {
        const timestampContainer = createDiv();
        timestampContainer.className = classNameMessages.USER_TIMESTAMP;
        timestampContainer.innerHTML = createTimestamp();
        message.append(timestampContainer);
    }

    function sendUserMessage() {
        fieldForRecordingMessages.append(createUserMessage());
    }

    function createBotMessage() {
        const messageContainer = createDiv();
        messageContainer.className = classNameMessages.BOT_TEXT;
        messageContainer.innerHTML = selectRandomWord();
        appendTimestampToBotMessage(messageContainer);
        return messageContainer;
    }

    function appendTimestampToBotMessage(message) {
        const timestamp = createDiv();
        timestamp.className = classNameMessages.BOT_TIMESTAMP;
        timestamp.innerHTML = createTimestamp();
        message.append(timestamp);
    }

    function sendBotMessage() {
        fieldForRecordingMessages.append(createBotMessage());
    }

    function scrollpage() {
        fieldForRecordingMessages.scrollBy({ top: 1000, left: 0, behavior: 'smooth' });
    }

    function isInputEmpty() {
        if (inputMessage.value === "") {
            buttonSendMessage.setAttribute(stateAttribute.DISABLED, true);
        }
        else {
            buttonSendMessage.removeAttribute(stateAttribute.DISABLED);
        }
    }

    function clearInput() {
        inputMessage.value = "";
    };

    function switchAvatar() {
        if (isCheckboxChecked === true) {

            AvatarImgSwitch.classList.remove(objectWitchClassName.INACTIVE);
        }
        else {
            AvatarImgSwitch.classList.add(objectWitchClassName.INACTIVE);
        }
    }

    botSwitch.onclick = function () {
        isCheckboxChecked = botSwitch.checked
        switchAvatar();
    }

    inputMessage.oninput = function () {
        isInputEmpty();
    };

    buttonSendMessage.onclick = function () {
        sendUserMessage();
        if (isCheckboxChecked) {
            sendBotMessage();
        }
        clearInput();
        isInputEmpty();
        scrollpage();
    }
}