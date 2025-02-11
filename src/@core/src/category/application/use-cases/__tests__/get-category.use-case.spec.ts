import NotFoundError from "#shared/domain/errors/not-found.error";
import { Category } from "#category/domain";
import CategoryInMemoryRepository from "#category/infra/repository/category-in-memory.repository";
import {GetCategoryUseCase} from "../get-category.use-case";

describe("GetCategoryUseCase Unit Tests", () => {
    let useCase: GetCategoryUseCase.UseCase;
    let repository: CategoryInMemoryRepository;

    beforeEach(() => {
        repository = new CategoryInMemoryRepository;
        useCase = new GetCategoryUseCase.UseCase(repository);
    })
    it("should throw error when entity not found", async () => {
        expect(() => useCase.execute({ id: 'fake id' } as any)).rejects.toThrowError(new NotFoundError(`Entity not found using ID: fake id`));
    })

    it("should return category", async () => {
        const items = [
            new Category({ name: "Movie" })
        ];
        const spyFindById = jest.spyOn(repository, 'findById');

        repository.items = items;

        const output = await useCase.execute({ id: items[0].id });

        expect(spyFindById).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id: items[0].id,
            name: "Movie",
            description: null,
            is_active: true,
            created_at: items[0].created_at
        })
    })
});