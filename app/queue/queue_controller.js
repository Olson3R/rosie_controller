var _ = require('underscore')
var kue = require('../../lib/kue').kue
var queue = require('../../lib/kue').queue

// workers
var workers = {
  fell_asleep_aid: require('./workers/fell_asleep_aid')
}

var handlers = {}

handlers.index = {
  handler: function(req, res) {
    kue.Job.rangeByType('fell_asleep_aid', 'delayed', 0, 100, 'asc', function(err, jobs) {
      res(jobs)
    })
  }
}

handlers.create = {
  handler: function(req, res) {
    var worker = _.result(workers, req.params.jobType)
    if (worker) {
      var job = worker.create(req.payload)
      res(job).code(201)
    } else {
      res('invalid_job_type').code(422)
    }
  }
}

module.exports = handlers
