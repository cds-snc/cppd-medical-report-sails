<template>
  <div class="file">
    <input type="hidden" :name="fieldName" :value="JSON.stringify(uploaded_files)" />
    <div :class="uploadError.length ? 'pl-8 border-l-4 border-red-700' : ''">
      <div class="border-2 focus-within:border-orange-400 inline-block">
        <input
          type="file"
          id="file"
          name="file"
          ref="file"
          class="sr-only"
          @change="handleFileUpload"
          :aria-describedby="uploadError.length > 0 ? 'file-error' : ''"
          :aria-invalid="uploadError.length > 0"
        />

        <label
          for="file"
          class="w-64 border-2 border-black cursor-pointer bg-gray-200 px-5 py-2 inline-block text-center"
        >{{ this.uploadLabel }}</label>
      </div>

      <span v-if="uploadError.length" class="validation-message" id="file-error" role="alert">
        <span class="visually-hidden">Error:</span>
        {{ uploadError }}
      </span>
    </div>
    <div class="mt-4">
      <div
        v-for="file in uploaded_files"
        v-bind:key="file.id"
        class="border-t border-gray-300 py-4 px-4 flex"
      >
        <div class="p-4 flex-auto">{{ file.fileName }}</div>
        <a
          href="#"
          class="remove-file underline text-base align-middle text-right p-4 cursor-pointer"
          @click.prevent="removeFile(file)"
          :title="'Delete item ' + file.fileName"
        >{{ removeLabel }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploaded_files: [],
      uploadError: []
    };
  },
  props: {
    conditionId: {
      type: String,
      required: false
    },
    files: {
      type: String,
      required: false
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
    handleFileUpload() {
      this.uploadError = [];
      const file = this.$refs.file.files[0];
      this.addFile(file);
    },
    addFile(file) {
      let formData = new FormData();
      formData.append("file", file);

      // TODO: validate file is a file

      axios
        .post("/api/documents", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(response => {
          this.uploaded_files.push({
            id: response.data.document.id,
            fileName: response.data.document.originalFileName
          });
        })
        .catch(err => {
          this.uploadError = err.response.data;
        });
    },
    removeFile(file) {
      if (this.conditionId) {
        // on edit, we need to detach from the current condition
        axios
          .delete("/api/conditions/" + this.conditionId + "/documents", {
            data: {
              docId: file.id
            }
          })
          .then(response => {
            this.uploaded_files.splice(this.uploaded_files.indexOf(file), 1);
            this.$refs.file.focus();
          });
      } else {
        // on create, there is no Condition
        axios
          .delete("/api/documents", {
            data: {
              id: file.id
            }
          })
          .then(response => {
            this.uploaded_files.splice(this.uploaded_files.indexOf(file), 1);
            this.$refs.file.focus();
          });
      }
    },
    getFiles(conditionId) {
      axios
        .get("/api/conditions/" + conditionId + "/documents")
        .then(response => {
          this.uploaded_files = response.data;
        });
    }
  },
  mounted() {
    /**
     * If we're editing, we'll get a conditionId which we can use
     * to request the documents from the api, unless this is a
     * validation post-back.
     */
    if (this.conditionId && !this.files) {
      this.getFiles(this.conditionId);
    }
    /**
     * this.files will be set if this is a validation post-back.
     */
    if (this.files) {
      this.uploaded_files = JSON.parse(this.files);
    }
  }
};
</script>