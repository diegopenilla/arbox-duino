# HDMI RENDER

Has a live server listening to changes on the `currentSketch.js` (controlled from `/sketch_manager`).
- Public Facing => faces end user.

- `live_server_hot_reload.js`: starts HDMI render.
- `public/webSocketHandler.js`: handles the incoming data from the `/serial_listener`.