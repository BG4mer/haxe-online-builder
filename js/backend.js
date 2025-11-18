const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".zip";
fileInput.style.display = "none";
document.body.appendChild(fileInput);

document.getElementById("compileBtn").onclick = () => {
    fileInput.click();
};

fileInput.onchange = async () => {
    const file = fileInput.files[0];
    if (!file) return;

    log("Uploading ZIP...");
    
    const form = new FormData();
    form.append("zip", file);

    try {
        let res = await fetch("https://YOUR-RAILWAY-URL/compile", {
            method: "POST",
            body: form
        });

        if (!res.ok) {
            log("Server error: " + res.status);
            return;
        }

        log("Build completed. Downloading...");

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "build.zip";
        a.click();

        log("Downloaded build.zip!");
    } catch (err) {
        log("Error: " + err);
    }
};

function log(msg) {
    const out = document.getElementById("output");
    out.innerText += msg + "\n";
    out.scrollTop = out.scrollHeight;
}
