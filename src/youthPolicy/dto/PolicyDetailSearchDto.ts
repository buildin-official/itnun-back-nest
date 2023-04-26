import {
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { policyLocalCodeList, policyTypeCodeList } from './CodeConstant';

@ValidatorConstraint({ name: 'Policy Local Code Checker', async: false })
export class PolicyLocalCodeChecker implements ValidatorConstraintInterface {
  validate(value: string[]) {
    return value.every((v) => policyLocalCodeList.includes(v));
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Policy Local Code is not valid';
  }
}
@ValidatorConstraint({ name: 'Policy Local Code Checker', async: false })
export class PolicyTypeCodeChecker implements ValidatorConstraintInterface {
  validate(value: string[]) {
    return value.every((v) => policyTypeCodeList.includes(v));
  }

  defaultMessage() {
    // here you can provide default error message if validation failed
    return 'Policy Type Code is not valid';
  }
}
export class PolicyDetailSearchDto {
  @IsNumber()
  @Min(1)
  @Max(500)
  pageIndex: number;
  @IsOptional()
  @IsString()
  @Length(1, 50)
  searchKeyword: string;
  @IsOptional()
  @Validate(PolicyTypeCodeChecker)
  policyTypeCode: string[];
  @IsOptional()
  @Validate(PolicyLocalCodeChecker)
  policyLocalCode: string[];
}
