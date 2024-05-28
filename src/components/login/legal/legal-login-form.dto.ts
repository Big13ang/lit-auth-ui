import { IsNotEmpty, Length, Matches } from "class-validator";

export class LegalLoginFormDTO {
  @IsNotEmpty({ message: "شماره تماس الزامی است !" })
  @Length(11, 11, { message: "شماره تماس باید 11 رقم باشد !" })
  @Matches(/((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g, {
    message: "شماره تماس معتبر نمی‌باشد !",
  })
  phoneNumber!: string;

  @IsNotEmpty({ message: "نام کاربری کسب و کار الزامی است !" })
  @Matches(/^[A-Za-z1-9]+$/, {
    message: "نام کاربری کسب و کار باید فقط شامل حروف انگلیسی باشد!",
  })
  businessUsername!: string;
}
