const express = require('express');
const fileUpload = require('express-fileupload');

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

  const userControl = require('../dao/users')(models);
  const eventControl = require('../dao/events')(models);
  const contractControl = require('../dao/contracts')(models);

  const filesPath = __basedir + '/saved_files';
  const profilePicturesFolder = filesPath + '/profile_pictures/';
  const eventImagesFolder = filesPath + '/event_images/';

  //// PROFILE PICTURES ////
  /**
   * @group Files - operations about files
   * @route GET /image/profile/{id}/
   * @param {integer} id.path.required - id
   * @returns {object} 200 - returns profile_picture
   * @returns {error} default - unexpected error
   */
  app.get("/image/profile/:id", async (req, res) => {
    if (req.params.id > 0) {
      userControl.userGetOne(req.params.id)
        .then(data => res.sendFile(profilePicturesFolder + data.picture))
        .catch(err => console.log(err));
    } else {
      res.status(400).send("Invalid Userid");
    }
  });

  /**
   * @group Files - operations about files
   * @route POST /image/profile/
   * @param {string} token.header.required - token
   * @param {file} name.formData.required - name
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
  app.post('/image/profile/', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files uploaded');
    } else {
      let profilePicture = req.files.name;
      let id = await auth.decode_token(req.headers.token);
      let user = await userControl.userGetOne(id);

      let splitName = profilePicture.name.split('.');
      if (["jpeg", "png", "svg", "jpg", "JPEG", "PNG", "SVG", "JPG", "gif", "GIF"].includes(splitName[splitName.length - 1])) {
        profilePicture.name = id + '_' + user.username + '.' + splitName[splitName.length - 1];
        userControl.userUpdate(id, user.username, user.email, user.phone, profilePicture.name);
        profilePicture.mv(profilePicturesFolder + profilePicture.name, function (err) {
          if (err) {
            return res.sendStatus(500).send(err);
          }
          res.send(profilePicture.name);
        });
      } else {
        res.status(400).send("Invalid filetype");
      }
    }
  });

  //// EVENT IMAGES ////
  /**
   * @group Files - operations about files
   * @route GET /image/event/{id}/
   * @param {integer} id.path.required - event id
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
  app.get('/image/event/:id', async (req, res) => {
    console.log("aaaaa " + req.params.id);
    if (req.params.id > 0) {
      eventControl.eventGetOne(req.params.id)
        .then(data => res.sendFile(eventImagesFolder + data.event_image))
        .catch(err => console.log(err));
    } else {
      res.status(400).send("Invalid EventId");
    }


  });

  /**
   * @group Files - operations about files
   * @route POST /image/event/{id}/
   * @param {integer} id.path.required - event id
   * @param {string} token.header.required - token
   * @param {file} name.formData.required - name
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
  app.post('/image/event/:id', async (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
      .then(async data => {
        if (data.auth && req.params.id > 0) {
          if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).send('No files uploaded');
          } else {
            let eventImage = req.files.name;
            let event = await eventControl.eventGetOne(req.params.id);

            let splitName = eventImage.name.split('.');
            if (["jpeg", "png", "svg", "jpg", "JPEG", "PNG", "SVG", "JPG", "gif", "GIF"].includes(splitName[splitName.length - 1])) {
              eventImage.name = req.params.id + '_' + event.event_name + '.' + splitName[splitName.length - 1];
              eventControl.eventUpdate(req.params.id, event.event_name, event.location, event.event_start, event.event_end, event.personnel, eventImage.name, event.description, event.archived);
              eventImage.mv(eventImagesFolder + eventImage.name, function (err) {
                if (err) {
                  return res.sendStatus(500).send(err);
                }
                res.send(eventImage.name);
              })
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
}
