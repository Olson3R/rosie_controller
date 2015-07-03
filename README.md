# rosie_webui
A web interface for the Rosie home automation software.

## Dependencies
1. Node: Requires `0.10.x` for `node-openzwave`.
2. Z-Wave Controller: I have used the [Aeon Labs: Z-Stick](http://aeotec.com/z-wave-usb-stick).
3. Ethernet Connected IR Blaster: I have used [IRTrans Ethernet](http://www.irtrans.de/en/technicalinfo/lan.php)

## Setup
1. Modify the [config]() file.
2. Run `npm install`

## Running the app
1. Run `node index.js`
  * If you are developing, you may want to use something like `nodemon` to automatically reload the app when you make changes.
