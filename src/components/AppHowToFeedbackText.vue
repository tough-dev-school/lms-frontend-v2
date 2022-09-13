<template>
  <div class="how-to-feedback">
    <h2 class="how-to-feedback__title">Как давать обратную связь?</h2>
    <ul class="how-to-feedback__list">
      <li>
        <h3 class="how-to-feedback__subtitle">Шаг 1</h3>
        <p class="how-to-feedback__text">Напишите обратную связь по формату:</p>
        <ol class="how-to-feedback__numbered-list">
          <li>
            <p class="how-to-feedback__text">Что вам понравилось или откликнулось? Что вы заберёте к себе, в чём поддерживаете коллегу?</p>
          </li>
          <li>
            <p class="how-to-feedback__text">
              На что вы бы обратили внимание? Возможно, у вас возникло наблюдение или был похожий опыт, как вы решали подобную ситуацию?
            </p>
          </li>
          <li>
            <p class="how-to-feedback__text">
              Подумайте, какие наводящие вопросы помогли бы человеку найти ответ или решение задачи? Что бы вы его спросили?
            </p>
          </li>
        </ol>
      </li>
      <li>
        <h3 class="how-to-feedback__subtitle">Шаг 2</h3>
        <p class="how-to-feedback__text">
          Проверьте, что вы выполнили предыдущий пункт и не закидали коллегу помидорами. Сначала — найдите, что уже хорошо, а только потом —
          бережно пишите, что ещё можно добавить, улучшить или что, как вам кажется, человек не увидел или понял не так. Не валите ребят,
          как будто вы на экзамене.
        </p>
      </li>
      <li>
        <h3 class="how-to-feedback__subtitle">Шаг 3</h3>
        <p class="how-to-feedback__text">Можно отправлять.</p>
      </li>
    </ul>
  </div>
</template>
<style lang="postcss" scoped>
.how-to-feedback {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.how-to-feedback__title {
  @mixin inter-title-three;
}
.how-to-feedback__list {
  & li:not(:last-child) {
    margin-bottom: 16px;
  }
}
.how-to-feedback__subtitle {
  @mixin inter-title-three;
}
.how-to-feedback__text {
  @mixin robot-text-two;
}
.how-to-feedback__numbered-list {
  & li:not(:last-child) {
    margin-bottom: 12px;
  }
}
</style>
