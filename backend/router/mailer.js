module.exports = ( app, models, base, auth ) => {

    const mailer = require('../mailer/mailer');
    const eventController = require('../dao/events')(models);
    const contractDao = require("../dao/contracts")(models);

    /**
     * @group Mailer - Operations about mailer
     * @route POST /mailer/event/{id}
     * @param {integer} id.path.required - event id
     * @param {string} token.header.required - user token
     * @returns {object} 200 - Email successfully sent
     * @returns {Error}  default - Internal server error
     */

    app.post(base + "/event/:id", (req, res) => {
        auth.check_permissions(req.headers.token, ["Admin", "Organizer"]).then(value => {

            if(value.auth) {
                try {
                    eventController.eventGetOne(req.params.id).then(resp => {
                        contractDao.contractGetAllByEvent(req.params.id).then(data => {
                            let recipients = '';
                            data.map(e => {
                                recipients += `${e.dataValues.username} <${e.dataValues.email}>, `;
                            });
                            const subject = `${resp.dataValues.event_name} has been cancelled.`;
                            const html = `<h1>${resp.dataValues.event_name} has been cancelled</h1>` + '\n<p>Sorry for the inconvenience.</p>';
                            mailer(recipients, subject, html);
                        });
                    });
                    res.status(200).sendStatus("Mail sent")
                } catch(err) {
                    res.status(500).sendStatus("Internal server error");
                    console.log(err);
                }
            }
        });
    });
};





// res.sendStatus(200).send("Email successfully sent");
