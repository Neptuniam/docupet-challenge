<template>
<div>
    <div v-if="note" class="uk-card uk-card-default uk-card-body roundEdge">
        <h1 class="uk-card-title">
            {{ note.id ? 'Edit' : 'New' }} Note
        </h1>

        <custom-input :value.sync="note.title" placeholder="Title *" ref="title" />

        <div class="spacer"></div>

        <custom-input :value.sync="note.body" placeholder="Body" type="textarea" />

        <div class="spacer"></div>

        <custom-input :value.sync="newTag" placeholder="New Tag" append-icon="plus" @append-icon-click="addTag" />
        <span v-for="(tag, index) in note.tags" :key="`${tag}${index}`" class="uk-badge">
            {{tag}} <span class="uk-icon clickable" uk-icon="icon: close; ratio: 0.8" @click="deleteTag(index)" />
        </span>

        <div class="WhatIsThis" uk-tooltip="Include comma-deliminated key words to search for on the main page in order to make finding notes easier">
            What Is this?
        </div>

        <div class="spacer"></div>
        <div class="spacer"></div>

        <div class="row fullWidth noMargin around-xs">
            <custom-button
                class="col-xs-10 col-md-3"
                colour="primary"
                label="Save"
                :click="saveAction"
            />

            <custom-button
                class="col-xs-10 col-md-3"
                colour="secondary"
                label="Cancel"
                :click="cancel"
            />

            <custom-button
                class="col-xs-10 col-md-3"
                colour="danger"
                label="Delete"
                :click="deleteAction"
                :disabled="!note.id"
            />
        </div>
    </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Swal from 'sweetalert2'

export default {
    props: ['id'],

    data() {
        return {
            // Generate new notes here so Vue can set up setters and getters for us
            emptyNote: {
                // I normally use 0 to signify it's new
                id: 0,
                title: null,
                body: null,
                tags: []
            },

            newTag: null
        }
    },

    computed: {
        /*
            We could pass the entire note object through the store,
            but including the id in the path has several pros:
             * it allows the user to bookmark specific notes,
             * refresh the page without the need for persistence storage,
             * and improves reliablity that it's up to date with the backend
        */
        note() {
            // Wait until the notes have been fetched
            if (this.notes !== null) {
                let note = this.notes.find(note => note.id == this.id) || this.emptyNote

                // Provide a clone of the object so the changes won't be saved if the user cancels
                return {...note}
            }
            return null
        },

        ...mapGetters({
            notes: 'getNotes',
        })
    },

    methods: {
        async saveAction() {
            // title is the only field I require
            if (this.note.title) {
                const res = await Swal.fire({
                    title: 'Are you ready to<br>save your changes?',
                    icon: 'question',
                    position: 'top',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, save!',
                    cancelButtonText: 'Not yet',
                    cancelButtonColor: '#080808'
                })

                // res.value indicates the user hit the confirmButton
                if (res.value) {
                    this.saveNote(this.note)
                    this.$router.back()
                }
            } else {
                window.UIkit.notification({
                    message: 'Please include a note title',
                    status: 'danger'
                })

                this.$refs.title.errorMessage = 'Please include a note title'
            }
        },

        async deleteAction() {
            const res = await Swal.fire({
                title: 'Are you sure you want<br>to delete this note?',
                text: 'You will not be able to recover it!',
                icon: 'warning',
                position: 'top',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                confirmButtonColor: '#f0506e',
                cancelButtonText: 'No, keep it',
                cancelButtonColor: '#080808'
            })

            if (res.value) {
                this.deleteNote(this.note)
                this.$router.back()
            }
        },

        async cancel() {
            const res = await Swal.fire({
                title: 'Are you sure you want<br>to discard any changes?',
                text: 'You will not be able to recover them!',
                icon: 'question',
                position: 'top',
                showCancelButton: true,
                confirmButtonText: 'Yes, go back!',
                cancelButtonText: 'Not yet',
                cancelButtonColor: '#080808'
            })

            if (res.value) {
                this.$router.back()
            }
        },

        addTag() {
            // Add the new tag and clear the input
            this.note.tags.push(this.newTag)
            this.newTag = null
        },
        deleteTag(index) {
            this.note.tags.splice(index, 1)

            // Hack to get tags list to update
            this.$forceUpdate()
        },

        ...mapActions(['saveNote', 'deleteNote'])
    }
}
</script>

<!--
    I found a custom input label animation I really like to use for personal project
    Credit: https://codepen.io/sivan/pen/alKwf
-->

<style scoped>
    .uk-card {
        max-width: 600px;
        margin: auto;
    }

    .uk-button {
        margin: 5px auto;
    }

    .WhatIsThis {
        font-size: 12px;
        margin: 10px 0px 0px 5px;

        text-decoration: underline;
    }

    .uk-badge {
        padding: 5px 10px;
        border-radius: 5px;
        margin: 5px 5px 0px 0px;
    }
    .uk-badge .uk-icon {
        margin-left: 5px;
    }
</style>
