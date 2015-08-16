var url = require('url')
var bluebird = require('bluebird')
var request = bluebird.promisify(require('request'))
var _ = require('underscore')

var RemoteModel = {
  remoteList: [],
  irTransmitterUrl: null,
  configure: function(options) {
    this.remoteList = options.REMOTE_LIST
    this.irTransmitterUrl = options.IR_TRANSMITTER_URL
  },
  list: function() {
    return RemoteModel.remoteList
  },
  sendCommand: function(id, command) {
    var remote = RemoteModel.findRemote(id)
    if (remote) {
      var requestOptions = {
        url: RemoteModel.irTransmitterUrl,
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
    return _.findWhere(RemoteModel.remoteList, {id: id})
  }
}

module.exports = RemoteModel
