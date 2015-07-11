var kue = require('kue')

var queue = kue.createQueue()
kue.app.listen(4002)

queue.on('job enqueue', function(id, type) {
  console.log('Job %s got queued of type %s', id, type)
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
