<template>
    <div class="alert" :class="type" role="alert">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
      type: {
          type: String,
          default: "success"
      }   
  }
}
</script>

<style scope>
.alert {
    padding: .75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 2px;
    
}
.success {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
}
.danger {
    color: #721c24;
    background-color: #f8d7da;
    border-color: #f5c6cb;
}
.warning {
    color: #856404;
    background-color: #fff3cd;
    border-color: #ffeeba;
}
</style>