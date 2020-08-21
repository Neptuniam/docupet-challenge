<template>
<div class="inputField" :class="{'transitioned': !!localValue}">
    <input v-if="type === 'input'"
        :id="uniqueID"
        class="uk-input roundEdge"
        :class="{'error': !!errorMessage}"
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

    <div v-if="errorMessage" class="errorMessage">
        {{errorMessage}}
    </div>

    <div v-if="appendIcon && !!localValue"
        class="uk-icon clickable"
        :uk-icon="appendIcon"
        @click="$emit('append-icon-click', $event)"
    />
</div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'input'
        },

        placeholder: String,

        appendIcon: String,

        errorMessage: String,

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
            if (this.errorMessage)
                this.errorMessage = null

            this.$emit('update:value', this.localValue)
            this.$emit('input', $event)
        }
    },

    watch: {
        value() {
            // Listen to changes coming from the parent
            if (this.value != this.localValue) {
                this.localValue = this.value
            }
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

    .error {
        border-color: #f0506e;
    }

    .errorMessage {
        height: 20px;
        font-size: 12px;
        color: #f0506e;

        padding-left: 5px;
    }
</style>
