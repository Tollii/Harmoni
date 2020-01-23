/**
 * @typedef Contract
 * @property {string} contract.required - Contract link
 * @property {integer} userID.required - User for contract
 * @property {integer} eventID.required - Event for contract
 */

module.exports = (app, models, base, auth) => {
  const contractControl = require('../dao/contracts')(models)
  /**
  * Gets all contracts
  * @group Contract - Operations about contract
  * @route GET /contract/
  * @param {string} token.header.required - token
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */

  app.get(base, ( req, res ) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"], 0, 0)
    .then(data => {
      if(data.auth){
        contractControl.contractGetAll().then((data)=>{
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });


  /**
   * Gets all contracts for a specific event
  * @group Contract - Operations about contract
  * @route GET /contract/event/{event_id}/
  * @param {string} token.header.required - token
  * @param {integer} event_id.path.required - Contract event id
  * @returns {object} 200 - An array of contracts info
  * @returns {Error}  default - Unexpected error
  */

 app.get(base+"/event/:event_id", ( req, res ) => {
  auth.check_permissions(req.headers.token, ["Admin", "Organizer"], req.params.event_id, 0)
  .then(data => {
    if(data.auth){
      contractControl.contractGetAllByEvent(req.params.event_id).then((data)=>{
        res.send(data);
      })
    } else {
      res.status(400).send("Not authenticated")
    }
  })
  .catch(err => console.log(err))
});

  /**
   * Gets the contract of a specified user for a specified event
  * @group Contract - Operations about contract
  * @route GET /contract/user/{user_id}/event/{event_id}/
  * @param {integer} user_id.path.required - Contract user id
  * @param {integer} event_id.path.required - Contract event id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Return a Contract
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/user/:user_id/event/:event_id", ( req, res ) => {    
    auth.check_permissions(req.headers.token, ["Admin", "Organizer", "Artist"], req.params.event_id, req.params.user_id)
    .then(data => {
      if(data.auth){
        contractControl.contractGetOne(req.params.user_id, req.params.event_id).then((data)=>{
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
   * Posts a new contract, without the actual contract file
  * @route POST /contract/
  * @group Contract - Operations about contract
  * @param {Contract.model} user.body.required - Contract information
  * @param {string} token.header.required - token
  * @returns {object} 200 - return Contract object
  * @returns {Error}  default - Unexpected error
  */
  app.post(base, (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"], req.body.eventID, 0)
    .then(data => {
      if(data.auth){
        contractControl.contractCreateNoContract(
          req.body.userID,
          req.body.eventID)
          .then((data)=>{
            res.send(data)
          })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
   * Deletes a specific contract from a specified user for a specified event
  * @group Contract - Operations about contract
  * @route DELETE /contract/user/{user_id}/event/{event_id}/
  * @param {integer} user_id.path.required - Contract user id
  * @param {integer} event_id.path.required - Contract event id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Contract is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/user/:user_id/event/:event_id", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"], req.params.event_id, req.params.user_id)
    .then(data => {
      if(data.auth){
        contractControl.contractDelete(req.params.user_id, req.params.event_id)
        .then((data)=>{
          res.send(data);
        })
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });
}
