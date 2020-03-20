<template>
  <div class="file">
    <div :class="uploadError.length ? 'pl-8 border-l-4 border-red-700' : ''">
      <div class="border-2 focus-within:border-orange-400 inline-block">
        <input
          type="file"
          id="file"
          name="file"
          ref="file"
          class="sr-only"
          @change="onSelect"
          :aria-describedby="uploadError.length > 0 ? 'file-error' : ''"
          :aria-invalid="uploadError.length > 0"
        />

        <label
          for="file"
          class="w-64 border-2 border-black cursor-pointer bg-gray-200 hover:bg-gray-300 px-5 py-2 inline-block text-center"
        >{{ this.uploadLabel }}</label>
      </div>

      <span v-if="uploadError.length" class="validation-message" id="file-error" role="alert">
        <span class="visually-hidden">Error:</span>
        {{ uploadError }}
      </span>
    </div>

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
                @click.prevent="removeFile(file.id)"
                :title="'Delete item ' + file.fileName"
              >{{ removeLabel }}</a>
            </td>
            <td class="pb-4 px-4">
              <div class="multiple-choice multiple-choice--checkboxes">
                <ul class="list-none pl-0">
                  <li class="my-4" v-for="(condition) in conditions" v-bind:key="condition.id">
                    <div class="multiple-choice__item">
                      <input
                        type="checkbox"
                        :id="'supportingDocuments_' + file.id + '_' + condition.id"
                        :value="condition.id"
                        v-model="file.conditions"
                        @change="saveConditions(file)"
                      />
                      <label
                        :for="'supportingDocuments_' + file.id + '_' + condition.id"
                      >{{ condition.conditionName }}</label>
                    </div>
                  </li>
                </ul>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="multiple-choice multiple-choice--checkboxes">
      <div class="multiple-choice__item">
        <input id="attachLater" name="attachLater" type="checkbox" value="attachLater" />
        <label for="attachLater">{{ attachLaterLabel }}</label>
      </div>
    </div>

    <div class="buttons">
      <div class="buttons--left">
        <button type="submit" class="w-1/3">{{ nextButtonLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploaded_files: [],
      conditions: [],
      uploadError: []
    };
  },
  props: {
    uploadLabel: {
      type: String,
      required: true
    },
    removeLabel: {
      type: String,
      required: true
    },
    attachLaterLabel: {
      type: String,
      required: true
    },
    nextButtonLabel: {
      type: String,
      required: true
    }
  },
  methods: {
    onSelect() {
      this.uploadError = [];
      const file = this.$refs.file.files[0];
      this.uploadFile(file);
    },
    uploadFile(file) {
      let formData = new FormData();
      formData.append("file", file);

      axios
        .post("/api/documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.updateFiles();
        })
        .catch(err => {
          this.uploadError = err.response.data;
        });
    },
    removeFile(fileId) {
      axios
        .delete("/api/documents", {
          data: {
            id: fileId
          }
        })
        .then(response => {
          this.updateFiles();
          this.$refs.file.focus();
        });
    },
    updateFiles() {
      axios.get("/api/documents").then(response => {
        this.uploaded_files = response.data;
      });
    },
    saveConditions(file) {
      axios
        .patch("/api/documents/" + file.id, {
          conditions: file.conditions
        })
        .then(response => {
          this.updateFiles();
        });
    },
    saveDocuments(e) {
      e.submit();
    }
  },
  mounted() {
    this.updateFiles();
    axios.get("/api/conditions").then(response => {
      this.conditions = response.data;
    });
  }
};
</script>