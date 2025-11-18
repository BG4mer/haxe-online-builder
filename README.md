# Haxe Online Compiler (Mobile Version)

This is a GitHub Pages project that looks like a mini Visual Studio Code
and lets users edit Haxe/FNF engine files directly in the browser.

## Features
- Monaco code editor
- File tree panel
- Live console output
- Mobile friendly
- Zero desktop required

## Backend
This repo ships with a fake compiler.

To compile real Haxe/FNF builds:
You must connect this frontend to a server (Railway / Replit) that runs:

- Haxe
- hxcpp
- lime
- flixel
- FNF engine dependencies

Use POST /compile to send project zips and receive compiled builds.