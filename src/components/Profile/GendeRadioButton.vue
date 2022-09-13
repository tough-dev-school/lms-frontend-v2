<template>
  <div class="user-gender">
    <p class="user-gender__title">Пол</p>
    <div class="user-gender__buttons-container">
      <label class="user-gender__label" for="male">
        <input id="male" v-model="gender" class="user-gender__button" type="radio" value="male" />
        Мужской
      </label>
      <label class="user-gender__label" for="female">
        <input id="female" v-model="gender" class="user-gender__button" type="radio" value="female" />
        Женский
      </label>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('user', ['user']),
    gender: {
      get() {
        return this.user.gender;
      },
      set(gender) {
        this.UPDATE_USER({ gender });
      },
    },
  },
  methods: mapMutations('user', ['UPDATE_USER']),
};
</script>
<style scoped>
.user-gender {
  display: flex;
  flex-direction: column;
}
.user-gender__title {
  @mixin inter-title-two;
  margin: 0;
}
.user-gender__label {
  @mixin robot-text-one;
  @mixin base-hover;

  &:first-child {
    margin-right: 16px;
  }
}
</style>
