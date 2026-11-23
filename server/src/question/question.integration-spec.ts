import { QuestionService } from './question.service';
import { sampleData, sampleIds } from '../../test/fixtures/sample-data';
import { IntegrationTestSetup } from '../../test/integration-test-setup';

describe('QuestionService.findOne (integration)', () => {
  let setup: IntegrationTestSetup;
  let service: QuestionService;

  beforeAll(async () => {
    setup = await IntegrationTestSetup.create();
    service = setup.getApp().get(QuestionService);
  });

  beforeEach(async () => {
    await setup.seedDatabase();
  });

  afterEach(async () => {
    await setup?.cleanDatabase();
  });

  afterAll(async () => {
    await setup?.close();
  });

  it('returns the seeded question with its populated relations', async () => {
    const question = await service.findOne(sampleIds.question.toHexString());

    expect(question).toEqual(
      expect.objectContaining({
        _id: sampleIds.question,
        title: sampleData.questions[0].title,
        author: {
          _id: sampleIds.author,
          first_name: sampleData.users[0].first_name,
        },
        tags: [{ _id: sampleIds.tag, name: sampleData.tags[0].name }],
        answers: [
          {
            _id: sampleIds.answer,
            message: sampleData.answers[0].message,
            posted_on: sampleData.answers[0].posted_on,
            votes: [],
            author: {
              _id: sampleIds.answerAuthor,
              first_name: sampleData.users[1].first_name,
            },
          },
        ],
      }),
    );
    expect(Object.getPrototypeOf(question)).toBe(Object.prototype);
  });
});
