# lms-frontend [![ci](https://github.com/tough-dev-school/lms-frontend-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/tough-dev-school/lms-frontend-v2/actions/workflows/ci.yml)

- `dev` — dev server
- `build` — build project
- `test` — run tests
- `lint` — run eslint
- `storybook` — open storybook

## Backend setup

```bash
docker compose up
```

Так же нужно будет войти в [GitHub Container registry](https://docs.github.com/en/packages/guides/configuring-docker-for-use-with-github-packages#authenticating-with-a-personal-access-token), обратите внимание что нужно войти в ` https://ghcr.io`, а не в `https://docker.pkg.github.com`.

## Тесты на визульную регрессию

Если ветка содержит визуальные изменения, тест на регрессию не пройдет. Чтобы исправить тест, выполните следующие шаги:

1. Перейдите на вкладку “Summary” неудачного задания и скачайте файл `diff.zip` внизу.
2. В скачанном архиве проверьте различия. Если различия неожиданны — исправьте их. Если различия ожидаемы, вам нужно сгенерировать новые скриншоты, включая эти изменения.
3. Перейдите к [экшену обновления](https://github.com/tough-dev-school/lms-frontend-v2/actions/workflows/update-regression.yml) и запустите его для вашей ветки.
4. Перейдите на вкладку “Summary” задания обновления и скачайте файл `updated-screenshots.zip` внизу.
5. На вашем компьютере замените изображения в `tests/image_snapshots/` на изображения из `updated-screenshots.zip` и зафиксируйте эти изменения в вашей ветке.
6. CI будет исправлен.

Если вам нужно добавить новые тесты, добавьте новый маршрут в массив pages и выполните шаги 3-5.
