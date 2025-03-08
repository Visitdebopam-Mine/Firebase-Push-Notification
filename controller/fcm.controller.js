const { appDb } = require("../utils/db.utils");
const { sendNotification } = require("./firebase.controller");


async function getProject(request, response) {
    const query = 'select * from table_app_data where identifier=?';
    console.log(query);
    const { identifier } = request.body;
    const values = [identifier];
    appDb.execute(query, values, (err, dbResults) => {
        if (err) {
            return response.status(200).json({ success: false, message: 'Invalid Identifier' });
        }
        prepareAuthJson(request, response, dbResults);
    });

}

async function prepareAuthJson(request, response, dbResults) {
    dbResults.forEach(async dbRow => {
        const privateKey = dbRow["private_key"].replace(/\\n/g, '\n');
        const authJson = {
            type: "service_account",
            project_id: dbRow["project_id"],
            private_key_id: dbRow["private_key_id"],
            private_key: privateKey,
            client_email: dbRow["client_email"],
            client_id: dbRow["client_id"],
            auth_uri: "https://accounts.google.com/o/oauth2/auth",
            token_uri: "https://oauth2.googleapis.com/token",
            auth_provider_x509_cert_url: dbRow["auth_cert_url"],
            client_x509_cert_url: dbRow["client_cert_url"],
            universe_domain: "googleapis.com"
        };

        sendNotification(request, response, authJson);
    });
}
module.exports = { getProject };