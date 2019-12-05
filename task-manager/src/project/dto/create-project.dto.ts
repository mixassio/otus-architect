export class CreateProjectDto {
  readonly key: string;
  readonly title: string;
  readonly description: string;
  readonly taskTypes: string;
  users: string[];
}
