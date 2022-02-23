# Griphitor Desktop

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://www.javascript.com/)   [![Build/release win](https://github.com/Griphitor/Griphitor/actions/workflows/build-win.yml/badge.svg)](https://github.com/Griphitor/Griphitor/actions/workflows/build-win.yml) [![Build/release mac](https://github.com/Griphitor/Griphitor/actions/workflows/build-mac.yml/badge.svg)](https://github.com/Griphitor/Griphitor/actions/workflows/build-mac.yml) [![Build/release linux](https://github.com/Griphitor/Griphitor/actions/workflows/build-linux.yml/badge.svg)](https://github.com/Griphitor/Griphitor/actions/workflows/build-linux.yml)

**The official desktop application for Griphitor built with electron.**

Preview of main window
![Screenshot-of-Griphitor](https://user-images.githubusercontent.com/67136658/141723166-d1f7b2a2-3e6f-4539-b636-37707eddb5ec.png)

Preview of run code button
![Run-Code-View](https://user-images.githubusercontent.com/67136658/141723118-226d896e-4f57-4480-9946-e9068ba2ccb1.png)

## Features

Fast load times,

Export as .zip, or single file

Pre-included libraries: <a href="https://github.com/Griphcode/Griphitor-IDE/wiki/List-of-pre-included-libraries">List here</a>

Global shortcuts:

| Shortcut               | Use                           |
| ---------------------- | ----------------------------- |
| `Ctrl/⌘` + `Alt` + `A` | Show about menu               |
| `Ctrl/⌘` + `Alt` + `i` | Show devtools                 |
| `Ctrl/⌘` + `Alt` + `l` | Show included libraries                 |

## Todo

- [X] Add syntax highlight
- [X] Add ability to open files to edit
- [X] Add terminal
- [ ] Better UI
- [X] Cross-platform
- [X] include libaries out of the box
- [ ] Run code without errors
- [ ] Customize Griphitor IDE

## Installation

You can [download the latest release](https://github.com/Griphcode/Griphitor-IDE/releases) for your operating system or build it yourself (see below).

## Building

You'll need [Node.js](https://nodejs.org) installed on your computer in order to build this app.

```
git clone https://github.com/Griphcode/Griphitor-IDE
cd Griphitor-IDE
npm install
```

#### Test app:

```
npm run start
```

#### Build app:

```
Run first:
npm run pack

Run the one for your OS:

Windows:
npm run dist-win

Mac:
npm run dist-mac

Linux:
npm run dist-linux
```

## Credits:

Logo made by Givinghawk https://givinghawk.xyz

ide - oxmc & Griphcode

app - oxmc

security.md - Advik-B
