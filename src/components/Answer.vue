<template>
    <div class="answer">      
        <input placeholder="option" type="text" v-model="value.text" :disabled="!enableEdit">
        <label>
            <input type="checkbox" v-model="value.correct"/><span></span>
        </label>
        <i 
            class="material-icons" @click="deleteAnswer" 
            :class="{ 'blue-grey-text text-lighten-3' : !enableDelete }"
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
        }
    },
    methods: {
        deleteAnswer() {
            this.$emit('deleteAnswer',this.index)
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