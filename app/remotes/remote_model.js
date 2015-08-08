var url = require('url')
var bluebird = require('bluebird')
var request = bluebird.promisify(require('request'))
var _ = require('underscore')
var remoteList = require('../../config/config').REMOTE_LIST
var irTransmitterUrl = require('../../config/config').IR_TRANSMITTER_URL

var RemoteModel = {
  list: function() {
    return remoteList
  },
  sendCommand: function(remoteKey, command) {
    var remote = RemoteModel.findRemote(id)
    if (remote) {
      var requestOptions = {
        url: irTransmitterUrl,
        qs: {
          remote: remote.key,
          command: command
        },
        method: 'GET'
      }

      return request(requestOptions).spread(RemoteModel.processResponse)
    }

    throw new Error("Invalid remote")
  },
  processResponse: function(res, body) {
    if (res.statusCode != 200) {
      throw new Error("Non-200 response received: " + res.statusCode)
    }

    return body
  },
  findRemote: function(id) {
    return _.findWhere(remoteList, {id: id})
  }
}

module.exports = RemoteModel
