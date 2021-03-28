# Readme

## RUN

```bash
node serial_listener.js /dev/ttyACM0
```

- Connect Arduino and specify port
- Run node

To connect node.js to a web page, your program needs to listen for messages from the web browser, web pages need to connect to the program. To do this, you will use a `webSocket`. 

- Both serial connections and webSocket connections are data streams. **They connect programs to files on your computer, or client programs to server programs, or desktop programs to network ports**.


```bash
npm install ws
```

Readl value of connecting to serial port to a server is to generate a dynamic HTML from the sensors.

[ARTICLE](https://itp.nyu.edu/physcomp/labs/labs-serial-communication/lab-serial-communication-with-node-js/)


/