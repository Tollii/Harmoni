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

  const filesPath = __basedir + '/saved_files';
  const profilePicturesFolder = filesPath + '/profile_pictures/';
  const eventImagesFolder = filesPath + '/event_images/';

//// PROFILE PICTURES ////
  /**
   * @group Files - operations about files
   * @route GET /profile_picture/{id}/
   * @param {integer} id.path.required - id
   * @returns {object} 200 - returns profile_picture
   * @returns {error} default - unexpected error
   */
  app.get("/profile_picture/:id", async (req, res) => {
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
    * @route POST /profile_picture/{token}/
    * @param {string} token.path.required - token
    * @returns {object} 200 - ok
    * @returns {error} default - unexpected error
    */
   app.post('/profile_picture/:token', async (req, res) => {
     if(!req.files || Object.keys(req.files).length === 0) {
       res.status(400).send('No files uploaded');
     } else {
       console.log(req);
       let profilePicture = req.files.profile_picture;
       let id = await auth.decode_token(req.params.token);
       let user = await userControl.userGetOne(id);

       let splitName = profilePicture.name.split('.');
       profilePicture.name = id + '_' + user.username + '.' + splitName[splitName.length - 1];

       userControl.userUpdate(id, user.username, user.email, user.phone, profilePicture.name);

       profilePicture.mv(profilePicturesFolder + profilePicture.name, function(err) {
         if(err) {
           return res.sendStatus(500).send(err);
         }

         res.send('File uploaded');
       });
     }
   });

   //// EVENT IMAGES ////
   /**
    * @group Files - operations about files
    * @route GET /event_image/{id}/
    * @param {integer} id.path.required - event id
    * @param {string} token.query.required - token
    * @returns {object} 200 - ok
    * @returns {error} default - unexpected error
    */
  app.get('event_image/:id', async (req, res) => {
    auth.check_permissions(req.query.token, ["Admin", "Organizer", "Artist", "User"])
    .then(async data => {
      if(data.auth) {
        let eventImage = await eventControl.eventGetOne(id).then(data => data.event_image);
        res.sendFile(eventImagesFolder + eventImage);
      } else {
        res.status(400).send("Not authenticated");
      }
    })
    .catch(err => console.log(err));
  });

  /**
   * @group Files - operations about files
   * @route POST /event_image/{id}/
   * @param {integer} id.path.required - event id
   * @param {string} token.query.required - token
   * @returns {object} 200 - ok
   * @returns {error} default - unexpected error
   */
   app.post('/event_image/:id', async (req, res) => {
     auth.check_permissions(req.query.token, ["Admin", "Organizer"])
     .then(async data => {
       if(data.auth) {
         if(!req.files || Object.keys(req.files).length === 0) {
           res.status(400).send('No files uploaded');
         } else {
           console.log(req);
           let eventImage = req.files.event_image;
           let event = await eventControl.eventGetOne(id);

           let splitName = eventImage.name.split('.');
           eventImage.name = id + '_' + event.event_name + '.' + splitName[splitName.length - 1];

           eventImage.eventUpdate(id, event.event_name, event.location, event.event_start, event.event_end, event.personnel, event_image.name, event.description, event.archived);

           eventImage.mv(eventImagesFolder + eventImage.name, function(err) {
             if(err) {
               return res.sendStatus(500).send(err);
             }

             res.send('File uploaded');
           });
         }
       } else {
         res.status(400).send("Not authenticated");
       }
     })
     .catch(err => console.log(err));
   });
}
