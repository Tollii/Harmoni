
/**
 * @typedef Rider_Types
 * @property {string} description.required - Rider type description
 */

module.exports = (app, models, base) => {
  const rider_typesControl = require('../dao/rider_types')(models)

  /**
  * @group Rider Type - Operations about rider_type
  * @route GET /rider_type/
  * @returns {object} 200 - An array of rider_types info
  * @returns {Error}  default - Unexpected error
  */
 app.get(base, ( req, res ) => {
    rider_typesControl.rider_typesGetAll().then((data)=>{
      res.send(data);
    })
  });

  /**
  * @group Rider Type - Operations about rider_type
  * @route GET /rider_type/{id}/
  * @param {integer} id.path.required - rider_type id
  * @returns {object} 200 -Rider_type info
  * @returns {Error}  default - Unexpected error
  */
 app.get(base+"/:id", ( req, res ) => {
    rider_typesControl.rider_typesGetOne(req.params.id).then((data)=>{
      res.send(data);
    })
  });

/**
 * @group Rider Type - Operations about rider_type
 * @route POST /rider_type/
  * @param {Rider_Types.model} description.body.required - Rider_Types information
 * @returns {object} 200 - An array of rider_types info
 * @returns {Error}  default - Unexpected error
 */
  app.post(base, ( req, res ) => {
    rider_typesControl.rider_typesCreate(req.body.description).then((data)=>{
      res.send(data);
    })
  });

  /**
  * @group Rider Type - Operations about rider_type
  * @route DELETE /rider_type/{id}/
  * @param {integer} id.path.required - rider_type id
  * @returns {object} 200 - rider_type is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/:id", (req, res) => {
    rider_typesControl.rider_typesDelete(req.params.id)
      .then((data) => {
        res.send(data);
      })
  });

}