import { User } from "@/domain/entities/User";

export interface IUserRepository {
    create(user: User): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
}