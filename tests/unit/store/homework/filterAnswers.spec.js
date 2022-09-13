import store from '@/store/';

describe('question/filterAnswer sgetter', () => {
  beforeEach(() => {
    store.commit('question/SET_ANSWERS', require('./.fixtures/answers'));
  });

  it('Filteres by slug', () => {
    const filtered = store.getters['question/filterAnswers']({ slug: '21ad3f0a-1c6f-4d8c-ab9e-e8ae49f78cdc' });
    expect(filtered).toHaveLength(1);
  });

  it('Returns empty array if no match is found', () => {
    const filtered = store.getters['question/filterAnswers']({ slug: 'nonexisnta' });
    expect(filtered).toHaveLength(0);
  });
});
