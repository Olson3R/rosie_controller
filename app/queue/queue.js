var _ = require('underscore')
var kue = require('../../lib/kue').kue
var queue = require('../../lib/kue').queue

var Queue = {
  listAll: function(done) {
    kue.Job.rangeByType('fell_asleep_aid', 'delayed', 0, 100, 'asc', done)
  },
  removeJob: function(id) {
    if (!id) return

    kue.Job.get(id, function(err, job) {
      if (err) return
      job.remove(_.noop)
    })
  },
  findExisting: function(jobType, done) {
    // bluebird.promisify(kue.Job.rangeByType(jobType, 'delayed', 0, 1000, 'asc'))
    kue.Job.rangeByType(jobType, 'delayed', 0, 1000, 'asc', done)
  }
}

module.exports = Queue
