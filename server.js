const liveServer = require("live-server");

const params = {
	root: "./dist",
	open: true,
	file: "index.html",
};

liveServer.start(params);
