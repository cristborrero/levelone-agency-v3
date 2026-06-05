import { quoteSchema } from "../src/components/quote/schema";

const API_URL = "http://localhost:3003/api/quote";

async function runTests() {
  console.log("🚀 Starting API Route tests for /api/quote...");

  // Test Case 1: Valid Web Design payload
  try {
    const validWebDesign = {
      service: "web_design",
      hasWebsite: "no",
      brandingStatus: "logo_only",
      startTimeline: "1_to_3_months",
      siteType: "interactive",
      webAddons: ["blog", "booking_system"],
      pageCount: "up_to_10",
      copywriting: "own_copy",
      seoInterest: "yes",
      budgetBracket: "10_to_15k",
      fastTrack: "no",
      name: "Test User",
      email: "test@example.com",
      wantsCall: "no",
      consent: true,
      calculatedEstimate: { min: 3300, max: 6300, type: "one-off" }
    };

    console.log("\n🧪 Test 1: Valid Web Design payload...");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validWebDesign)
    });

    console.log(`Status: ${res.status}`);
    const json = await res.json();
    console.log("Response:", json);
    if (res.status !== 200 || !json.success) {
      throw new Error("Test 1 failed!");
    }
  } catch (error) {
    console.error("❌ Test 1 Error:", error);
    process.exit(1);
  }

  // Test Case 2: Validation Failure - Missing required fields for Web Design (e.g. siteType)
  try {
    const invalidWebDesign = {
      service: "web_design",
      hasWebsite: "no",
      brandingStatus: "logo_only",
      startTimeline: "1_to_3_months",
      // siteType is missing
      webAddons: [],
      pageCount: "up_to_10",
      copywriting: "own_copy",
      seoInterest: "yes",
      budgetBracket: "10_to_15k",
      fastTrack: "no",
      name: "Test User",
      email: "test@example.com",
      wantsCall: "no",
      consent: true
    };

    console.log("\n🧪 Test 2: Validation failure on missing siteType...");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidWebDesign)
    });

    console.log(`Status: ${res.status}`);
    const json = await res.json();
    console.log("Response (expected failure):", json);
    if (res.status !== 400 || !json.error) {
      throw new Error("Test 2 failed! Expected 400 Bad Request");
    }
  } catch (error) {
    console.error("❌ Test 2 Error:", error);
    process.exit(1);
  }

  // Test Case 3: Validation Failure - wantsCall requires phone
  try {
    const invalidCallRequest = {
      service: "web_design",
      hasWebsite: "no",
      brandingStatus: "logo_only",
      startTimeline: "1_to_3_months",
      siteType: "interactive",
      webAddons: [],
      pageCount: "up_to_10",
      copywriting: "own_copy",
      seoInterest: "yes",
      budgetBracket: "10_to_15k",
      fastTrack: "no",
      name: "Test User",
      email: "test@example.com",
      wantsCall: "yes", // wants call but missing phone number
      consent: true
    };

    console.log("\n🧪 Test 3: Validation failure on wantsCall without phone...");
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invalidCallRequest)
    });

    console.log(`Status: ${res.status}`);
    const json = await res.json();
    console.log("Response (expected failure):", json);
    if (res.status !== 400 || !json.error) {
      throw new Error("Test 3 failed! Expected 400 Bad Request");
    }
  } catch (error) {
    console.error("❌ Test 3 Error:", error);
    process.exit(1);
  }

  console.log("\n🎉 All tests passed successfully!");
}

runTests();
