<template>
  <div v-bind:class="{ 'has-error': hasErrors }">
    <label :for="name">{{ $t(label) }}</label>

    <div class="validation-message" id="-error" role="alert" v-show="hasErrors">
      <span v-for="(msg, index) in myErrors" v-bind:key="index">
        <span class="visually-hidden">{{ $t('Error:') }}</span>
        {{ $t(msg) }}
        <br />
      </span>
    </div>

    <input
      type="text"
      :id="name"
      v-bind:value="value"
      v-on:input="updateValue($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null,
      required: false
    },
    errors: {
      type: Object,
      default: null
    },
    attributes: {
      type: Object
    }
  },
  data() {
    return {
      text: null,
      myErrors: null
    };
  },
  mounted() {
    this.text = this.value;
  },
  computed: {
    hasErrors: function() {
      if (this.errors) {
        if (this.name in this.errors) {
          this.myErrors = this.errors[this.name];
          return true;
        }
      }
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>