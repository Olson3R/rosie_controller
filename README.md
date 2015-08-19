# rosie_controller
A rest API for the Rosie home automation software. This does not actually provide any functionality without adding plugins. The plugins are built for [hapijs](http://hapijs.com/) and are intended to be run with [rejoice](https://github.com/hapijs/rejoice).

## Plugins
* [rosie_controller_remotes](https://github.com/Olson3R/rosie_controller_remotes)
 * Adds the ability to interface with IR controlled devices
 * Adds /remotes endpoints
 * Requires physical hardware
* [rosie_controller_tasks](https://github.com/Olson3R/rosie_controller_tasks)
 * Adds the ability to CRUD tasks and process tasks.
 * Adds /queue endpoints
* [rosie_controller_zwave](https://github.com/Olson3R/rosie_controller_zwave)
 * Adds the ability to interface with Z-Wave devices
 * Adds /zwave endpoints
 * Currently depends on [rosie_controller_remotes](https://github.com/Olson3R/rosie_controller_remotes) and [rosie_controller_tasks](https://github.com/Olson3R/rosie_controller_tasks)

## Dependencies
1. Node: Requires `0.10.x` for [rosie_controller_zwave](https://github.com/Olson3R/rosie_controller_zwave).
2. Some plugins require physical hardware

## Setup
1. Modify the [package.json](https://github.com/Olson3R/rosie_controller/blob/master/package.json) file to include the plugins you want to include.
2. Modify the [rejoice config](https://github.com/Olson3R/rosie_controller/blob/master/index.json) file to include and configure the plugins you want to include.
3. Run `npm install`

## Running the app
1. Run `npm start`
