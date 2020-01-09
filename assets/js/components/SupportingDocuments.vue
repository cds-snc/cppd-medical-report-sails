<template>
  <div class="file">
    <input type="hidden" :name="fieldName" v-bind:value="uploaded_files" />
    <form enctype="multipart/form-data">
      <div class>
        <label
          class="w-64 border-2 border-black cursor-pointer bg-gray-200 px-5 py-2 inline-block text-center"
        >
          <span>{{ this.uploadLabel }}</span>
          <input type="file" ref="file" @change="onSelect" class="hidden" />
        </label>
      </div>
    </form>
    <div class="mt-4">
      <table class="table-fixed">
        <thead>
          <tr>
            <th class="w-1/2 text-left">Document</th>
            <th class="w-1/2 text-left">Which condition does this refer to?</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(file, key) in uploaded_files"
            v-bind:key="key"
            class="border-t border-gray-300"
          >
            <td class="py-4 px-4">
              {{ file }}
              <br />
              <a
                href="#"
                class="flex-auto remove-file underline text-base cursor-pointer w-4"
                @click="removeFile(file)"
              >{{ removeLabel }}</a>
            </td>
            <td class="pb-4 px-4">
              <div class="multiple-choice multiple-choice--checkboxes">
                <ul class="list-none pl-0">
                  <li class="my-4" v-for="(condition, key) in conditions" v-bind:key="key">
                    <div class="multiple-choice__item">
                      <input type="checkbox" />
                      <label>{{ condition.conditionName }}</label>
                    </div>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploaded_files: [],
      allConditions: []
    };
  },
  props: {
    files: {
      type: String,
      required: true
    },
    conditions: {
      type: Array,
      required: true
    },
    fieldName: {
      type: String,
      required: true
    },
    uploadLabel: {
      type: String,
      required: true
    },
    removeLabel: {
      type: String,
      required: true
    }
  },
  methods: {
    onSelect() {
      const file = this.$refs.file.files[0];
      this.uploaded_files.push(file.name);
    },
    removeFile(file) {
      this.uploaded_files.splice(this.uploaded_files.indexOf(file), 1);
    }
  },
  mounted() {
    if (this.files) {
      this.uploaded_files = this.files.split(",");
    }
  }
};
</script>