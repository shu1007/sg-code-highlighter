let appendPre = (chat, classes, text) => {
  let pre = document.createElement("pre");
  pre.setAttribute(CLASS_ATTRIBUTE, classes.join(" "));
  pre.textContent = text;
  chat.append(pre);
};

let prettyPrint = () => {
  let regex = RegExp(REGEX_PATTERN, "gs");
  // DOM書き換え
  document
    .querySelectorAll(`.${CHAT_CLASS_NAME}:not(.${CHECKED_CLASS_NAME})`)
    .forEach(chat => {
      chat.setAttribute(
        CLASS_ATTRIBUTE,
        [CHAT_CLASS_NAME, CHECKED_CLASS_NAME].join(" ")
      );

      let index = 0;
      let regArray;
      let innerText = chat.innerText;
      chat.innerHTML = "";

      while ((regArray = regex.exec(innerText)) !== null) {
        let startIndex = regArray.index;
        if (index <= startIndex - 1) {
          //通常テキスト処理
          appendPre(
            chat,
            [MESSAGE_CLASS_NAME],
            innerText.substring(index, startIndex)
          );
        }
        let foundStr = regArray[0];
        let option = foundStr.match(/\`\`\`(.*?)\n/)[1].toLowerCase();
        let classes = [
          MESSAGE_CLASS_NAME,
          PRETTYPRINT_CLASS_NAME,
          LINENUMS_CLASS_NAME
        ];
        if (EXTENSIONS_SET.has(option)) {
          classes = classes.concat(`lang-${option}`);
        }
        appendPre(chat, classes, foundStr.match(/\`\`\`.*?\n(.+?)\`\`\`/s)[1]);
        index = regex.lastIndex;
      }

      let textLength = innerText.length;
      if (index < textLength - 1) {
        appendPre(
          chat,
          [MESSAGE_CLASS_NAME],
          innerText.substring(index, textLength)
        );
      }
    });

  // 構文ハイライトを実行
  PR.prettyPrint();
};

let talkAreaObserver = new MutationObserver(prettyPrint);
let observeTalkArea = () => {
  talkAreaObserver.observe(document.getElementById("talkArea"), {
    childList: true
  });
};

let addSendMessageEvent = () => {
  document.getElementById("message").addEventListener("keydown", event => {
    if (event.metaKey && event.keyCode === ENTER_KEY_CODE) {
      document.getElementsByClassName("mid-button")[0].click();
    }
  });
};

// content_panelを監視
new MutationObserver(() => {
  talkAreaObserver.disconnect();
  talkAreaObserver = new MutationObserver(prettyPrint);

  prettyPrint();
  observeTalkArea();
  addSendMessageEvent();
}).observe(document.getElementById("content_panel"), {
  attributes: true
});

//初期ロード時に実行
prettyPrint();
observeTalkArea();
addSendMessageEvent();
