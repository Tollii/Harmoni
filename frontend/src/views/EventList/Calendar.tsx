import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default (props: any) => {
  const [events, setEvents] = useState<any>([]);

  useEffect(() => {
    let temp: any = [];
    props.events.map((event: any) => {
      temp.push({
        id: event.id,
        title: event.event_name,
        start: new Date(event.event_start),
        end: new Date(event.event_end)
      });
      return null;
    });
    setEvents(temp);
  }, [props.events]);

  const handleEventClick = (arg: any) => {
    window.location.hash = "#/event/" + arg.event._def.publicId;
  };

  return (
    <div style={{ margin: "0 50px 0 50px" }}>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        weekends={true}
        events={events}
        eventClick={handleEventClick}
        eventMouseEnter={() => {
          document.body.style.cursor = "pointer";
        }}
        eventMouseLeave={() => {
          document.body.style.cursor = "default";
        }}
        displayEventTime={false}
      />
    </div>
  );
};
