profilePicturesFolderconst express = require('express');
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
  const filesPath = __basedir + '/saved_files';
  const profilePicturesFolder = filespath + '/profile_pictures/';

  /**
   * @group Files - operations about files
   * @route GET /profile_picture/{token}/
   * @param {string} token.path.required - token
   * @returns {object} 200 - returns profile_picture
   * @returns {error} default - unexpected error
   */
   app.get('/profile_picture/:token', async (req, res) => {
     let id = await auth.decode_token(req.params.token);
     let profile_picture = await userControl.userGetOne(id).then(data => data.picture);
     res.sendFile(profilePicturesFolder + profile_picture);
   });

   /**
    * @group Files - operations about files
    * @route POST /profile_picture/{token}/
    * @param {string} token.path.required - token
    * @returns {object} 200 - ok
    * @returns {error} default - unexpected error
    */
   app.post('profile_picture/:token', async (req, res) => {
     if(!req.files || Object.keys(req.files).length === 0) {
       res.status(400).send('No files uploaded');
     } else {
       let profilePicture = req.files.profile_picture;
       let id = await auth.decode_token(req.params.token);
       let user = await userControl.userGetOne(id);

       profilePicture.name = id + '_' + user.username;

       userControl.userUpdate(id, user.username, user.email, user.phone, profilePicture.name);

       profilePicture.mv(profilePicturesFolder + profilePicture.name, function(err) {
         if(err) {
           return res.sendStatus(500).send(err);
         }

         res.send('File uploaded');
       });
     }
   });
}
