type FieldErrorMap<T> = Partial<Record<keyof T, new (args: { message: string }) => Error>> & {
  general?: new (args: { message: string }) => Error;
};

export function requiredFields<T>(
  requiredFields: Partial<Record<keyof T, string>>,
  props: Partial<T>,
  fieldErrorMap: FieldErrorMap<T>
): void {
  for (const field in requiredFields) {
    const value = props[field as keyof T];
    if (value === undefined || value === null || value === '') {
      const ErrorClass = fieldErrorMap[field as keyof T] ?? fieldErrorMap.general;

      if (!ErrorClass) {
        throw new Error(`Missing required field "${field}" but no error class provided`);
      }

      throw new ErrorClass({ message: requiredFields[field as keyof T]! });
    }
  }
}
