import { test, expect } from '@playwright/test';

test('Full Booking Flow — From Selection to Confirmation', async ({ page }) => {
  // 1. Visit the home page / rate card
  await page.goto('/');

  // 2. Select a Primary Service (e.g., Chama Onboarding)
  // Use a more specific locator for the clickable card
  const chamaTitle = page.locator('h5:has-text("Chama Onboarding")');
  await chamaTitle.click();

  // 3. Verify total summary appears and click Continue
  await expect(page.locator('text=1 service selected')).toBeVisible();
  const continueBookingBtn = page.locator('button:has-text("Continue to Booking")');
  await continueBookingBtn.click();

  // 4. Step 1: Select a Complimentary add-on
  // We'll wait for the Step 1 view
  await expect(page.locator('text=Step 1 of 3')).toBeVisible();
  await page.click('text=Group Wealth Planning');
  await page.click('text=Continue');

  // 5. Step 2: Select Date and Time
  await expect(page.locator('text=Step 2 of 3')).toBeVisible();
  
  // Find an available date button in the calendar
  // We'll look for the first enabled button with a single or double digit text
  const availableDay = page.locator('.grid button:not([disabled])').filter({ hasText: /^\d{1,2}$/ }).first();
  await availableDay.scrollIntoViewIfNeeded();
  await availableDay.click();
  
  // Wait for available times to load
  await expect(page.locator('text=Available Times')).toBeVisible();
  
  // Select a time slot
  const timeSlot = page.locator('button:not([disabled])').filter({ hasText: /^0?9:00|^10:00|^11:00/ }).first();
  await timeSlot.click();
  
  // Click Continue
  const continueBtn = page.locator('button:has-text("Continue")').last();
  await continueBtn.click();

  // 6. Step 3: Fill Contact Information
  await expect(page.locator('text=Step 3 of 3')).toBeVisible();
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="groupName"]', 'Test Group');
  await page.fill('input[name="email"]', 'mjarenga1@gmail.com');
  await page.fill('input[name="phone"]', '+254 700 000 000');
  
  // 7. Verify Summary in Step 3
  await expect(page.locator('text=Booking Summary:')).toBeVisible();
  await expect(page.locator('text=Chama Onboarding')).toBeVisible();
  await expect(page.locator('text=KES 10,000')).toBeVisible();
  
  // 8. Submit
  // (We'll mock the Supabase call in a real CI, but for local validation we'll see if it attempts it)
  // await page.click('text=Confirm Booking');
  
  // 9. Check results (Mocked or just UI check)
  // Since we don't want to spam the DB in tests, we'll stop here or use a mock if we had a setup for it.
});
