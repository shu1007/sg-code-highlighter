let prettyPrint = function() {
  const CHECKED_CLASS_NAME = "checked";
  const MESSAGE_CLASS_NAME = "message";
  const CHAT_CLASS_NAME = "chat";
  const PRETTYPRINT_CLASS_NAME = "prettyprint";
  const LINENUMS_CLASS_NAME = "linenums";
  const CLASS_ATTRIBUTE = "class";

  // DOM書き換え
  document.querySelectorAll("." + CHAT_CLASS_NAME).forEach(chat => {
    if (chat.classList.contains(CHECKED_CLASS_NAME)) return;

    chat.setAttribute(
      CLASS_ATTRIBUTE,
      [CHAT_CLASS_NAME, CHECKED_CLASS_NAME].join(" ")
    );
    let split = chat.innerText.split("```");
    let length = split.length;
    if (length < 2 || length % 2 == 0) return;

    chat.innerHTML = "";
    for (let i = 0; i < length; i++) {
      if (split[i] === "") continue;

      let pre = document.createElement("pre");
      if (i % 2 == 1) {
        pre.setAttribute(
          CLASS_ATTRIBUTE,
          [
            MESSAGE_CLASS_NAME,
            PRETTYPRINT_CLASS_NAME,
            // 行番号いらない場合は下記のクラスは付けない
            LINENUMS_CLASS_NAME
          ].join(" ")
        );
      } else {
        pre.setAttribute(CLASS_ATTRIBUTE, MESSAGE_CLASS_NAME);
      }
      pre.textContent = split[i].trim();
      chat.append(pre);
    }
  });

  // 構文ハイライトを実行
  PR.prettyPrint();
};

// content_panelを監視
new MutationObserver(() => {
  // talkAreaを監視
  new MutationObserver(prettyPrint).observe(
    document.getElementById("talkArea"),
    {
      childList: true
    }
  );

  prettyPrint();
}).observe(document.getElementById("content_panel"), {
  attributes: true
});

//初期ロード時に実行
prettyPrint();
