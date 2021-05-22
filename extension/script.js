window.onload = () => {
    const setScript = (name) => {
        const script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", chrome.runtime.getURL(name));
        (document.head || document.documentElement).appendChild(script);
    };
    setScript("prism.js");
    setScript("inject.js");
};
