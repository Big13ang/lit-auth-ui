import { IsNotEmpty, MinLength } from "class-validator";

export class RealLoginValidationDTO {
  @MinLength(11, { message: "شماره تلفن باید 11 رقم باشد !" })
  @IsNotEmpty({ message: "شماره تماس نباید خالی باشد !" })
  phoneNumber!: string;
}
