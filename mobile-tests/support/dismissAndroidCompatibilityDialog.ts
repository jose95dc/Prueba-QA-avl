export async function dismissAndroidCompatibilityDialog() {
  for (let attempt = 0; attempt < 3; attempt++) {
    let handled = false;

    // Manejar popup "App isn't responding"
    try {
      const waitButton = await $('android=new UiSelector().resourceId("android:id/aerr_wait")');

      if (await waitButton.isDisplayed()) {
        console.log('La app no responde. Presionando Wait...');
        await waitButton.click();
        await browser.pause(3000);
        handled = true;
      }
    } catch (error) {
      // No apareció el diálogo de app no responde
    }

    if (handled) {
      continue;
    }

    // Manejar Android App Compatibility con OK
    try {
      const okButton = await $('android=new UiSelector().text("OK")');

      if (await okButton.isDisplayed()) {
        console.log('Cerrando popup Android App Compatibility con OK...');
        await okButton.click();
        await browser.pause(1500);
        handled = true;
      }
    } catch (error) {
      // No apareció OK
    }

    if (handled) {
      continue;
    }

    // Manejar Android App Compatibility con Don't Show Again
    try {
      const dontShowAgainButton = await $(
        'android=new UiSelector().textContains("Show Again")'
      );

      if (await dontShowAgainButton.isDisplayed()) {
        console.log("Cerrando popup Android App Compatibility con Don't Show Again...");
        await dontShowAgainButton.click();
        await browser.pause(1500);
        handled = true;
      }
    } catch (error) {
      // No apareció Don't Show Again
    }

    if (!handled) {
      break;
    }
  }
}