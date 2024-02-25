import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '@/includes/helper'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
    playerProgress: '0%'
  }),
  getters: {
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing()
      }
      return false
    }
  },
  actions: {
    newSong(state, payload) {
      state.currentSong = payload
      state.sound = new Howl({
        src: [payload.url],
        html5: true
      })
    },

    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek())
      state.duration = helper.formatTime(state.sound.duration())
      state.playerProgress = `${(state.sound.seek() / state.sound.duration()) * 100}%`
    },

    async playerNewSong(payload) {
      if (this.sound instanceof Howl) {
        this.sound.unload()
      }

      // commit('newSong', payload);
      this.newSong(payload)

      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(() => {
          this.progress()
        })
      })
    },

    progress() {
      this.updatePosition()

      if (this.sound.playing()) {
        requestAnimationFrame(() => {
          this.progress()
        })
      }
    },

    async toggleAudio() {
      if (!this.state.sound.playing) {
        return
      }

      if (this.state.sound.playing()) {
        this.state.sound.pause()
      } else {
        this.state.sound.play()
      }
    },

    updateSeek(payload) {
      if (!this.sound.playing) {
        return
      }

      const { x, width } = payload.currentTarget.getBoundingClientRect()
      // Document = 2000, Timeline = 1000, Click = 500, Distance = 500
      const clickX = payload.clientX - x
      const percentage = clickX / width
      const seconds = this.sound.duration() * percentage

      this.sound.seek(seconds)

      this.sound.once('seek', () => {
        this.progress()
      })
    }
  }
})
