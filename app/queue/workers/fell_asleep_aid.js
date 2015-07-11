var bluebird = require('bluebird')
var _ = require('underscore')
var kue = require('../../../lib/kue').kue
var queue = require('../../../lib/kue').queue
var remoteModel = require('../../remotes/remote_model')
var zwaveModel = require('../../zwave/base_model')

var FellAsleepAid = {
  jobType: 'fell_asleep_aid',
  create: function(data) {
    findExisting(function(err, jobs) {
        _.each(jobs, function(job) {
          job.remove(_.noop)
        })
        create(data)
      })
  },
  createNext: function() {
    findExisting(function(err, jobs) {
        if (jobs.length === 0) {
          create()
        }
      })
  }
}

queue.process('fell_asleep_aid', 1, function(job, done) {
  console.log('FellAsleepAid: begin')
  turnOffLights()
  turnOffDevices()
  FellAsleepAid.createNext()
  console.log('FellAsleepAid: end')
  done()
})

function turnOffLights() {
  _.each(zwaveModel.lights(), function(light) {
    light.turnOff()
  })
}

function turnOffDevices() {
  remoteModel.sendCommand('receiver', 'power off')
  remoteModel.sendCommand('tv', 'power off')
}

function create(data) {
  var run_at = _.result(data, 'run_at') || nextRunAt()
  queue.create(FellAsleepAid.jobType)
    .delay(run_at)
    .removeOnComplete(true)
    .save()
}

function findExisting(done) {
  // bluebird.promisify(kue.Job.rangeByType(FellAsleepAid.jobType, 'delayed', 0, 1000, 'asc'))
  kue.Job.rangeByType(FellAsleepAid.jobType, 'delayed', 0, 1000, 'asc', done)
}

function nextRunAt() {
  var date = new Date()
  if (date.getHours() >= 2) {
    date.setDate(date.getDate() + 1)
  }
  date.setHours(2, 0, 0, 0)
  return date
}

module.exports = FellAsleepAid
