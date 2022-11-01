export const getErrorMessage = (error: unknown): { message: string } => {
  const message = error instanceof Error ? error.message : String(error);
  return { message };
};
export default getErrorMessage;
