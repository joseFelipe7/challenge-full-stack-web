import { User } from "@/domain/entities/User";
import { list } from "@/domain/types/list";

export type userRepository = {
    id: string;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null
}
export interface IUserRepository {
    create(user: User): Promise<User | null>;
    update(user: User): Promise<User | null>;
    list(where:object, perPage:number, page:number): Promise<list<userRepository>>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}