/**
 * Helper defensivo para reducir flakiness.
 * Intenta varios selectores y devuelve el primero visible.
 */
export async function findVisible(selectors: string[], timeout = 8_000) {
  let lastError: unknown;

  for (const selector of selectors) {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout });
      return element;
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(`No se encontró ningún selector visible: ${selectors.join(' | ')}. Último error: ${String(lastError)}`);
}

export async function tapFirstVisible(selectors: string[], timeout = 8_000) {
  const element = await findVisible(selectors, timeout);
  await element.click();
  return element;
}
