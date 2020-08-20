<template>
    <div class="inputField" :class="{'transitioned': !!localValue}">
        <input v-if="type === 'input'"
            :id="uniqueID"
            class="uk-input roundEdge"
            v-model="localValue"
            @input="handleInput"
        >
        <textarea v-else
            :id="uniqueID"
            class="uk-textarea roundEdge"
            rows="4"
            v-model="localValue"
            @input="handleInput"
        >
        </textarea>

        <label :for="uniqueID">
            {{ placeholder }}
        </label>

        <div v-if="clearable && !!localValue" class="uk-icon clickable" uk-icon="close" @click="clear" />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'input'
        },

        placeholder: {
            type: String
        },

        clearable: {
            type: Boolean,
            default: false
        },

        value: {}
    },

    data() {
        return {
            uniqueID: `name${this.placeholder}${(new Date()).getTime()}`,
            localValue: this.value
        }
    },

    methods: {
        handleInput($event) {
            this.$emit('update:value', this.localValue)
            this.$emit('input', $event)
        },

        clear() {
            this.localValue = null
            this.$emit('update:value', this.localValue)
        }
    },
}
</script>

<style scoped>
    .inputField {
        position: relative;
    }

    label {
        position: absolute;
        top: 20px;
        left: 10px;

        font-weight: 600;
        color: #747474;
        line-height: 30px;
        text-align: left;

        transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        cursor: text;
        user-select: none;
        transition: 0.25s ease-in-out;

        padding: 0px;
        background-color: white;
    }

    .transitioned label, input:focus + label, textarea:focus + label {
        top: 0px;
        left: 5px;
        font-size: 10px;
        line-height: 10px;

        color: #3994D6 !important;
        margin: 0px 0px;
        padding: 0px 5px !important;
    }
    .transitioned input, input:focus,
    .transitioned textarea, textarea:focus {
        border: 1px solid #3994D6;
    }

    .uk-icon {
        position: absolute;
        top: 11px;
        right: 10px;
    }
</style>
