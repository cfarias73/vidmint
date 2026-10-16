import { describe, expect, it } from 'vitest';
import { runUploadStage } from './upload-stage';

describe('runUploadStage', () => {
  it('adds the stage to a failure and keeps the original cause', async () => {
    const cause = new Error('Forbidden');

    await expect(
      runUploadStage('Could not prepare upload', () => Promise.reject(cause))
    ).rejects.toMatchObject({
      message: 'Could not prepare upload: Forbidden',
      cause,
    });
  });

  it('returns successful stage results unchanged', async () => {
    await expect(
      runUploadStage('File transfer failed', () => Promise.resolve('uploaded'))
    ).resolves.toBe('uploaded');
  });
});
