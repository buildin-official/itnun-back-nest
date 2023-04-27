import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function AllIsInArray(array: (string | number)[], validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'allIsInArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [array],
      options: validationOptions,
      validator: {
        validate(value: string[], args: ValidationArguments) {
          return value.every((v) => array.includes(v));
        },
      },
    });
  };
}
