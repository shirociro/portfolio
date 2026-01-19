export function validateForm(
  formData: Record<string, any>,
  requiredFields: string[] = [],
): Record<string, string> {
  const errors: Record<string, string> = {};

  requiredFields.forEach((field) => {
    const value = formData[field];

    if (
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0)
    ) {
      errors[field] = "This field is required";
    }
  });

  return errors;
}
