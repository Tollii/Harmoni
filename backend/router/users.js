module.exports = (app, Users, base) => {

  const userControl = require('../dao/users')(app, Users)

  app.get(base, ( req, res ) => {
    userControl.userAll().then((data)=>{
      res.send(data);
    })
  });

  app.get(base+"/:userID", ( req, res ) => {
    userControl.userOne(req.params.userID).then((data)=>{
      res.send(data);
    })
  });

}