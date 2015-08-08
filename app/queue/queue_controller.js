var _ = require('underscore')
var Queue = require('./queue')

var workers = {
  fell_asleep_aid: require('./workers/fell_asleep_aid')
}

var handlers = {}

handlers.index = {
  handler: function(req, res) {
    Queue.listAll(function(err, jobs) {
      res(jobs)
    })
  }
}

handlers.create = {
  handler: function(req, res) {
    var jobData = req.payload
    var worker = _.result(workers, jobData.type)
    if (worker) {
      worker.create(jobData)
        .then(function(job) {
          res(job).code(201)
        })
        .catch(function(err) {
          res(err).code(500)
        })
    } else {
      res('invalid_job_type').code(422)
    }
  }
}

handlers.update = {
  handler: function(req, res) {
    var jobData = req.payload
    var worker = _.result(workers, jobData.type)
    if (worker) {
      worker.create(jobData)
        .then(function(job) {
          res(job).code(201)
        })
        .catch(function(err) {
          res(err).code(500)
        })
    } else {
      res('invalid_job_type').code(422)
    }
  }
}

handlers.delete = {
  handler: function(req, res) {
    Queue.removeJob(req.params.id)
    res().code(204)
  }
}

module.exports = handlers
