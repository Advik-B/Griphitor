const { Client } = require("discord-rpc");
const rpc = new Client({
  transport: "ipc",
});

rpc.on("ready", () => {
  rpc.setActivity({
    details: "Editing a file",
    state: `${filename}`,
    startTimestamp: new Date(),
    largeImageKey: "logo",
    largeImageText: "Logo",
    smallImageKey: "minecraft",
    smallImageText: "Minecraft bedrock 1.18",
    buttons: [
      { label: "Join WeirdozSMP", url: "http://memefileserver.ml/join-server.php?Name=Backup%20Server&Url=backup1.weirdozsmp.ml&Port=11065" },
      { label: "Join NationalSMP", url: "http://memefileserver.ml/join-server.php?Name=NationalSmp&Url=Nationalsmp5PLs.aternos.me&Port=30226" },
    ],
  });
  console.log("RPC is ready now!");
});

rpc.login({
  clientId: "918760251191328808",
});
