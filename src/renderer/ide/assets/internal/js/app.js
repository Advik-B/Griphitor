/*NodeJS Modules*/
var compressor = require('node-minify');
var path = require('path');
const tmp = require('tmp');
tmp.setGracefulCleanup();
const tmpobj = tmp.fileSync({ mode: 0o644, prefix: 'temp-code-', postfix: '.html' });
const fs = require('fs');
const log4js = require("log4js");
log4js.configure({
  appenders: { griph: { type: "file", filename: "GRIPH-STARTUP.log" } },
  categories: { default: { appenders: ["griph"], level: "error" } }
});
const logger = log4js.getLogger("Griph");
//const { ipcMain, ipcRenderer } = require('electron');
try {
  if (fs.existsSync("./directory-name")) {
    console.log("Directory exists.")
  } else {
    console.log("Directory does not exist.")
  }
} catch(e) {
  console.log("An error occurred.")
}
/* Set DiscordRPC client up */
const { Client } = require("discord-rpc");
const rpc = new Client({
  transport: "ipc",
});

/*Get buttons*/
var OpenBtn = document.getElementById('OpenBtn');
var AboutBtn = document.getElementById('AboutBtn');
var PreviewBtn = document.getElementById('PreviewBtn');
var SettingsBtn = document.getElementById('SettingsBtn');
var LastFileCheckbox = document.getElementById('OpenLastFile');
var DiscordRPCCheckbox = document.getElementById('ShowDiscordRPC');

/*Drop down selector*/
var ThemeSelect = document.getElementById('ThemeSelect');
var IconSelect = document.getElementById('IconSelect');

/*File input*/
var fileOpenInput = document.getElementById('file-open-input');

/*DEBUG*/
function logval() {
  console.log(cm.getValue());
  console.log(libpath);
};

var editorWrapper = document.getElementsByClassName('editor')[0];
editorWrapper.className = 'editor full-width';
var onCmUpdate = null;
var cm;

window.addEventListener('DOMContentLoaded', function(e) {
  console.log("DOM Ready");
  cm = CodeMirror.fromTextArea(editor, {
      lineNumbers: true,
      styleActiveLine: true,
      mode: 'text/html',
      theme: 'griphitor',
      viewportMargin: '25',
      scrollbarStyle: 'overlay',
      autofocus: true,
      extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        },
        "Ctrl-S": function(cm) {
          console.log("User Requests save");
          var b64d = btoa(reader.result);
          storeData("CurrentFile", `{"filename": "${fname}", "filecontent": "${b64d}", "filemode": "${mode}"}`);
        },
        "Alt-F": "findPersistent"
      },
      gutters: ["CodeMirror-lint-markers"],
      lint: true
  });
  /* DiscordRPC */
  var DiscordRPC = getData('DiscordRPC');
  //console.log(DiscordRPC);
  if (DiscordRPC == null) {
    console.warn("No DiscordRPC pref selected, using default: false");
    storeData('DiscordRPC', "false");
  };
  if (DiscordRPC) {
    console.log("DiscordRPC pref saved, enabled: "+DiscordRPC);
  } else {
    DiscordRPCCheckbox.checked = false;
  };
  if (DiscordRPC == "true") {
    DiscordRPCCheckbox.checked = true;
    /* Set activity */
    /* Just started */
    rpc.on("ready", () => {
      console.log("DiscordRPC is ready now!");
      rpc.setActivity({
        details: "Griphitor",
        state: `Just started`,
        startTimestamp: new Date(),
        largeImageKey: `logo`,
        largeImageText: `Just opened griphitor`,
        //smallImageKey: `${filetypeimg}`,
        buttons: [
          {
            label: "Install Griphitor",
            url: "https://griphitor.xyz"
          }
        ]
      });
    });
  };
  DiscordRPCCheckbox.onchange = function() {
    var option = DiscordRPCCheckbox.checked;
    //console.log(option);
    if (option == null) {
      console.warn("No DiscordRPC pref selected, using default: false");
      storeData('DiscordRPC', "false");
    } else {
      console.log("DiscordRPC: "+option);
      if (getData('DiscordRPC')) {
        updateData('DiscordRPC', option);
      } else {
        storeData('DiscordRPC', option);
      };
      if (option == true) {
        var nexttext = "Show Activity In DiscordRPC";
        rpc.login({
          clientId: "938129164089851914"
        });
      } else {
        var nexttext = "Not Show Activity In DiscordRPC";
      };
      iziToast.show({
        id: 'DiscordRPC',
        theme: 'dark',
        title: 'DiscordRPC',
        displayMode: 2,
        message: `Griphitor Will ${nexttext}`,
        position: 'center',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'assets/internal/images/discord/Discord-Logo-Color.png',
        imageWidth: 70,
        layout: 2,
        onClosed: function(instance, toast, closedBy){
          console.log("Closedby: "+closedBy);
        }
      });
    };
  };
  /* Buttons */
  /*ExprtBtn.addEventListener("click", () => {
    if (cm.getValue() == '') {
      Notif.classList.add("danger");
      play('assets/internal/sound/error.mp3');
      console.log("All inputs are empty.");
      NotifTitle.innerHTML = 'Error:';
      NotifMessage.innerHTML = 'No code to export, please fill in the editor.';
      NotifCheckbox.style.display='none';
      Notif.style.display='block';
    } else {
      Notif.classList.add("info");
      NotifBoxTitle.innerHTML = 'What do you want to export this as?';
      NotifMessage.innerHTML = '';
      NotifCheckbox.style.display='block';
      NotifBox.style.display='block';
      ExprtBtn1.addEventListener("click", () => {
        if (NotifCheckbox1.checked == true) {
          console.log("Exporting as file");
          NotifTitle.innerHTML = 'Exporting';
          NotifMessage.innerHTML = 'Exporting file...';
          NotifCheckbox.style.display='none';
          try {
            var rawusercode = cm.getValue();
            var usercode = rawusercode.replace(`{!GriphLib}/css/fa-4.7.0-min.css`, `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css`);
            usercode = usercode.replace(`{!GriphLib}/css/fa-5.7.0-min.css`, `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.7.0/css/font-awesome.min.css`);
            usercode = usercode.replace(`{!GriphLib}/css/tailwindcss-2.2.16-min.css`, `https://unpkg.com/tailwindcss@2.2.16/dist/tailwind.min.css`);
            GenFile(usercode, "html");
            Notif.classList.add("success");
            play('assets/internal/sound/success.mp3');
            NotifTitle.innerHTML = 'Export Complete!';
            NotifMessage.innerHTML = 'Exporting Completed!';
            NotifCheckbox.style.display='none';
            Notif.style.display='block';
          } catch (e) {
            console.log(e);
            Notif.classList.add("danger");
            play('assets/internal/sound/error.mp3');
            NotifTitle.innerHTML = 'Error:';
            NotifMessage.innerHTML = `An error has accured, here is the error: \n${e}`;
            NotifCheckbox.style.display='none';
            Notif.style.display='block';
          };
        } else if (NotifCheckbox2.checked == true) {
          Notif.classList.add("info");
          console.log("Exporting as zip");
          NotifTitle.innerHTML = 'Exporting';
          NotifMessage.innerHTML = 'Exporting files...';
          NotifCheckbox.style.display='none';
          try {
            MakeZip(cm.getValue());
            Notif.classList.add("success");
            play('assets/internal/sound/success.mp3');
            NotifTitle.innerHTML = 'Export Complete!';
            NotifMessage.innerHTML = 'Exporting Completed!';
            NotifCheckbox.style.display='none';
            Notif.style.display='block';
          } catch (e) {
            console.log(e);
            Notif.classList.add("danger");
            play('assets/internal/sound/error.mp3');
            NotifTitle.innerHTML = 'Error:';
            NotifMessage.innerHTML = `An error has accured, here is the error: \n${e}`;
            NotifCheckbox.style.display='none';
            Notif.style.display='block';
          };
        };
      });
    };
  });*/
  AboutBtn.addEventListener("click", () => {
    modalOpen2('About Griphitor', 'about.html');
    /*$("#ex1").modal({
      fadeDuration: 300,
      fadeDelay: 0.50,

    });*/
  });
  SettingsBtn.addEventListener("click", () => {
    var Settings = document.getElementById('settings-div');
    if (Settings) {
      if (Settings.style.display == "block") {
        Settings.style.display = "none";
      } else {
        Settings.style.display = "block";
      };
    };
  });
  OpenBtn.addEventListener("click", () => {
    if (fileOpenInput) {
      fileOpenInput.click();
    }
    fileOpenInput.onchange = function(e){
      var file = fileOpenInput.files[0];
      var reader = new FileReader();
      var b64 = new FileReader();
      var ftype = file.type;
      var fname = file.name;
      var ftypestr = fname.split(".");
      var laststr = ftypestr[ftypestr.length - 1];
      console.info(`{"FileName": "${fname}", "FileType": "${ftype}", "FileExtention": "${laststr}"}`);
      //console.log(fname);
      //console.log(ftype);
      //console.log(file);
      //console.log(laststr);
      var mode = "text/plain";
      var base64String;
      var showinfo = "true";
      //console.log(showinfo);
      /*iziToast.show({
        id: 'Loading File',
        theme: 'dark',
        title: 'Loading file...',
        displayMode: 2,
        message: 'Please wait while i read the file...',
        position: 'center',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'assets/internal/images/app.png',
        imageWidth: 70,
        layout: 2,
        onClosed: function(instance, toast, closedBy){
          console.log("Closedby: "+closedBy);
        }
      });*/
      b64.onload = async function(e) {
        var base64String = b64.result.replace("data:", "").replace(/^.+,/, "");
        reader.onload = function(e) {
		      if (ftype != "") {
            var showinfo = "true";
            if (ftype == "image/png" || ftype == "image/jpg" || ftype == "image/jpeg" || ftype == "image/gif" || ftype == "video/mp4" || ftype == "audio/mpeg" || ftype == "image/webp" || ftype == "video/webm" || ftype == "video/quicktime") {
              modalOpen('modal-iframe', `Viewing ${fname}`, `data:${ftype};base64,${base64String}`);
              //document.getElementById("Loading File").style.display = "none";
              var showinfo = "flase";
            } else {
              var mode = ftype;
            };
            /* TS */
            if (ftype == "video/vnd.dlna.mpeg-tts") {
              if (laststr == "ts") {
                var mode = "javascript";
              };
            };
            /* EXE */
            if (ftype == "application/x-msdownload") {
              if (laststr == "exe") {
                iziToast.show({
                  id: 'Not allowed',
                  theme: 'dark',
                  title: 'File Not allowed',
                  displayMode: 2,
                  message: 'That filetype is not allowed to be opened.',
                  position: 'center',
                  transitionIn: 'flipInX',
                  transitionOut: 'flipOutX',
                  progressBarColor: 'rgb(0, 255, 184)',
                  image: 'assets/internal/images/error.png',
                  imageWidth: 70,
                  layout: 2,
                  onClosed: function(instance, toast, closedBy){
                    console.log("Closedby: "+closedBy);
                  }
                });
                //document.getElementById("Loading File").style.display = "none";
                play('assets/internal/sound/error.mp3');
                var showinfo = "false";
              };
            };
            /* ZIP */
            if (ftype == "application/x-zip-compressed") {
              if (laststr == "zip") {
                iziToast.show({
                  id: 'Unable to open',
                  theme: 'dark',
                  title: 'Unable to open zip',
                  displayMode: 2,
                  message: 'Griphitor cannot open zips yet',
                  position: 'center',
                  transitionIn: 'flipInX',
                  transitionOut: 'flipOutX',
                  progressBarColor: 'rgb(0, 255, 184)',
                  image: 'assets/internal/images/error.png',
                  imageWidth: 70,
                  layout: 2,
                  onClosed: function(instance, toast, closedBy){
                    console.log("Closedby: "+closedBy);
                  }
                });
                play('assets/internal/sound/error.mp3');
                var showinfo = "false";
              };
            };
          } else {
            var showinfo = "true";
            if (fname != "") {
              if (laststr == "md") {
                var mode = "markdown";
              } else if (laststr == "php") {
                var mode = "php";
              } else if (laststr == "js" || laststr == "ts") {
                var mode = "javascript";
              } else {
                var mode = "text/plain";
              };
              /* APK */
              if (laststr == "apk") {
                iziToast.show({
                  id: 'Unable to open',
                  theme: 'dark',
                  title: 'Unable to open apk',
                  displayMode: 2,
                  message: 'Griphitor cannot open apks',
                  position: 'center',
                  transitionIn: 'flipInX',
                  transitionOut: 'flipOutX',
                  progressBarColor: 'rgb(0, 255, 184)',
                  image: 'assets/internal/images/error.png',
                  imageWidth: 70,
                  layout: 2,
                  onClosed: function(instance, toast, closedBy){
                    console.log("Closedby: "+closedBy);
                  }
                });
                play('assets/internal/sound/error.mp3');
                var showinfo = "false";
              };
            } else {
              play('assets/internal/sound/error.mp3');
              var showinfo = "false";
            };
          };
          //console.log(showinfo);
          if (showinfo == "true") {
            if (mode == "") {
              console.error("ERROR NO MODE SET");
            };
            document.getElementById("FileName").innerHTML=`Editing ${fname}`;
            cm.setOption("mode", mode);
            if (mode == "text/html") {
              PreviewBtn.style.display = "block";
              var filetypeimg = "html5";
            } else {
              PreviewBtn.style.display = "none";
            };
            /* RPC Image */
            if (laststr == "js") {
              var filetypeimg = "javascript";
            };
            //console.log(reader.result);
            cm.setValue(reader.result);
            /* Desktop only */
            rpc.setActivity({
              details: "Editing a file",
              state: `${fname}`,
              startTimestamp: new Date(),
              smallImageKey: `logo`,
              //largeImageText: `${filetypeimg}`,
              largeImageKey: `${filetypeimg}`,
              buttons: [
                {
                  label: "Install Griphitor",
                  url: "https://griphitor.xyz"
                }
              ]
            });
            var b64d = btoa(reader.result);
            storeData("CurrentFile", `{"filename": "${fname}", "filecontent": "${b64d}", "filemode": "${mode}"}`);
          };
        };
      };
      b64.readAsDataURL(file);
      reader.readAsText(file);
    }
  });
  /*Get editor theme pref*/
  var EditorTheme = getData('EditorTheme');
  if (EditorTheme == null) {
    console.warn("No theme saved, using griphitor");
    storeData('EditorTheme', "griphitor");
  };
  if (EditorTheme) {
    console.log("Theme saved, using "+EditorTheme);
    ThemeSelect.value = EditorTheme;
    if (EditorTheme == "white wash") {
      cm.setOption("theme", "default");
    } else {
      cm.setOption("theme", EditorTheme);
    };
  } else {
    ThemeSelect.value = 'griphitor';
    cm.setOption("theme", 'griphitor');
  }
  ThemeSelect.onchange = function() {
    var theme = ThemeSelect.options[ThemeSelect.selectedIndex].textContent;
    if (theme == null) {
      console.warn("No theme selected, using griphitor");
      play('assets/internal/sound/error.mp3');
      storeData('EditorTheme', "griphitor");
    } else {
      console.log("Theme selected: "+theme);
      cm.setOption("theme", theme);
      if (getData('EditorTheme')) {
        updateData('EditorTheme', theme);
      } else {
        storeData('EditorTheme', theme);
      }
    };
  };
  /*Get editor icon pref*/
  var EditorIcon = getData('EditorIcon');
  if (EditorIcon == null) {
    console.warn("No icon pref saved, using Font Awesome 5");
    storeData('EditorIcon', "fontawesome");
  };
  if (EditorIcon) {
    console.log("Icon pref saved, using "+EditorIcon);
    if (EditorIcon == "fontawesome") {
      var EditorIcon = "Font Awesome 5";
    };
    IconSelect.value = EditorIcon;
    if (EditorIcon == "Feather Icons") {
      feather.replace();
    };
  } else {
    IconSelect.value = 'Font Awesome 5';
  };
  IconSelect.onchange = function() {
    var icon = IconSelect.options[IconSelect.selectedIndex].textContent;
    if (icon == null) {
      console.warn("No icon selected, using Font Awesome 5");
      storeData('EditorIcon', "Font Awesome 5");
    } else {
      console.log("Icon selected: "+icon);
      if (getData('EditorIcon')) {
        updateData('EditorIcon', icon);
      } else {
        storeData('EditorIcon', icon);
      };
      iziToast.show({
        id: 'Restart Required',
        theme: 'dark',
        title: 'Restart Required',
        displayMode: 2,
        message: 'Please restart griphitor to see your new icons',
        position: 'center',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'assets/internal/images/check.png',
        imageWidth: 70,
        layout: 2,
        onClosed: function(instance, toast, closedBy){
          console.log("Closedby: "+closedBy);
        }
      });
    };
  };
  /*Get editor reopen last file pref*/
  var EditorReopen = getData('EditorReopen');
  //console.log(EditorReopen);
  if (EditorReopen == null) {
    console.warn("No lastopen pref selected, using default");
    storeData('EditorReopen', "true");
  };
  if (EditorReopen) {
    console.log("ReopenLastFile pref saved, enabled: "+EditorReopen);
  } else {
    LastFileCheckbox.checked = true;
  };
  LastFileCheckbox.onchange = function() {
    var option = LastFileCheckbox.checked;
    //console.log(option);
    if (option == null) {
      console.warn("No lastopen pref selected, using default");
      storeData('EditorReopen', "true");
    } else {
      console.log("EditorReopen: "+option);
      if (getData('EditorReopen')) {
        updateData('EditorReopen', option);
      } else {
        storeData('EditorReopen', option);
      };
      if (option == true) {
        var nexttext = "will reopen the last file you opened on startup.";
      } else {
        var nexttext = "will not reopen the last file you opened on startup.";
      };
      iziToast.show({
        id: 'ReopenLastFile',
        theme: 'dark',
        title: 'Reopening last file',
        displayMode: 2,
        message: `Griphitor ${nexttext}`,
        position: 'center',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'assets/internal/images/check.png',
        imageWidth: 70,
        layout: 2,
        onClosed: function(instance, toast, closedBy){
          console.log("Closedby: "+closedBy);
        }
      });
    };
  };
  /*Get last opened file*/
  var LastFile = getData('CurrentFile');
  if (LastFile == null) {
    console.info("No file opened before.");
  };
  if (LastFile) {
    var LastFile = JSON.parse(LastFile); //parse json
    console.log("File saved before, checking prefrences");
    if (EditorReopen == "true") {
      //console.log(LastFile);
      var unb64d = atob(LastFile.filecontent);
      cm.setValue(unb64d);
      cm.setOption('mode', LastFile.filemode);
      if (LastFile.filemode == "text/html") {
        PreviewBtn.style.display = "block";
      };
      document.getElementById("FileName").innerHTML=`Editing ${LastFile.filename}`;
      iziToast.show({
        id: 'Last File',
        theme: 'dark',
        title: 'Reopening last file',
        displayMode: 2,
        message: 'Griphitor has reopened the last file you edited!, you can disable this in settings.',
        position: 'center',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
        progressBarColor: 'rgb(0, 255, 184)',
        image: 'assets/internal/images/check.png',
        imageWidth: 70,
        layout: 2,
        onClosed: function(instance, toast, closedBy){
          console.log("Closedby: "+closedBy);
        }
      });
      /* Desktop only */
      rpc.setActivity({
        details: "Editing a file",
        state: `${LastFile.filename}`,
        startTimestamp: new Date(),
        largeImageKey: `logo`,
        //largeImageText: `${filetype}`,
        //smallImageKey: `${filetypeimg}`,
        buttons: [
          {
            label: "Install Griphitor",
            url: "https://griphitor.xyz"
          }
        ]
      });
    } else {
      console.log("Prefrence says not to open file");
      LastFileCheckbox.checked = false;
    };
  };
});
