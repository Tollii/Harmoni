/**
 * @typedef Contract
 * @property {string} contract.required - Contract link
 * @property {integer} userID.required - User for contract
 * @property {integer} eventID.required - Event for contract
 */

module.exports = (app, models, base) => {
  const contractControl = require("../dao/contracts")(models);
  const authControl = require("../dao/authentication")(models);

  /**
   * @group Contract - Operations about contract
   * @route GET /contract/
   * @returns {object} 200 - An array of contracts info
   * @returns {Error}  default - Unexpected error
   */
  app.get(base, async (req, res) => {
    contractControl.contractGetAll().then(data => {
      res.send(data);
    });
  });

  /**
   * @group Contract - Operations about contract
   * @route GET /contract/user/{token}/event/{event_id}/
   * @param {string} token.path.required - Contract user token
   * @param {integer} event_id.path.required - Contract event id
   * @returns {object} 200 - Return a Contract
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/user/:token/event/:event_id", async (req, res) => {
    let id = await authControl.decode_token(req.params.token);

    contractControl.contractGetOne(id, req.params.event_id).then(data => {
      res.send(data);
    });
  });

  /**
   * @route POST /contract/
   * @group Contract - Operations about contract
   * @param {Contract.model} user.body.required - Contract information
   * @returns {object} 200 - return Contract object
   * @returns {Error}  default - Unexpected error
   */
  app.post(base, async (req, res) => {
    contractControl
      .contractCreate(req.body.contract, req.body.userID, req.body.eventID)
      .then(data => {
        res.send(data);
      })
      .catch(err => console.log("error: " + err));
  });

  /**
   * @group Contract - Operations about contract
   * @route DELETE /contract/user/{token}/event/{event_id}/
   * @param {string} token.path.required - Contract user token
   * @param {integer} event_id.path.required - Contract event id
   * @returns {object} 200 - Contract is deleted
   * @returns {Error}  default - Unexpected error
   */
  app.delete(base + "/user/:token/event/:event_id", async (req, res) => {
    let id = await authControl.decode_token(req.params.token);

    contractControl.contractDelete(id, req.params.event_id).then(data => {
      res.send(data);
    });
  });
};
