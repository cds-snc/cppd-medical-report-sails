<template>
  <form @submit="checkForm">
    <input-text
      :name="'conditionName'"
      :label="'add_condition.name_of_condition'"
      v-model="conditionName"
      :errors="errors"
    ></input-text>

    <input-text
      :name="'symptomsBegan'"
      :label="'add_condition.symptoms_began'"
      v-model="symptomsBegan"
      :errors="errors"
    ></input-text>

    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  props: {
    condition: {
      type: Object,
      default: {}
    },
    schema: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      conditionName: "",
      symptomsBegan: "",

      errors: null
    };
  },
  mounted() {
    console.log(this.condition);
    this.conditionName = this.condition.conditionName;
    this.symptomsBegan = this.condition.symptomsBegan;
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();
      this.errors = validate(this.$data, this.schema);
    },

    hasError: function(field) {
      if (this.errors) {
        if (field in this.errors) {
          return true;
        }
      }
    }
  }
};
</script>