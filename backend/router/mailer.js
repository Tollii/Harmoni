const mailer = require('../mailer/mailer');

/**
 * @typedef Mailer
 * @property {string} recipients.required - Recipients email
 * @property {string} subject.required - Subject of email
 * @property {string} html.required - HTML of email
 */


module.exports = ( app, base ) => {

    /**
     * @group Mailer - Operations about mailer
     * @route POST /mailer/
     * @param {Mailer.model} mailer.body.required
     * @returns {object} 200 - Email successfully sent
     * @returns {Error}  default - Internal server error
     */

    app.post(base, (req, res) => {
        try {
            mailer(req.body.recipients, req.body.subject, req.body.html);
            res.status(200).send("Email successfully sent");
        } catch(err) {
            res.status(500).send("Internal server error");
            console.log(err);
        }
    });
};