var Promise = require('bluebird')
var _ = require('underscore')
var kue = require('../../../lib/kue').kue
var queue = require('../../../lib/kue').queue
var Queue = require('../queue')
var remoteModel = require('../../remotes/remote_model')
var zwaveModel = require('../../zwave/base_model')

var FellAsleepAid = {
  jobType: 'fell_asleep_aid',
  create: function(data) {
    return new Promise(function(resolve, reject) {
      findExisting(function(err, jobs) {
        _.each(jobs, function(job) {
          job.remove(_.noop)
        })
        resolve(create(data))
      })
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
  return new Promise(function(resolve, reject) {
    var promote_at = toDate(_.result(data, 'promote_at')) || nextRunAt()
    var job = queue.create(FellAsleepAid.jobType)
      .delay(promote_at)
      .removeOnComplete(true)
      .save(function(err) {
        if (err) {
          reject(err)
        } else {
          resolve(job)
        }
      })
  })
}

function findExisting(done) {
  Queue.findExisting(FellAsleepAid.jobType, done)
}

function nextRunAt() {
  var date = new Date()
  if (date.getHours() >= 2) {
    date.setDate(date.getDate() + 1)
  }
  date.setHours(2, 0, 0, 0)
  return date
}

function toDate(timestampInt) {
  timestampInt = parseInt(timestampInt)
  if (!timestampInt) { return null }
  return new Date(timestampInt)
}

module.exports = FellAsleepAid
