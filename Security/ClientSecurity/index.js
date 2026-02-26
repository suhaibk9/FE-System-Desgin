async function hasEnoughSpace() {
  if (navigator.storage && navigator.storage.estimate) {
    try {
      const { usage, quota } = await navigator.storage.estimate();

      const usageMB = (usage / (1024 * 1024)).toFixed(2);
      const quotaMB = (quota / (1024 * 1024)).toFixed(2);
      const percentUsed = ((usage / quota) * 100).toFixed(2);

      console.log(`Storage Usage: ${usageMB} MB`);
      console.log(`Storage Quota: ${quotaMB} MB`);
      console.log(`Used: ${percentUsed}%`);

      // Typical localStorage limit is 5MB.
      // This checks if the total origin storage is nearing its limit.
      return usage < quota;
    } catch (error) {
      console.error("Error checking storage space:", error);
    }
  } else {
    console.log("StorageManager API is not supported in this browser.");
  }
}

hasEnoughSpace();
