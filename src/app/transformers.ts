
export const apiResponse = (
  status: number,
  data: any | undefined,
  message = "",
  otherFields = {}
) => ({
  status,
  ...(data && { data }),
  message,
  ...otherFields,
});
