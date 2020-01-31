<template>
  <div class="file">
    <input type="hidden" :name="fieldName" :value="JSON.stringify(uploaded_files)" />
    <div class>
      <label
        class="w-64 border-2 border-black cursor-pointer bg-gray-200 px-5 py-2 inline-block text-center"
      >
        <span>{{ this.uploadLabel }}</span>
        <input type="file" ref="file" @change="onSelect" class="hidden" />
      </label>
    </div>
    <div class="mt-4">
      <div
        v-for="file in uploaded_files"
        v-bind:key="file.id"
        class="border-t border-gray-300 py-4 px-4 flex"
      >
        <div class="flex-auto">{{ file.fileName }}</div>
        <div
          class="flex-auto remove-file underline text-base align-middle text-right pr-4 cursor-pointer"
          @click="removeFile(file)"
        >{{ removeLabel }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploaded_files: []
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
    onSelect() {
      const file = this.$refs.file.files[0];
      this.addFile(file.name);
    },
    addFile(file) {
      axios
        .post("/api/documents", {
          file: file
        })
        .then(response => {
          this.uploaded_files.push({
            id: response.data.id,
            fileName: response.data.originalFileName
          });
        });
    },
    removeFile(file) {
      // if we're editing vs creating
      axios
        .delete("/api/conditions/" + this.conditionId + "/documents", {
          data: {
            docId: file.id
          }
        })
        .then(response => {
          this.uploaded_files.splice(this.uploaded_files.indexOf(file), 1);
        });
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