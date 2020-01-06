<template>
  <div v-bind:class="{ 'has-error': hasErrors }">
    <fieldset class="fieldset">
      <legend class="fieldset__legend">
        <span aria-hidden="true" class="required" v-show="attributes.required">*</span>
        {{ $t(label) }}
        <span
          class="required"
          v-show="attributes.required"
        >{{ $t("required")}}</span>
      </legend>

      <span class="form-message" v-show="attributes.hint">{{ $t(attributes.hint) }}</span>

      <div class="multiple-choice multiple-choice--radios" :id="name">
        <div class="validation-message" :id="name + '-error'" role="alert" v-show="hasErrors">
          <span v-for="(msg, index) in fieldErrors" v-bind:key="index">
            <span class="visually-hidden">{{ $t('Error:') }}</span>
            {{ $t(msg) }}
            <br />
          </span>
        </div>

        <div class="multiple-choice__item" v-for="(value, index) in values" v-bind:key="index">
          <input
            :id="name + value"
            :name="name"
            type="radio"
            v-bind:value="index"
            :checked="selected === index"
            v-on:change="updateValue($event.target.value)"
          />
          <label :for="name + value">{{ $t(value) }}</label>
        </div>
      </div>
    </fieldset>
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
    values: {
      type: Object,
      default: null,
      required: true
    },
    selected: {
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