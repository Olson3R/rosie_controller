var Joi = require('joi')
var RemoteModel = require('./remote_model')

var routes = function(server) {

  server.route({
    method: 'GET',
    path: '/remotes',
    config: {
      handler: function(req, res) {
        res(RemoteModel.list())
      }
    }
  })

  server.route({
    method: 'PUT',
    path: '/remotes/{id}',
    config: {
      handler: function(req, res) {
        RemoteModel.sendCommand(req.params.id, req.payload.command)
        res()
      },
      validate: {
        payload: {
          command: Joi.string().required()
        }
      }
    }
  })
}

module.exports = routes
