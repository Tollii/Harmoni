
/**
 * @typedef Contract
 * @property {string} contract.required - Contract link
 * @property {integer} userID.required - User for contract
 * @property {integer} eventID.required - Event for contract
 */

module.exports = (app, models, base) => {
  const contractControl = require('../dao/contracts')(models)

  /**
  * @group Contract - Operations about contract
  * @route GET /contract/
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */
  app.get(base, ( req, res ) => {
    contractControl.contractGetAll().then((data)=>{
      res.send(data);
    })
  });

  /**
  * @group Contract - Operations about contract
  * @route GET /contract/user/{user_id}/event/{event_id}/
  * @param {integer} user_id.path.required - Contract user id
  * @param {integer} event_id.path.required - Contract event id
  * @returns {object} 200 - Return a Contract
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/user/:user_id/event/:event_id", ( req, res ) => {
    contractControl.contractGetOne(req.params.user_id, req.params.event_id).then((data)=>{
      res.send(data);
    })
  });

  /**
  * @route POST /contract/
  * @group Contract - Operations about contract
  * @param {Contract.model} user.body.required - Contract information
  * @returns {object} 200 - return Contract object
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, (req, res) => {
    contractControl.contractCreate(
      req.body.contract,
      req.body.userID,
      req.body.eventID)
      .then((data)=>{
        res.send(data)
      })
  });

  /**
  * @group Contract - Operations about contract
  * @route DELETE /contract/user/{user_id}/event/{event_id}/
  * @param {integer} user_id.path.required - Contract user id
  * @param {integer} event_id.path.required - Contract event id
  * @returns {object} 200 - Contract is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/user/:user_id/event/:event_id", (req, res) => {
    contractControl.contractDelete(req.params.user_id, req.params.event_id)
      .then((data)=>{
        res.send(data);
      })
  });

}