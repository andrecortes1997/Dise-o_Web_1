export const useClipboard = () => {
    const clipboard = () => {
        const urlField = document.querySelector("table");
        window.getSelection().removeAllRanges();
        const range = document.createRange();
        range.selectNode(urlField);
        window.getSelection().addRange(range);
        document.execCommand("copy");
    }

    return { clipboard }
}