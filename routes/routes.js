var faker = require("faker");
const shell = require("shelljs")

var appRouter = function (app) {

  app.get("/", function (req, res) {
    res.status(200).send({ message: 'Welcome to the jungle' });
  });

  app.get("/reboot/:id", function (req, res) {
    id = req.params.id
    console.log('Config Number', id);
    
    shell.cd('~/go/src/github.com/AuthScureDevelopment/app-roro-jonggrang')
    // ID 1 For disable all module RFID
    // ID 2 For disable in customer RFID module
    // ID 0 For enable all RFID module
    if (id == 1) {
      shell.cp('config/env.fitmentncustomer', 'config/.env')
    }else if (id == 2) {
      shell.cp('config/env.fitment', 'config/.env')
    }else if (id == 0){
      shell.cp('config/env.openall', 'config/.env')
    } else {
      return res.status(400).send('Hello')
    }
    var data = ({
      status: "ok",
    });
    res.status(200).send(data);
    shell.exec('pm2 restart roro-jonggrang-rfid')
  });
}
module.exports = appRouter;
