import { IsNotEmpty, Length, Matches } from "class-validator";

export class LegalRegisterFormDTO {
  @IsNotEmpty({ message: "نام کسب و کار الزامی است !" })
  businessName!: string;

  @IsNotEmpty({ message: "نام کاربری کسب و کار الزامی است !" })
  @Matches(/^[A-Za-z1-9]+$/, {
    message: "نام کاربری کسب و کار باید فقط شامل حروف انگلیسی باشد!",
  })
  @Length(3, 64, {
    message: "نام كاربرى انتخابى حداقل ٣ وحداكثر 64 كاراكتر مى باشد",
  })
  businessUsername!: string;

  @IsNotEmpty({ message: "شرح فعالیت کسب و کار الزامی است !" })
  businessDescription!: string;
}
