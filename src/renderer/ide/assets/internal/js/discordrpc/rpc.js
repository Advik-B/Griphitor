/* Set client up */
const { Client } = require("discord-rpc");
const rpc = new Client({
  transport: "ipc",
});
rpc.login({
  clientId: "938129164089851914",
});
/* Set activity */
rpc.on("ready", () => {
  console.log("RPC is ready now!");
});
