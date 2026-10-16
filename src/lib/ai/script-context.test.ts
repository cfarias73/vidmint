import { describe, expect, it } from 'vitest';
import { separateProjectContext } from './script-context';

describe('separateProjectContext', () => {
  it('keeps a leading metadata section as context, not a rendered scene', () => {
    const source = [
      'A. METADATA',
      'Título: Lumy y Pip en el Bosque',
      'Objetivo pedagógico: reconocer los colores.',
      '',
      'ESCENA 1: ALGO EXTRAÑO SUCEDE',
      'Lumy encuentra una luz entre los árboles.',
      '',
      'ESCENA 2: EL DESCUBRIMIENTO',
      'Pip se acerca a la luz.',
    ].join('\n');

    const result = separateProjectContext(source);

    expect(result.projectContext).toBe(
      [
        'A. METADATA',
        'Título: Lumy y Pip en el Bosque',
        'Objetivo pedagógico: reconocer los colores.',
        '',
        '',
      ].join('\n')
    );
    expect(result.sceneScript).toBe(
      [
        'ESCENA 1: ALGO EXTRAÑO SUCEDE',
        'Lumy encuentra una luz entre los árboles.',
        '',
        'ESCENA 2: EL DESCUBRIMIENTO',
        'Pip se acerca a la luz.',
      ].join('\n')
    );
    expect(`${result.projectContext}${result.sceneScript}`).toBe(source);
  });

  it('recognizes an English project metadata header and screenplay sluglines', () => {
    const source = [
      'A. PROJECT METADATA',
      'Title: The Last Train',
      '',
      'INT. STATION - NIGHT',
      'A train arrives.',
    ].join('\n');

    expect(separateProjectContext(source)).toEqual({
      projectContext: 'A. PROJECT METADATA\nTitle: The Last Train\n\n',
      sceneScript: 'INT. STATION - NIGHT\nA train arrives.',
    });
  });

  it('leaves ordinary screenplays and unstructured prompts untouched', () => {
    const screenplay = 'INT. ROOM - DAY\nA person enters.';
    const prompt = 'A documentary about the history of aviation.';

    expect(separateProjectContext(screenplay)).toEqual({
      projectContext: '',
      sceneScript: screenplay,
    });
    expect(separateProjectContext(prompt)).toEqual({
      projectContext: '',
      sceneScript: prompt,
    });
  });

  it('does not strip metadata when no scene heading follows', () => {
    const source = 'A. METADATA\nTitle: A brief without scene breakdown';

    expect(separateProjectContext(source)).toEqual({
      projectContext: '',
      sceneScript: source,
    });
  });
});
