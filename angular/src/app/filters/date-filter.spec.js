import app from '../app';

describe('app', () => {

  describe('DateFilter', () => {
    let articles
    let filter
    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($filter) => {
        filter = $filter;
      });

      articles = [
        {
          "title": "Article 1",
          "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "date": new Date() - (1000 * 60 * 60 * 24 * 4)
        },
        {
          "title": "Article 2",
          "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          "date": new Date() - (1000 * 60 * 60 * 24 * 25)
        }
      ]
    });

    it('should return all items if 0 days were chosen', () => {
      const result = filter('dayFilter')(articles, 0);
      expect(result.length).toEqual(2);
    });

    it('should return 1 items if days were chosen 5', () => {
      const result = filter('dayFilter')(articles, 5);
      expect(result.length).toEqual(1);
    });
  });
});