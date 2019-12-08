export class CreateUsertDto {
  readonly username: string;
  readonly password: string;
  readonly email: string;
  projects: string[];
}
