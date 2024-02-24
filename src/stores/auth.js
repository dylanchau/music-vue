import { defineStore } from 'pinia'
import { auth } from '@/includes/firebase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authModalShow: false,
    userLoggedIn: false
  }),
  getters: {
    isShow: (state) => state.authModalShow
  },
  actions: {
    toggleAuthModal() {
      this.authModalShow = !this.authModalShow
      console.log(this.authModalShow)
    },

    toggleAuth() {
      this.userLoggedIn = !this.userLoggedIn
    },

    async login(email, password) {
      await auth.signInWithEmailAndPassword(email, password)
      this.toggleAuth()
    },

    initLogin() {
      const user = auth.currentUser
      if (user) {
        this.toggleAuth()
      }
    },

    async signout() {
      await auth.signOut()
      this.toggleAuth()
    }
  }
})
