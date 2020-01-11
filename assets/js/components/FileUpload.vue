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
      <div
        v-for="(file, key) in uploaded_files"
        v-bind:key="key"
        class="border-t border-gray-300 py-4 px-4 flex"
      >
        <div class="flex-auto">{{ file }}</div>
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
    files: {
      type: String,
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
    if (typeof this.files === "string") {
      this.uploaded_files = this.files ? this.files.split(",") : [];
    }
  }
};
</script>