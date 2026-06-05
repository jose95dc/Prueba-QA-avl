/**
 * Helper defensivo para reducir flakiness.
 * Intenta varios selectores y devuelve el primero visible.
 */
export async function findVisible(
  selectors: string[],
  timeout = 8000
): Promise<ReturnType<typeof $>> {
  let lastError: unknown;

  for (const selector of selectors) {
    try {
      const elementSelector = selector.startsWith('xpath=')
        ? selector.replace('xpath=', '')
        : selector;

      const element = await $(elementSelector);

      await element.waitForDisplayed({ timeout });

      return element;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(
    `No se encontró ningún selector visible: ${selectors.join(' | ')}. Último error: ${lastError}`
  );
}

export async function tapFirstVisible(selectors: string[], timeout = 8_000) {
  const element = await findVisible(selectors, timeout);
  await element.click();
  return element;
}
