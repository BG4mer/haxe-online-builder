document.getElementById("compileBtn").onclick = () => {
    log("Preparing build...");
    setTimeout(() => log("Checking files..."), 700);
    setTimeout(() => log("Simulating Haxe compile..."), 1500);
    setTimeout(() => log("NOTE: No backend connected yet."), 2200);
    setTimeout(() => log("Your site works! Add a backend to compile real FNF builds."), 3000);
};

function log(msg) {
    const out = document.getElementById("output");
    out.innerText += msg + "\n";
    out.scrollTop = out.scrollHeight;
}
