var kue = require('kue')

var queue = kue.createQueue()
kue.app.listen(4002)

queue.on('job enqueue', function(id, type) {
  console.log('Job %s got queued of type %s', id, type)
})

queue.on('job complete', function(id, result) {
  kue.Job.get(id, function(err, job) {
    if (err) return
    job.remove(function(err) {
      if (err) throw err
      console.log('Removed completed job #%d', job.id)
    })
  })
})

function stop(sig, done) {
  console.log('Kue: stopping...')
  queue.shutdown( 5000, function(err) {
    console.log('Kue: stopped', err||'')
    done(err)
  })
}

module.exports.kue = kue
module.exports.queue = queue
module.exports.stop = stop
