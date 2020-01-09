
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
    contractControl.contractAll().then((data)=>{
      res.send(data);
    })
  });

  /**
  * @group Contract - Operations about contract
  * @route GET /contract/{id}/
  * @param {integer} id.path.required - Contract id
  * @returns {object} 200 - Return a Contract
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/:id", ( req, res ) => {
    contractControl.contractOne(req.params.id).then((data)=>{
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
  * @route PUT /contract/{id}/
  * @param {integer} id.path.required - Contract id
  * @param {Contract.model} user.body.required - Contract information
  * @returns {object} 200 - Return OK message
  * @returns {Error}  default - Unexpected error
  */
  app.put(base+"/:id", (req, res) => {
    contractControl.contractUpdate(
      req.params.id,
      req.body.contract,
      req.body.userID,
      req.body.eventID)
      .then(()=>{
        res.sendStatus(200).send('User is updated');
      })
      .catch((err) => {
        res.sendStatus(400).send('User not updated');;
      })
  });

  /**
  * @group Contract - Operations about contract
  * @route DELETE /contract/{id}/
  * @param {integer} id.path.required - Contract id
  * @returns {object} 200 - Contract is deleted
  * @returns {Error}  default - Unexpected error
  */
  app.delete(base+"/:id", (req, res) => {
    contractControl.contractDelete(req.params.id)
      .then((data)=>{
        res.send(data);
      })
  });

}