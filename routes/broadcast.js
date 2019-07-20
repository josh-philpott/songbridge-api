const express = require('express')
const generate = require('nanoid/async/generate')

const router = express.Router()

//TODO: Move this to a postgres or redis
const currentBroadcasts = {}

/**
 * Create a new broadcast
 *
 * Returns the broadcastId
 */
router.post('/create', async (req, res) => {
  const broadcastId = await generate('0123456789abcdefghijklmnopqrstuvwxyz', 6)
  currentBroadcasts[broadcastId] = {}
  console.log(broadcastId)
  res.send(broadcastId)
})

router.get('/list', (req, res) => {
  const broadcasts = Object.keys(currentBroadcasts)
  res.send(broadcasts)
})

router.put('/update', async (req, res) => {
  const broadcastId = req.body.currentlyPlaying.broadcastId //TODO: Fix this
  const currentlyPlaying = req.body.currentlyPlaying.currentlyPlaying

  currentBroadcasts[broadcastId] = currentlyPlaying

  let progress_s = currentlyPlaying.progress_ms / 1000
  const progress_m = Math.floor(progress_s / 60)
  progress_s = Math.floor(progress_s - progress_m * 60)

  if (currentlyPlaying) {
    console.log(
      `${currentlyPlaying.item.name} by ${
        currentlyPlaying.item.artists[0].name
      } @ ${progress_m}:${progress_s}`
    )
  }
  res.send()
})

router.get('/:broadcastId', async (req, res) => {
  const broadcastId = req.params.broadcastId
  res.send(currentBroadcasts[broadcastId])
})

module.exports = router
