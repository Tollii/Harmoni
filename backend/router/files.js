const express = require("express");
const fileUpload = require("express-fileupload");

/**
 * @typedef Profile_picture
 * @property {object} profile_picture.required - Profile Profile_picture
 */
/**
 * @typedef Contracts
 * @property {object} contract.required - Profile Profile_picture
 */
/**
 * @typedef Event_image
 * @property {object} event_image.required - Profile Profile_picture
 */

module.exports = (app, models, auth) => {
  app.use(express.static(__basedir));
  app.use(fileUpload());

  const userControl = require("../dao/users")(models);
  const eventControl = require("../dao/events")(models);
  const contractControl = require("../dao/contracts")(models);

  const filesPath = __basedir + "/saved_files";
  const profilePicturesFolder = filesPath + "/profile_pictures/";
  const eventImagesFolder = filesPath + "/event_images/";
  const contractFolder = filesPath + "/contracts/";

  //// PROFILE PICTURES ////
  /**
   * Gets a profile picture file for a specific user
   * @group Files - operations about files
   * @route GET /image/profile/{id}/
   * @param {integer} id.path.required - id
   * @returns {object} 200 - returns profile_picture
   * @returns {error} default - unexpected error
   */
  app.get("/image/profile/:id", async (req, res) => {
    if (req.params.id > 0) {
      userControl
        .userGetOne(req.params.id)
        .then(data => res.sendFile(profilePicturesFolder + data.picture))
        .catch(err => console.log(err));
    } else {
      res.status(400).send("Invalid Userid");
    }
  });

  /**
   * Posts a profile image file for your own token, saves it in a folder in backend
   * @group Files - operations about files
   * @route POST /image/profile/
   * @param {string} token.header.required - token
   * @param {file} image.formData.required - name
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
  app.post("/image/profile/", async (req, res) => {
    if (!req.files || Object.keys(req.files).length == 0) {
      res.status(400).send("No files uploaded");
    } else {
      let profilePicture = req.files.image;
      let id = await auth.decode_token(req.headers.token);
      let user = await userControl.userGetOne(id);
      let splitName = profilePicture.name.split(".");
      if (profilePicture.mimetype.split("/")[0] == "image") {
        profilePicture.name =
          id + "_" + user.username + "." + splitName[splitName.length - 1];
        userControl.userUpdate(
          id,
          user.username,
          user.email,
          user.phone,
          profilePicture.name
        );
        profilePicture.mv(profilePicturesFolder + profilePicture.name, function(
          err
        ) {
          if (err) {
            return res.sendStatus(500).send(err);
          }
          res.send(profilePicture.name);
        });
        console.log(req.files);
      } else {
        res.status(400).send("Invalid filetype");
      }
    }
  });

  //// EVENT IMAGES ////
  /**
   * gets the image file for an event
   * @group Files - operations about files
   * @route GET /image/event/{id}/
   * @param {integer} id.path.required - event id
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
  app.get("/image/event/:id", async (req, res) => {
    if (req.params.id > 0) {
      eventControl
        .eventGetOne(req.params.id)
        .then(data => {
          res.sendFile(eventImagesFolder + data.event_image);
        })
        .catch(err => console.log(err));
    } else {
      res.status(400).send("Invalid EventId");
    }
  });
  /**
   * Posts an event image file and save it in backend
   * @group Files - operations about files
   * @route POST /image/event/{id}/
   * @param {integer} id.path.required - event id
   * @param {string} token.header.required - token
   * @param {file} image.formData.required - name
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
  app.post("/image/event/:id", async (req, res) => {
    auth
      .check_permissions(
        req.headers.token,
        ["Admin", "Organizer"],
        req.params.id,
        0
      )
      .then(async data => {
        if (data.auth && req.params.id > 0) {
          if (!req.files || Object.keys(req.files).length == 0) {
            res.status(400).send("No files uploaded");
          } else {
            let eventImage = req.files.image;
            let event = await eventControl.eventGetOne(req.params.id);
            let splitName = eventImage.name.split(".");
            if (eventImage.mimetype.split("/")[0] == "image") {
              eventImage.name =
                req.params.id +
                "_" +
                event.event_name +
                "." +
                splitName[splitName.length - 1];
              eventControl.eventUpdate(
                req.params.id,
                event.event_name,
                event.location,
                event.event_start,
                event.event_end,
                event.personnel,
                event.volunteers,
                eventImage.name,
                event.description,
                event.event_typeID
              );
              eventImage.mv(eventImagesFolder + eventImage.name, function(err) {
                if (err) {
                  return res.sendStatus(500).send(err);
                }
                res.send(eventImage.name);
              });
            } else {
              res.status(400).send("Invalid filetype");
            }
          }
        } else {
          res.status(400).send("Not authenticated");
        }
      })
      .catch(err => console.log(err));
  });

  ///////////CONTRACTS///////////
  /**
   * @group Files - operations about files
   * @route GET /files/contract/user/{user_id}/event/{event_id}/
   * @param {string} token.header.required - token
   * @param {integer} user_id.path.required - user_id
   * @param {integer} event_id.path.required - event_id
   * @returns {object} 200 - returns contract
   * @returns {error} default - unexpected error
   */
  app.get("/files/contract/user/:user_id/event/:event_id", async (req, res) => {
    auth
      .check_permissions(
        req.headers.cookie.split("=")[1],
        ["Admin", "Organizer", "Artist"],
        req.params.event_id,
        req.params.user_id
      )
      .then(async data => {
        if (data.auth) {
          let id = data.user.dataValues.id;
          if (id != null) {
            let contract = null;
            if (id == req.params.user_id) {
              contract = await contractControl
                .contractGetOne(req.params.user_id, req.params.event_id)
                .then(data => res.sendFile(contractFolder + data.contract));
            } else {
              let roleId = await userControl
                .userGetOne(id)
                .then(data => data.roleID);
              if (roleId == 4) {
                contract = await contractControl
                  .contractGetOne(req.params.user_id, req.params.event_id)
                  .then(data => res.sendFile(contractFolder + data.contract))
                  .catch(err => console.log(err));
              } else if (roleId == 3) {
                let count = await contractControl
                  .contractCountOne(id, req.params.event_id)
                  .then(count => count);
                if (count > 0) {
                  contract = contractControl
                    .contractGetOne(req.params.user_id, req.params.event_id)
                    .then(data => res.sendFile(contractFolder + data.contract))
                    .catch(err => console.log(err));
                } else {
                  res.status(400).send("Invalid permission");
                }
              } else {
                res.status(400).send("Invalid permission");
              }
            }
          }
        } else {
          res.status(400).send("token expired");
        }
      });
  });

  /**
   * @group Files - operations about files
   * @route PUT /files/contract/user/{user_id}/event/{event_id}/
   * @param {string} token.header.required - token
   * @param {integer} user_id.path.required - user_id
   * @param {integer} event_id.path.required - event_id
   * @param {file} name.formData.required - name
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
  app.put("/files/contract/user/:user_id/event/:event_id", async (req, res) => {
    if (!req.files || Object.keys(req.files).length == 0) {
      res.status(400).send("No files uploaded");
    } else {
      if (
        await auth.check_permissions(
          req.headers.token,
          ["Admin", "Organizer"],
          req.params.event_id,
          req.params.user_id
        )
      ) {
        let contract_file = req.files.contract;
        let contract = await contractControl.contractGetOne(
          req.params.user_id,
          req.params.event_id
        );

        if (contract_file.name != "") {
          let splitName = contract_file.name.split(".");
          contract_file.name =
            req.params.user_id +
            "_" +
            req.params.event_id +
            "." +
            splitName[splitName.length - 1];
          contractControl.contractUpdate(
            contract.userID,
            contract.eventID,
            contract_file.name
          );

          contract_file.mv(contractFolder + contract_file.name, function(err) {
            if (err) {
              return res.sendStatus(500).send(err);
            }

            res.send(contract_file.name);
          });
        } else {
          contractControl.contractUpdate(contract.userID, contract.eventID, "");
        }
      }
    }
  });
};
