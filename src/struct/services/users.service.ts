import { mockDatabase } from "#helpers/constants/index.js";
import type { CreateUserInput } from "#src/schema/index.js";

export class UserService {
  private mockDatabase = mockDatabase;

  public async signup(body: CreateUserInput) {
    const user = await this.findOne(body.email);

    if (user) throw new Error("A user with the same email already exists!");
    const createdUser = this.createOne(body);

    return createdUser;
  }

  private async findOne(
    email: string
  ): Promise<{ email: string; password: string } | null> {
    return await new Promise((resolve) =>
      setTimeout(() => resolve(this.mockDatabase.get(email) ?? null), 1000)
    );
  }

  private createOne(body: CreateUserInput) {
    return this.mockDatabase.set(body.email, body).get(body.email)!;
  }
}
