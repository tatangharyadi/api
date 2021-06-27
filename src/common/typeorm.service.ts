import { Repository } from 'typeorm';

export abstract class TypeormService {
    protected constructor(protected readonly repository: Repository<any>) {}

    async save(createEntity): Promise<any> {
        return this.repository.save(createEntity);
    }

    async find(filterQuery = {}): Promise<any[]> {
        return this.repository.find(filterQuery);
    }

    async findOne(filterQuery): Promise<any> {
        return this.repository.findOne(filterQuery);
    }

    async update(id: number, updateEntity): Promise<any> {
        return this.repository.update(id, updateEntity);
    }

    async delete(id: number): Promise<any> {
        return this.repository.delete(id);
    }
}
