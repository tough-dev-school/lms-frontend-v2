// Every element the answer editor can produce
export const HTML_CONTENT = `<h1>Разбор домашки: Event Storming</h1>
<h2>Что получилось хорошо</h2>
<h3>Границы сервисов</h3>
<p><strong>Таск-трекер</strong> и <em>авторизация</em> разделены по данным, а не по экранам. <s>Отдельный сервис для уведомлений</s> <u>пока не нужен</u>: требований к нему нет. Подробнее про выбор границ в <a target="_blank" rel="noopener noreferrer nofollow" href="https://tough-dev.school/blog/service-boundaries">статье про границы сервисов</a>. Обратите внимание на событие <code>TaskAssigned</code>: его публикует таск-трекер в момент, когда попуг получает задачу, и на него подписываются аккаунтинг и аналитика.</p>
<blockquote><p>Хорошая граница сервиса проходит там, где у данных меняется владелец. Если два сервиса пишут в одну таблицу, это один сервис, разнесённый по двум репозиториям.</p></blockquote>
<h2>Что стоит доработать</h2>
<ol><li><p>Подпишите консьюмеров для каждого события</p></li><li><p>Решите, кто владеет списком попугов</p></li><li><p>Добавьте на доску бизнес-цепочку для кнопки «заассайнить задачи»</p></li></ol>
<ul><li><p>Команды</p></li><li><p>События</p></li><li><p>Агрегаты</p></li></ul>
<pre><code>{
  "event_name": "TaskAssigned",
  "event_version": 1,
  "data": { "task_id": "4f2a…", "assignee_id": "9b1c…" }
}</code></pre>
<div class="tableWrapper"><table class="border-collapse table-auto w-full"><tbody><tr><th><p>Событие</p></th><th><p>Продюсер</p></th><th><p>Консьюмеры</p></th></tr><tr><td><p>TaskCreated</p></td><td><p>Таск-трекер</p></td><td><p>Аккаунтинг, аналитика</p></td></tr><tr><td><p>TaskCompleted</p></td><td><p>Таск-трекер</p></td><td><p>Аккаунтинг</p></td></tr></tbody></table></div>`;
