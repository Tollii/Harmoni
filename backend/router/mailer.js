/**
 * @typedef feedback_Send
 * @property {string} text.required - User email
 */

module.exports = (app, models, base, auth) => {
  const mailer = require("../mailer/mailer");
  const eventController = require("../dao/events")(models);
  const contractDao = require("../dao/contracts")(models);
  const userControl = require("../dao/users")(models);


  /**
   * Sends a mail to all users connected to an event, used when an event is cancelled, notifying them about the cancellation
   * @group Mailer - Operations about mailer
   * @route PUT /mailer/event/{id}
   * @param {integer} id.path.required - event id
   * @param {string} token.header.required - user token
   * @returns {object} 200 - Email successfully sent
   * @returns {Error}  default - Internal server error
   */

  app.post(base + "/event/:id", (req, res) => {
    auth
      .check_permissions(req.headers.token, ["Admin", "Organizer"], req.params.id, 0)
      .then(value => {
        if (value.auth) {
          try {
            eventController.eventGetOne(req.params.id).then(resp => {
              eventController.eventArchiveOne(req.params.id).then(data => {
                res.send(data);
              });
              contractDao.contractGetAllByEvent(req.params.id).then(data => {
                let recipients = "";
                data.map(e => {
                  recipients += `${e.dataValues.username} <${e.dataValues.email}>, `;
                });
                const subject = `${resp.dataValues.event_name} has been cancelled.`;
                const html =
                  `<h1>${resp.dataValues.event_name} has been cancelled</h1>` +
                  "\n<p>Sorry for the inconvenience.</p>";
                mailer(recipients, subject, html);
              });
            });
            res
              .status(200)
              .send("Mail sent check your inbox for further instructions");
          } catch (err) {
            res.status(500).send("Internal Server Error");
            console.log(err);
          }
        }
      });
  });

  /**
   * Sends a mail to a specified email when they have forgotten their password, most importantly a link to a page where you can save your password.
   * @group Mailer - Operations about mailer
   * @route get /mailer/password/
   * @param {string} email.header.required - user email
   * @returns {object} 200 - Email successfully sent
   * @returns {Error}  default - Internal server error
   */

  app.get(base + "/password/", (req, res) => {
    try {
      userControl.userGetOneByEmail(req.headers.email).then(data => {
        let token = auth.encode_token(data.id);
        let recipients = `${data.username} <${data.email}> `;
        const subject = `change of password for ${data.username}`;
        const html =
          `<h1>${data.username} has requested that their password be updated</h1>` +
          `\n<p>Please press the link below to update your password, if you do not know what this is, please ignore this mail. </p>` +
          `<p>Link expires in 1 hour <a href="${process.env.FRONTEND_HOST}/#/forgotpassword/${token}">click here</a></p>`;

        mailer(recipients, subject, html);
      });
      res
        .status(200)
        .send("Mail sent check your inbox for further instructions");
    } catch (err) {
      res.status(500).send("Mail not valid");

      console.log(err);
    }
  });


/**
 * sends a mail to the system mail containing user feedback, also sends who sent the feedback
 * @group Mailer - Operations about mailer
 * @route post /mailer/feedback/
 * @param {string} token.header.required - user token
 * @param {feedback_Send.model} user.body.required - User feedback
 * @returns {object} 200 - Email successfully sent
 * @returns {Error}  default - Internal server error
 */

app.post(base + "/feedback/", async (req, res) => {
  try {
    let id = await auth.decode_token(req.headers.token);
    userControl.userGetOne(id).then(data => {
      let recipients = `server <${process.env.EMAIL_MAIL}>`;
      const subject = `Feedback from user ${data.username}`;
      const html =
          `<h1>${data.username}: ${data.email} has reported a bug</h1>` +
          `\n<p>${req.body.text}</p>`;

      mailer(recipients, subject, html);
    });
    res
        .status(200)
        .send("feedback sent");
  } catch (err) {
    res.status(500).send("Something went wrong");

    console.log(err);
  }
});
};

// res.sendStatus(200).send("Email successfully sent");
