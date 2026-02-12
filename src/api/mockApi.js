export const mockApi = () => {
  return new Promise((resolve, reject) => {
    const delay = 1000 + Math.random() * 1000; // 1–2 sec

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2; // 20% failure
      if (shouldFail) reject("Mock API Failed");
      else resolve("Success");
    }, delay);
  });
};
