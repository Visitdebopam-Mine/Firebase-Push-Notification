const { getProject } = require("../controller/fcm.controller");

module.exports = (app) => {

    app.post("/sendPush", getProject);
}