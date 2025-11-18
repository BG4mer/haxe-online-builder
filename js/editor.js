let editor;
let files = {
    "Main.hx": "class Main {\n\tstatic function main() {\n\t\ttrace('Hello from editor!');\n\t}\n}"
};

let currentFile = "Main.hx";

require.config({ paths: { vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs" } });

require(["vs/editor/editor.main"], function () {

    editor = monaco.editor.create(document.getElementById("editor"), {
        value: files[currentFile],
        language: "haxe",
        theme: "vs-dark",
        automaticLayout: true
    });

    loadFileList();
});

function loadFileList() {
    const panel = document.getElementById("fileList");
    panel.innerHTML = "";

    Object.keys(files).forEach(name => {
        const div = document.createElement("div");
        div.innerText = name;
        div.onclick = () => switchFile(name);
        panel.appendChild(div);
    });
}

function switchFile(name) {
    files[currentFile] = editor.getValue();
    currentFile = name;
    editor.setValue(files[name]);
}

document.getElementById("addFileBtn").onclick = () => {
    const newName = prompt("New file name:");
    if (!newName) return;
    files[newName] = "";
    loadFileList();
    switchFile(newName);
};
