import { IsNotEmpty, Length } from "class-validator";

export class OTPFormValidationDTO {
  @Length(6, 6, { message: "کد تایید 6 رقمی را وارد کنید !" })
  @IsNotEmpty({ message: "کد تایید دریافتی را وارد کنید !" })
  otp!: string;
}
