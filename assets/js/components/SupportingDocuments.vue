<template>
  <div class="file">
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
      <table class="table-fixed" v-show="uploaded_files.length > 0">
        <thead>
          <tr>
            <th class="w-1/2 text-left">Document</th>
            <th class="w-1/2 text-left">Which condition does this refer to?</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(file) in uploaded_files"
            v-bind:key="file.id"
            class="border-t border-gray-300"
          >
            <td class="py-4 px-4">
              {{ file.fileName }}
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
                  <li class="my-4" v-for="(condition) in conditions" v-bind:key="condition.id">
                    <div class="multiple-choice__item">
                      <input
                        type="checkbox"
                        :name="'supportingDocuments[' + file.fileName + ']Conditions'"
                        :value="condition.id"
                        :checked="isSelected(condition.id, file.Conditions)"
                      />
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
      type: Array,
      required: true
    },
    conditions: {
      type: Array,
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
      this.uploaded_files.push({
        id: null,
        fileName: file.name,
        Conditions: []
      });
      console.log(this.uploaded_files);
    },
    removeFile(file) {
      this.uploaded_files.splice(this.uploaded_files.indexOf(file), 1);
    },
    isSelected(conditionId, selectedConditions) {
      let selectedIds = selectedConditions.map(condition => condition.id);
      return selectedIds.indexOf(conditionId) !== -1;
    }
  },
  mounted() {
    if (this.files) {
      console.log(this.files);
      this.uploaded_files = this.files;
    }
  }
};
</script>