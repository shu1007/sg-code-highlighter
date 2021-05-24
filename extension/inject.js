const patterns = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#x27;": "'",
    "&#x60;": "`"
};

const getHilightHtml = (code, lang) => {
    const useLang =
        lang == null || Prism.languages[lang] == null ? "clike" : lang;

    return `<div class="code">${Prism.highlight(
        code.replace(/&(lt|gt|amp|quot|#x27|#x60);/g, function (match) {
            return patterns[match];
        }),
        Prism.languages[useLang],
        useLang
    )}</div>`;
};

const getHtml = (original) => {
    const regex = RegExp("```.*?\n.+?```", "gs");
    let index = 0;
    let regArray;
    let codeFound = false;
    const strings = [];
    while ((regArray = regex.exec(original)) !== null) {
        codeFound = true;
        const startIndex = regArray.index;
        if (index <= startIndex - 1) {
            strings.push(original.substring(index, startIndex));
        }
        const foundStr = regArray[0];
        const lang = foundStr.match(/\`\`\`(.*?)\n/)[1].toLowerCase();

        strings.push(
            getHilightHtml(foundStr.match(/\`\`\`.*?\n(.+?)\`\`\`/s)[1], lang)
        );
        index = regex.lastIndex;
    }

    if (!codeFound) return original;

    const textLength = original.length;
    if (index < textLength - 1) {
        strings.push(original.substring(index, textLength));
    }
    return strings.join("");
};

const execAfterCreateElement = (callback, getElement) => {
    const exec = () => {
        const element = getElement();
        if (element != null) {
            clearInterval(checkInterval);
            callback(element);
        }
    };

    const checkInterval = setInterval(exec, 50);
};

const initTextAreaAction = () => {
    const textarea = document.getElementsByTagName("textarea")[0];
    if (textarea && !textarea.classList.contains("added-func")) {
        textarea.addEventListener("keydown", (event) => {
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 13) {
                document
                    .getElementsByClassName("my-auto elevation-0 pr-1 v-btn")[0]
                    .click();
            }
        });
        textarea.classList.add("added-func");
    }
};

const init = () => {
    execAfterCreateElement(
        (list) => {
            const vue = list.__vue__;
            if (vue.checked) {
                return;
            }
            vue.checked = true;

            const changeMessages = () => {
                vue.$children
                    .filter(
                        (c) =>
                            c.$options._componentTag == "message" && !c.checked
                    )
                    .forEach((c) => {
                        c.checked = true;
                        const h = c.$children[0].$children.find(
                            (y) => y.$options._componentTag == "HighlightText"
                        );
                        if (h) {
                            h.$el.innerHTML = getHtml(h.$el.innerHTML);
                        }
                    });
            };
            vue.$options.updated = [changeMessages];
            vue.$options.destroyed.push(() => {
                execInit(document.getElementById("app").__vue__);
            });

            changeMessages();
            initTextAreaAction();
        },
        () => document.querySelector("#message-list .v-list")
    );
};

const execInit = (vue) => {
    if (
        vue.$root._route.path.endsWith("chat") ||
        vue.$root._route.path.endsWith("new")
    ) {
        init();
    }
};

execAfterCreateElement(
    (app) => {
        const vue = app.__vue__;

        vue.$options.updated = [() => execInit(vue)];
        execInit(vue);
    },
    () => document.getElementById("app")
);
