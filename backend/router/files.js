var express = require('express');

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
  const userControl = require('../dao/users')(models);
  const files_path = 'saved_files';
  const profile_pictures_folder = '/profile_pictures/';

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
     res.sendFile(profile_pictures_folder + profile_picture, { root: files_path });
   });

   /**
    * @group Files - operations about files
    * @route POST /profile_picture/{token}/
    * @returns {object} 200 - returns profile_picture
    * @returns {error} default - unexpected error
    */
   app.post('profile_picture/:token', async (req, res) => {

   });
}
