const LANG_SET = new Set([
    "atom",
    "bash",
    "clike",
    "css",
    "csv",
    "diff",
    "docker",
    "dockerfile",
    "extend",
    "go",
    "groovy",
    "html",
    "insertBefore",
    "javadoclike",
    "javascript",
    "js",
    "jsx",
    "markup",
    "mathml",
    "perl",
    "plain",
    "plaintext",
    "rss",
    "sass",
    "scss",
    "shell",
    "sql",
    "ssml",
    "svg",
    "text",
    "toml",
    "ts",
    "tsx",
    "txt",
    "typescript",
    "vim",
    "xml",
    "yaml",
    "yml"
]);

const getHilightHtml = (code, lang) => {
    const useLang = lang == null || !LANG_SET.has(lang) ? "clike" : lang;
    console.log(useLang);
    return `<div class="code">${Prism.highlight(
        code,
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
        console.log("found");
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
    console.log(`strings: ${strings}`);
    return strings.join("");
};

const init = () => {
    const cb = () => {
        let list = document.querySelector("#message-list .v-list").__vue__;
        if (list != null) {
            clearInterval(waitProcess);
            const changeMessages = () => {
                console.log("change");
                list.$children
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
            list.$options.updated = [changeMessages];
            changeMessages();
        }
    };

    const waitProcess = setInterval(cb, 200);
};

const app = document.getElementById("app").__vue__;
app.$options.updated = [
    () => {
        if (app.$root._route.path.endsWith("chat")) {
            init();
        }
    }
];

if (app.$root._route.path.endsWith("chat")) {
    init();
}
