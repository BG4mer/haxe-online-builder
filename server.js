import express from "express";
import fileUpload from "express-fileupload";
import { exec } from "child_process";
import fs from "fs";
import AdmZip from "adm-zip";
import path from "path";

const app = express();
app.use(fileUpload());

app.post("/compile", async (req, res) => {
    if (!req.files || !req.files.zip) {
        return res.status(400).send("No zip provided");
    }

    const zipFile = req.files.zip;
    const tempDir = "/tmp/project_" + Date.now();

    fs.mkdirSync(tempDir);

    const zip = new AdmZip(zipFile.data);
    zip.extractAllTo(tempDir, true);

    const entries = fs.readdirSync(tempDir);
    let projectPath = tempDir;

    if (entries.length === 1 && fs.lstatSync(path.join(tempDir, entries[0])).isDirectory()) {
        projectPath = path.join(tempDir, entries[0]);
    }

    console.log("PROJECT PATH:", projectPath);

    const BUILD_CMD = "lime build windows";

    exec(BUILD_CMD, { cwd: projectPath }, (err, stdout, stderr) => {
        if (err) {
            console.log(stderr);
            return res.status(500).send("Compile failed:\n" + stderr);
        }

        const exportFolder = path.join(projectPath, "export");

        if (!fs.existsSync(exportFolder)) {
            return res.status(500).send("No export folder found. Build failed.");
        }

        const outZip = new AdmZip();
        outZip.addLocalFolder(exportFolder);

        const data = outZip.toBuffer();

        res.set({
            "Content-Type": "application/zip",
            "Content-Disposition": "attachment; filename=build.zip",
        });

        return res.send(data);
    });
});

app.listen(3000, () => console.log("Build server running on port 3000"));
