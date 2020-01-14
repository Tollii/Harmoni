
/**
 * @typedef Rider_Types
 * @property {string} description.required - Rider type description
 */

module.exports = (app, models, base, auth) => {
  const rider_typesControl = require('../dao/rider_types')(models)

  /**
  * @group Rider Type - Operations about rider_type
  * @route GET /rider_type/
  * @param {string} token.headers.required - token
  * @returns {object} 200 - An array of rider_types info
  * @returns {Error}  default - Unexpected error
  */
 app.get(base, ( req, res ) => {
  auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"])
  .then(data => {
    if(data.auth){
      rider_typesControl.rider_typesGetAll().then((data)=>{
        res.send(data);
      })
    } else {
      res.status(400).send("Not authenticated")
    }
  })
  .catch(err => console.log(err))
  });

  /**
  * @group Rider Type - Operations about rider_type
  * @route GET /rider_type/{id}/
  * @param {integer} id.path.required - rider_type id
  * @param {string} token.headers.required - token
  * @returns {object} 200 -Rider_type info
  * @returns {Error}  default - Unexpected error
  */
 app.get(base+"/:id", ( req, res ) => {
  auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"])
  .then(data => {
    if(data.auth){
      rider_typesControl.rider_typesGetOne(req.params.id).then((data)=>{
        res.send(data);
      })
    } else {
      res.status(400).send("Not authenticated")
    }
  })
  .catch(err => console.log(err))
  });

/**
  * @group Rider Type - Operations about rider_type
  * @route POST /rider_type/
  * @param {Rider_Types.model} description.body.required - Rider_Types information
  * @param {string} token.headers.required - token
  * @returns {object} 200 - An array of rider_types info
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, ( req, res ) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data.auth){
        rider_typesControl.rider_typesCreate(req.body.description).then((data)=>{
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
  * @group Rider Type - Operations about rider_type
  * @route DELETE /rider_type/{id}/
  * @param {integer} id.path.required - rider_type id
  * @param {string} token.headers.required - token
  * @returns {object} 200 - rider_type is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/:id", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist", "User"])
    .then(data => {
      if(data.auth){
        rider_typesControl.rider_typesDelete(req.params.id)
        .then((data) => {
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

}