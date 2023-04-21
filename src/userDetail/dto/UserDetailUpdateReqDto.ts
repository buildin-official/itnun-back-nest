import {
  IsNumber,
  IsOptional,
  Matches,
  Max,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { localCodeList, majorCodeList, computerSkillCodeList, preferentialCodeList } from './CodeConstant';

@ValidatorConstraint({ name: 'Local Code Checker', async: false })
export class LocalCodeChecker implements ValidatorConstraintInterface {
  validate(text: string) {
    return localCodeList.includes(Number(text));
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Local Code is not valid';
  }
}
@ValidatorConstraint({ name: 'Major Code Checker', async: false })
export class MajorCodeChecker implements ValidatorConstraintInterface {
  validate(text: string) {
    return majorCodeList.includes(text);
  }
}
@ValidatorConstraint({ name: 'Computer Skill Checker', async: false })
export class ComputerSkillChecker implements ValidatorConstraintInterface {
  validate(value: number[]) {
    return value.every((v) => computerSkillCodeList.includes(v));
  }
}
@ValidatorConstraint({ name: 'Preferential Check', async: false })
export class PreferentialChecker implements ValidatorConstraintInterface {
  validate(value: string[]) {
    return value.every((v) => preferentialCodeList.includes(v));
  }
}
export class UserDetailUpdateReqDto {
  // birthDate YYYYMMDD
  // localCode 5 dight code
  // employStatus 0~7 code
  // carrerYear 0~99
  // education 1~7 code
  // major 5 dight code
  // computerSkill 1 dight code list
  // preferential 2 dight code list
  // @Validate(YYYYMMDDChecker)
  @IsOptional()
  @Matches(/^\d{4}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/)
  birthDate: string;
  @IsOptional()
  @IsNumber()
  @Validate(LocalCodeChecker)
  localCode: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(7)
  employStatus: number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(99)
  carrerYear: number;
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(7)
  education: number;
  @IsOptional()
  @Validate(MajorCodeChecker)
  major: string;
  @IsOptional()
  @Validate(ComputerSkillChecker)
  computerSkill: number[];
  @IsOptional()
  @Validate(PreferentialChecker)
  preferential: string[];
}
