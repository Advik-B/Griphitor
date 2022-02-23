const { Client } = require("discord-rpc");
const rpc = new Client({
  transport: "ipc",
});

rpc.on("ready", () => {
  rpc.setActivity({
    details: "Playing on a server",
    state: "Server: weirdozsmp server",
    startTimestamp: new Date(),
    largeImageKey: "logo",
    largeImageText: "Logo",
    smallImageKey: "minecraft",
    smallImageText: "Minecraft bedrock 1.18"/*,
    buttons: [
      { label: "💭Website💭", url: "https://cath.gq/" },
      { label: "🌌YouTube🌌", url: "https://youtube.com/c/Kirito01" },
    ],*/
  });
  console.log("RPC is ready now!");
});

rpc.login({
  clientId: "918760251191328808",
});
