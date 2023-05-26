const messages = {
  DATABASE_CONNECT_SUCCESS: "database connected successfully",
  SUCCESS: "Success",
  FAILURE: "Failure",
  ERROR: "Error",
  EXCEPTION: "Exception",
  SERVER_STARTED: "Server started on Port:",
  ERROR_404: "404\nNot Found",
  RESOURCE_NOT_FOUND: "@resource_name not found",
  RESOURCE_CREATED: "@resource_name created successfuly",
  RESOURCE_UPDATED: "@resource_name updated successfuly",
  RESOURCE_ALREADY_EXIST:
    "The @resource_name you are trying to create, already exists",
  INCOMPLETE_RESOURCE: "Incomplete @resource_name sent",
  RESOURCE_TITLE_IMMUTABLE: "The @resource_name title must remain constant",
  INVALID_RESOURCE: "Invalid @resource_name",
  RESOURCE_CONNECT_SUCCESS: "@resource_name Connected Successfully",
  RESOURCE_CONNECT_FAILURE: "Failure while connecting to @resource_name",
};

const getMessages = (resourceName: string) =>
  Object.fromEntries(
    Object.entries(messages).map(([key, val]) => [
      key,
      val.replace("@resource_name", resourceName),
    ])
  ) as typeof messages;
export default getMessages;
