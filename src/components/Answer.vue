<template>
    <div class="answer">      
        <input 
            placeholder="option" 
            type="text" 
            v-model="value.text" 
            :disabled="!enableEdit || disable" 
            maxlength="50"
            @change="inputOnChangeListener">
        <label>
            <input 
                type="checkbox" v-model="value.correct" 
                :disabled="disable" @change="inputOnChangeListener"/>
            <span></span>
        </label>
        <i 
            class="material-icons" @click="deleteAnswer" 
            :class="{ 'blue-grey-text text-lighten-3' : (!enableDelete || disable) }"
            v-if="enableEdit"
        >
            delete
        </i>
    </div>
</template>

<script>
export default {
    name: 'answer',
    props: {
        value: {
            type: Object,
            required: true
        },
        index: Number,
        enableDelete: {
            type: Boolean,
            default: false
        },
        enableEdit: {
            type: Boolean,
            default: false
        },
        disableById: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        deleteAnswer() {
            if(this.enableDelete && !this.disable)
                this.$emit('deleteAnswer',this.index)
        },
        inputOnChangeListener() {
            this.value.isEdited = true
        }
    },
    computed: {
        disable() {
            return this.disableById && this.value.id > 0
        }
    }
}
</script>
<style scoped>
.answer {
    display: flex;
    align-items: center;
}

.answer label{
    display: flex;
    align-items: center;
}

.answer input[type = 'text'] {
    margin-right: 15px;
}

.answer i {
    cursor: pointer;
}
</style>