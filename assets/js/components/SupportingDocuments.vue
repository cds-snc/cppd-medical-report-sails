<template>
  <div class="file">
    <div class>
      <label
        class="w-64 border-2 border-black cursor-pointer bg-gray-200 px-5 py-2 inline-block text-center"
      >
        <span>{{ this.uploadLabel }}</span>
        <input type="file" ref="file" @change="onSelect" class="hidden" />
      </label>
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
              >{{ removeLabel }}</a>
            </td>
            <td class="pb-4 px-4">
              <div class="multiple-choice multiple-choice--checkboxes">
                <ul class="list-none pl-0">
                  <li class="my-4" v-for="(condition) in conditions" v-bind:key="condition.id">
                    <div class="multiple-choice__item">
                      <input
                        type="checkbox"
                        name="supportingDocuments"
                        :value="condition.id"
                        v-model="file.conditions"
                        @change="saveConditions(file)"
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
      conditions: []
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
      const file = this.$refs.file.files[0];
      this.addFile(file.name);
    },
    addFile(file) {
      axios
        .post("/api/documents", {
          file: file
        })
        .then(response => {
          this.updateFiles();
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