/**
 * @typedef Events
 * @property {string} event_name.required - Full name
 * @property {string} location.required - Event location
 * @property {string} event_start.required - Event start date
 * @property {string} event_end.required - Event end date
 * @property {string} personnel.required - Text request of personnel
 * @property {integer} volunteers.required - Nr of volunteers
 * @property {string} description.required - Text description of event
 * @property {integer} event_typeID.required - ID of event_type
 */

/**
 * @typedef Riders_Event
 * @property {string} additions.required - Contract link
 * @property {integer} rider_typeID.required - Rider type for rider
 * @property {integer} userID.required - User for rider
 */

 /**
 * @typedef Tickets_Event
 * @property {string} ticket_name.required - Name of ticket
 * @property {number} price.required - Price of ticket
 * @property {integer} ticket_amount.required - Amount of tickets
 * @property {string} date_start.required - Start date of ticket sale
 * @property {string} date_end.required - End date of ticket sale
 */

 /**
 * @typedef Events_POST
 * @property {string} event_name.required - Full name
 * @property {string} location.required - Event location
 * @property {string} event_start.required - Event start date
 * @property {string} event_end.required - Event end date
 * @property {string} personnel.required - Text request of personnel
 * @property {integer} volunteers.required - Nr of volunteers
 * @property {string} description.required - Text description of event
 * @property {boolean} archived.required - Verification of archived event
 * @property {integer} event_typeID.required - ID of event_type
 * @property {Array.<integer>} artists.required - ID of artists
 * @property {Array.<Riders_Event>} riders.required - riders
 * @property {Array.<Tickets_Event>} tickets.required - tickets
 */

module.exports = (app, models, base, auth) => {
  const eventControl = require("../dao/events")(models);
  const contractControl = require("../dao/contracts")(models);
  const riderControl = require("../dao/riders")(models);
  const ticketControl = require("../dao/tickets")(models);

  /**
   * @group Events - Operations about event
   * @route GET /event/
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */

  app.get(base, (req, res) => {
    eventControl.eventGetAllUnarchived().then(data => {
      res.send(data);
    });
  });

   /**
   * @group Events - Operations about event
   * @route GET /event/
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */

  app.get(base, (req, res) => {
    eventControl.eventGetAll().then(data => {
      res.send(data);
    });
  });

  /**
   * @group Events - Operations about event
   * @route GET /event/{id}/
   * @param {integer} id.path.required - event id
   * @returns {object} 200 - The event with the param id
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/:id", (req, res) => {
    eventControl.eventGetOne(req.params.id).then(data => {
      res.send(data);
    });
  });


  /**
   * @group Events - Operations about event
   * @route GET /eventcarousel
   * @returns {object} 200 - The event with the param id
   * @description Return the 15 latest events to the carousel
   * @returns {Error}  default - Unexpected error
   */

  app.get(base + "carousel", (req, res) => {
    eventControl.eventGetCarouselEvent(req.params.id).then(data => {
      res.send(data);
    }).catch(err=>{
      console.log(err);
      res.sendStatus(400);
    });
  });


  /**
   * @group Events - Operations about event
   * @route GET /event/user/all/
   * @param {string} token.header.required - user token
   * @returns {object} 200 - The event with the param id
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/user/all", async (req, res) => {
    let id = await auth.decode_token(req.headers.token);
    eventControl.eventGetByUser(id).then(data => {
      res.send(data);
    });
  });

  /**
   * @group Events - Operations about event
   * @route GET /event/artist/{id}/
   * @param {integer} id.path.required - event id
   * @returns {object} 200 - The event with the param id
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/artist/:id", (req, res) => {
    console.log("Running get all artists for one event");
    contractControl.contractGetAllByRole(req.params.id, 2).then(data => {
      res.send(data);
    });
  });

    /**
  * @group Events - Operations about contract
  * @route GET /event/contract/{event_id}/
  * @param {integer} event_id.path.required - Contract event id
  * @param {string} token.header.required - token
  * @returns {object} 200 - Return a Contract
  * @returns {Error}  default - Unexpected error
  */
  app.get(base+"/contract/:event_id", ( req, res ) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        contractControl.getContractsByEvent(req.params.event_id).then((data)=>{
          res.send(data);
        }).catch(err => res.status(400).send(err));
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => res.status(400).send(err));
  });

  /**
   * @group Events - Operations about event
   * @route DELETE /event/{id}/
   * @param {integer} id.path.required - event id
   * @param {string} token.header.required - token
   * @returns {object} 200 - An array of events
   * @returns {Error}  default - Unexpected error
   */
  app.delete(base + "/:id", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        eventControl.eventDelete(req.params.id).then(data => {
          res.send(data);
        });
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

  /**
   * @group Events - Operations about event
   * @route PUT /event/{id}/
   * @param {integer} id.path.required - event id
   * @param {Events.model} event.body.required - All attributes of event
   * @param {string} token.header.required - token
   * @returns {object} 200 - Updates the attributes of the given event
   * @returns {Error}  default - Unexpected error
   */
  app.put(base + "/:id", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        eventControl
        .eventUpdate(
          req.params.id,
          req.body.event_name,
          req.body.location,
          req.body.event_start,
          req.body.event_end,
          req.body.personnel,
          req.body.volunteers,
          req.body.event_image,
          req.body.description,
          req.body.event_typeID
        )
        .then(() => {
          res.sendStatus(200).send("Event is updated");
        })
        .catch(err => {
          res.sendStatus(400).send("Event is NOT updated");
        });
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => res.status(400).send(err))
  });

  /**
   * @group Events - Operations about event
   * @route PUT /event_archive/
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */

  app.put("/event_archive/", (req, res) => {
    console.log("Put eventArchive called");
     let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
     eventControl.eventArchive(currentDate)
        .then(() => {
          res.sendStatus(200).send("Events are archived");
        })
        .catch(err => {
          res.sendStatus(400).send("Event are NOT archived");
        });
  });

  /**
   * @group Events - Operations about event
   * @route PUT /event_archive/{id}
   * @param {string} token.header.required - user token
   * @param {number} id.path.required - event id
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */
   app.put('/event_archive/:id', (req, res) => {
     auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
     .then(data => {
       if (data.auth) {
         eventControl.eventGetOne(req.params.id)
         .then(event => {
           eventControl.eventUpdate(
             req.params.id,
             event.event_name,
             event.location,
             event.event_start,
             event.event_end,
             event.personnel,
             event.event_image,
             event.description,
             true,
             event.event_typeID
           )
           .then(() => {
             res.sendStatus(200).send("Events are archived");
           })
           .catch(err => {
             res.sendStatus(400).send("Event are NOT archived");
           });
         })
       } else {
         res.status(400).send("Not authenticated")
       }
     })
   });

  /**
   * @group Events - Operations about event
   * @route POST /event/
   * @param {Events_POST.model} event.body.required - All attributes of event
   * @param {string} token.header.required - token
   * @returns {object} 200 - Add an event to the DB
   * @returns {Error}  default - Unexpected error
   */
  app.post(base, (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        eventControl.eventCreate(
          req.body.event_name,
          req.body.location,
          req.body.event_start,
          req.body.event_end,
          req.body.personnel,
          req.body.volunteers,
          req.body.description,
          req.body.event_typeID
        )
        .then(data => {
          req.body.artists.map(artist=> {
            contractControl.contractCreateNoContract(
              artist,
              data.id
            )
            .catch(err => console.log(err))
          })
          req.body.tickets.map(ticket => {
            ticketControl.ticketCreate(
              ticket.ticket_name,
              ticket.price,
              ticket.ticket_amount,
              ticket.date_start,
              ticket.date_end,
              data.id
            )
            .catch(err => console.log(err))
          })
          return data
        })
        .then(data => {
          req.body.riders.map(rider => {
            riderControl.riderCreate(
              rider.additions,
              rider.rider_typeID,
              data.dataValues.id,
              rider.userID
            )
            .catch(err => console.log(err))
          })
          return data;
        })
        .then( event => {
          contractControl.contractCreateNoContract(data.user.dataValues.id, event.id)
          return data
        })
        .then( data => {
          res.send(data)
        })
        .catch(err => console.log(err))
      } else {
        res.status(400).send("Not authenticated")
      }
    })
    .catch(err => console.log(err))
  });

    /**
   * @group Events - Operations about event
   * @route POST /event/{event_id}/volunteers/
   * @param {string} token.header.required - user token
   * @param {number} event_id.path.required - event id
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */

  app.post(base + "/:event_id/volunteers/", (req, res) => {
    auth.check_permissions(req.headers.token, ["User"])
    .then(data => {
      if(data.auth){
        eventControl.eventGetOne(req.params.event_id)
        .then(event => {
          contractControl.getContractVolunteersPerEvent(req.params.event_id)
          .then(contracts => {
            if(contracts.count < event.volunteers) {
              contractControl.contractCreateNoContract(data.user.dataValues.id, req.params.event_id)
              .then(data => {res.status(200).send("Volunteer registered")})
              .catch(err => {res.status(400).send("Volunteer already registered")})
            } else {
              res.status(400).send("Not any free spots")}
          })
          .catch(err => res.status(400).send("Event not found"))
        })
        .catch(err =>{res.status(400).send("event not round")})
      } else {
        res.status(400).send("Not a volunteer user")
      }
    })
  });

    /**
   * @group Events - Operations about event
   * @route GET /event/{event_id}/volunteers/
   * @param {number} event_id.path.required - Event id
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */

  app.get(base + "/:event_id/volunteers/", (req, res) => {
    eventControl.eventGetOne(req.params.event_id)
    .then(event => {
      contractControl.getContractVolunteersPerEvent(req.params.event_id)
      .then(contracts => {
        if(contracts.count < event.volunteers) {
          res.status(200).send(true)
        } else {
          res.status(200).send(false)}
      })
      .catch(err => res.status(400).send("Event not found"))
    })
    .catch(err =>{res.status(400).send("event not round")})
  });
  /**
   * @group Events - Operations about event
   * @route GET /event/{event_id}/volunteers/admin/
   * @param {string} token.header.required - user token
   * @param {number} event_id.path.required - Event id
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */

  app.get(base + "/:event_id/volunteers/admin/", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        eventControl.eventGetOne(req.params.event_id)
        .then(event => {
          if(data.role.dataValues.role_name == 'Organizer') {
            contractControl.contractGetOne(data.user.dataValues.id, req.params.event_id)
            .then((contract) => {
              if(contract == null) {
                res.status(400).send("Not authorized")
              }else {
                contractControl.getContractVolunteersPerEvent(req.params.event_id)
                .then(contracts => {
                  res.status(200).send(contracts)
                })
                .catch(err => {
                  res.status(400).send("Volunteers not found")
                })            }
            })
            .catch((err) => {
              res.status(400).send(err)
            })
          } else {
            contractControl.getContractVolunteersPerEvent(req.params.event_id)
            .then(contracts => {
              res.status(200).send(contracts)
            })
            .catch(err => {
              res.status(400).send("Volunteers not found")
            })
          }
        })
        .catch(err =>{res.status(400).send("Event not round")})
        } else {
          res.status(400).send("Not authenticated")
        }
    })
  })

  /**
   * @group Events - Operations about event
   * @route GET /event/{event_id}/volunteers/signed/
   * @param {string} token.header.required - user token
   * @param {number} event_id.path.required - event id
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */
  app.get(base + "/:event_id/volunteers/signed/", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer" ,"User"])
    .then(data => {
      if(data.auth){
        eventControl.eventGetOne(req.params.event_id)
        .then(event => {
          contractControl.contractGetOne(data.user.dataValues.id, req.params.event_id)
          .then(contract => {
            console.log(contract)
            res.send(contract)
          })
          .catch(err =>{res.status(400).send("contract not found")})
        })
        .catch(err =>{res.status(400).send("event not round")})
      } else {
        res.status(400).send("Not a volunteer user")
      }
    })
  });

  /**
   * @group Events - Operations about event
   * @route DELETE /event/{event_id}/volunteers/{id}/
   * @param {string} token.header.required - user token
   * @param {number} event_id.path.required - event id
   * @param {number} id.path.required - user id
   * @returns {object} 200 - Updates the archive variable of all events if their ending time has happened
   * @returns {Error}  default - Unexpected error
   */
  app.delete(base + "/:event_id/volunteers/", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer" ,"User"])
    .then(data => {
      if(data.auth){
        eventControl.eventGetOne(req.params.event_id)
        .then(event => {
          contractControl.contractDelete(data.user.dataValues.id, req.params.event_id)
          .then(data => {res.status(200).send("User unregistered")})
          .catch(err => {res.status(400).send(err)})
        })
        .catch(err =>{res.status(400).send("event not round")})
      } else {
        res.status(400).send("Not a volunteer user")
      }
    })
  });


  /**
   * @group Events - Operations about event
   * @route DELETE /event/{event_id}/tickets/
   * @param {string} token.header.required - user token
   * @param {number} event_id.path.required - event id
   * @returns {object} 200 - Deletes all tickets associated to an event
   * @returns {Error}  default - Unexpected error
   */
  app.delete(base + "/:event_id/tickets/", (req, res) => {
    auth.check_permissions(req.headers.token, ["Admin", "Organizer"])
    .then(data => {
      if(data.auth){
        eventControl.ticketDeleteByEvent(req.params.event_id)
        .then(event => {
          res.status(202).send("all tickets for event deleted")
        })
        .catch(err =>{res.status(400).send("event not round")})
      } else {
        res.status(400).send("Not a volunteer user")
      }
    })
  });
};
