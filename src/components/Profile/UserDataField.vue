<template>
  <UiInput
    v-model="model"
    :native-props="{
      id: name,
      type: 'text',
    }"
    :label="label"
    :has-autofocus="hasAutofocus"
  />
</template>
<script>
import { mapState, mapMutations } from "vuex";

import UiInput from "@/components/ui-kit/UiInput.vue";

export default {
  components: {
    UiInput,
  },
  props: {
    label: { type: String, required: true },
    name: { type: String, required: true },
    hasAutofocus: { type: Boolean, default: false },
  },
  computed: {
    ...mapState("user", ["user"]),
    model: {
      get() {
        return this.user[this.name];
      },
      set(evt) {
        const payload = {};
        payload[this.name] = evt.target.value;
        this.UPDATE_USER(payload);
      },
    },
  },
  methods: mapMutations("user", ["UPDATE_USER"]),
};
</script>
