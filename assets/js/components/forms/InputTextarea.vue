<template>
  <div v-bind:class="{ 'has-error': hasErrors }">
    <label :for="name">
      <span aria-hidden="true" class="required" v-show="attributes.required">*</span>
      {{ $t(label) }}
      <span class="required" v-show="attributes.required">{{ $t("required")}}</span>
    </label>

    <span class="form-message" v-show="attributes.hint">{{ $t(attributes.hint) }}</span>

    <div class="validation-message" :id="name + '-error'" role="alert" v-show="hasErrors">
      <span v-for="(msg, index) in fieldErrors" v-bind:key="index">
        <span class="visually-hidden">{{ $t('Error:') }}</span>
        {{ $t(msg) }}
        <br />
      </span>
    </div>

    <textarea :name="name" :id="name" :value="value" v-on:input="updateValue($event.target.value)"></textarea>
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
      fieldErrors: null
    };
  },
  mounted() {},
  computed: {
    hasErrors: function() {
      if (this.errors) {
        if (this.name in this.errors) {
          this.fieldErrors = this.errors[this.name];
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