/**
 * Separate a leading project-information section from the screenplay body.
 * Some users paste production briefs in front of explicitly numbered scenes
 * (for example, "A. METADATA" followed by "ESCENA 1"). That preamble is
 * useful context for analysis, but it is not itself a scene to render.
 *
 * The source script remains untouched in `sequences.script`; only the scene
 * analysis receives the extracted body. Unknown formats are passed through.
 */

export type ScriptContext = {
  /** Text that describes the project but does not belong to any scene. */
  projectContext: string;
  /** Script body from the first recognized scene heading onwards. */
  sceneScript: string;
};

const PROJECT_INFO_HEADING =
  /^(?:[A-Z]\s*[.)]\s*)?(?:PROJECT\s+)?(?:META(?:DATA|DATOS)|PROJECT\s+INFO|INFORMACI[ÓO]N\s+DEL\s+PROYECTO)\s*:?\s*$/i;

const NUMBERED_SCENE_HEADING =
  /^(?:#{1,6}\s*)?(?:SCENE|ESCENA)\s+\d+\b(?:\s+.*|\s*[:.\-–—|].*)?$/i;

const SCREENPLAY_HEADING = /^(?:INT\.|EXT\.|INT\/EXT\.|I\/E\.)\s+/i;

function isSceneStart(line: string): boolean {
  const trimmed = line.trim();
  return (
    NUMBERED_SCENE_HEADING.test(trimmed) || SCREENPLAY_HEADING.test(trimmed)
  );
}

/**
 * Extract a leading metadata/brief section only when an actual scene heading
 * follows it. Ordinary scripts and unstructured prompts are unchanged.
 */
export function separateProjectContext(source: string): ScriptContext {
  const lines = source.split('\n');
  const firstContentIndex = lines.findIndex((line) => line.trim().length > 0);
  if (firstContentIndex < 0) {
    return { projectContext: '', sceneScript: source };
  }

  // Allow a title or a short document label before the explicit metadata
  // heading, but do not reinterpret a screenplay that merely mentions
  // "metadata" later in its body.
  const metadataIndex = lines.findIndex(
    (line, index) =>
      index >= firstContentIndex &&
      index <= firstContentIndex + 4 &&
      PROJECT_INFO_HEADING.test(line.trim())
  );
  if (metadataIndex < 0) {
    return { projectContext: '', sceneScript: source };
  }

  const sceneIndex = lines.findIndex(
    (line, index) => index > metadataIndex && isSceneStart(line)
  );
  if (sceneIndex < 0) {
    return { projectContext: '', sceneScript: source };
  }

  let sceneStartOffset = 0;
  for (let index = 0; index < sceneIndex; index++) {
    sceneStartOffset += (lines[index]?.length ?? 0) + 1;
  }

  const projectContext = source.slice(0, sceneStartOffset);
  if (!projectContext.trim()) {
    return { projectContext: '', sceneScript: source };
  }

  return { projectContext, sceneScript: source.slice(sceneStartOffset) };
}
