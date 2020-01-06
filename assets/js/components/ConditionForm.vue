<template>
  <div>
    <div v-show="hasErrors" class="error-list" role="alert">
      <h3 class="error-list__header">{{ $t('Please correct the errors on the page') }}</h3>
      <ol class="error-list__list" id="formErrors">
        <div v-for="(messages, field) in errors" v-bind:key="field">
          <li class="error-list__list-item" v-for="(message, index) in messages" v-bind:key="index">
            <a class="error-list__link" :href="'#' + field">{{ $t(message) }}</a>
          </li>
        </div>
      </ol>
    </div>

    <form @submit="checkForm" :action="url" method="post">
      <input type="hidden" name="csrf" :value="csrf" />

      <input-text
        :name="'conditionName'"
        :label="'add_condition.name_of_condition'"
        v-model="conditionName"
        :errors="errors"
        :attributes="{ required: true }"
      ></input-text>

      <input-text
        :name="'symptomsBegan'"
        :label="'add_condition.symptoms_began'"
        v-model="symptomsBegan"
        :errors="errors"
        :attributes="{ required: true }"
      ></input-text>

      <input-textarea
        :name="'clinicallyImpair'"
        :label="'add_condition.clinically_impair'"
        v-model="clinicallyImpair"
        :errors="errors"
        :attributes="{ required: true, hint: 'add_condition.clinically_impair_hint' }"
      ></input-textarea>

      <radios
        :name="'conditionOutlook'"
        v-model="conditionOutlook"
        :values="{ '1':'add_condition.condition_outlook_improve','2':'add_condition.condition_outlook_deteriorate', '3':'add_condition.condition_outlook_staysame', '4':'add_condition.condition_outlook_unknown'}"
        :selected="condition.conditionOutlook"
        :label="'add_condition.condition_outlook'"
        :errors="errors"
        :attributes="{ required: true }"
      ></radios>

      <div id="unknown_outlook_details" class="ml-4">
        <input-textarea
          :name="'conditionOutlookUnknown'"
          :label="'add_condition.prognosis_unknown'"
          v-model="conditionOutlookUnknown"
          :errors="errors"
          :attributes="{ required: true }"
        ></input-textarea>
      </div>

      <radios
        :name="'conditionLast'"
        v-model="conditionLast"
        :values="{ '1':'add_condition.condition_last_1_year', '2':'add_condition.condition_last_more' }"
        :selected="condition.conditionLast"
        :label="'add_condition.condition_last'"
        :errors="errors"
        :attributes="{ required: true }"
      ></radios>

      <radios
        :name="'symptomsOccur'"
        v-model="symptomsOccur"
        :values="{ '1':'add_condition.symptoms_occur_periodically', '2':'add_condition.symptoms_occur_continuously', '3':'add_condition.symptoms_occur_unknown'}"
        :selected="condition.symptomsOccur"
        :label="'add_condition.symptoms_occur'"
        :errors="errors"
        :attributes="{ required: true }"
      ></radios>

      <div id="unknown_symptoms_occur_details" class="ml-4">
        <input-textarea
          :name="'symptomsOccurUnknown'"
          :label="'add_condition.symptoms_occur_unknown_label'"
          v-model="symptomsOccurUnknown"
          :errors="errors"
          :attributes="{ required: true }"
        ></input-textarea>
      </div>

      <div class="w-full flex">
        <div class="w-1/3">
          <button type="submit">{{ $t('add_condition.add_condition') }}</button>
        </div>

        <div class="w-1/3 text-center">
          <a class="button-link transparent">{{ $t('Cancel') }}</a>
        </div>
      </div>
    </form>
  </div>
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
      default: {},
      required: false
    },
    url: {
      type: String,
      default: "",
      required: true
    },
    csrf: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      conditionName: "",
      symptomsBegan: "",
      clinicallyImpair: "",
      conditionOutlook: "",
      conditionOutlookUnknown: "",
      conditionLast: "",
      symptomsOccur: "",
      symptomsOccurUnknown: "",

      errors: null
    };
  },
  computed: {
    hasErrors: function() {
      if (this.errors) {
        return true;
      }
      return false;
    }
  },
  mounted() {
    console.log(this.condition);
    this.conditionName = this.condition.conditionName;
    this.symptomsBegan = this.condition.symptomsBegan;
    this.clinicallyImpair = this.condition.clinicallyImpair;
    this.conditionOutlook = this.condition.conditionOutlook;
    this.conditionOutlookUnknown = this.condition.conditionOutlookUnknown;
    this.conditionLast = this.condition.conditionLast;
    this.symptomsOccur = this.condition.symptomsOccur;
    this.symptomsOccurUnknown = this.condition.symptomsOccurUnknown;
  },
  methods: {
    checkForm: function(e) {
      this.errors = validate(this.$data, this.schema);
      console.log("this.data");
      console.log(this.$data);
      if (this.errors) {
        console.log(this.errors);
        e.preventDefault();
      }
    }
  }
};
</script>