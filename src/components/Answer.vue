<template>
    <div class="answer">      
        <input 
            placeholder="option" 
            type="text" 
            v-model="value.text" 
            :disabled="!enableEdit" 
            maxlength="50"
            @change="inputOnChangeListener">
        <label>
            <input 
                type="checkbox" v-model="value.correct" 
                @change="inputOnChangeListener"/>
            <span></span>
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
import ActionsEnum from '../utils/ActionsEnum'
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
            if(this.enableDelete && !this.disable)
                this.$emit('deleteAnswer',this.index)
        },
        inputOnChangeListener() {
            if(this.value.action != ActionsEnum.CREATE)
                this.value.action = ActionsEnum.UPDATE
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
    color: var(--grey); 
}
</style>