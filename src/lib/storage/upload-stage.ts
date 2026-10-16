/** Attach the failed stage to upload errors so UI reports distinguish setup,
 * storage transfer, and post-upload processing failures. */
export async function runUploadStage<T>(
  stage: string,
  operation: () => Promise<T>
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${stage}: ${detail}`, { cause: error });
  }
}
