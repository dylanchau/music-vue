<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <app-upload ref="upload" :addSong="addSong" />
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-item
              v-for="(song, i) in songs"
              :key="song.docID"
              :song="song"
              :updateSong="updateSong"
              :index="i"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import CompositionItem from '@/components/CompositionItem.vue'
import AppUpload from '@/components/UploadComponent.vue'
import { songsCollection, auth } from '@/includes/firebase'

const songs = ref([])
const unsavedFlag = ref(false)

onMounted(async () => {
  const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get()
  snapshot.forEach(addSong)
})

const addSong = (document) => {
  const song = {
    ...document.data(),
    docID: document.id
  }
  songs.value.push(song)
}

const removeSong = (i) => songs.value.splice(i, 1)

const updateUnsavedFlag = (value) => (unsavedFlag.value = value)

const updateSong = (i, values) => {
  songs.value[i].modified_name = values.modified_name
  songs.value[i].genere = values.genere
}

onBeforeRouteLeave((to, from, next) => {
  if (!unsavedFlag.value) {
    next()
  } else {
    const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
    next(leave)
  }
})
</script>
