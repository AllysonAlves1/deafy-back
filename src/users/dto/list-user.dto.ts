export class ListUserDTO {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly nome: string,
  ) {}
}
