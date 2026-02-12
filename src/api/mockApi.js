
export const mockApi = () => {
  return new Promise((resolve, reject) => {
    const delay = Math.random() * 1000 + 1000;

    setTimeout(() => {
      const shouldFail = Math.random() < 0.2;

      if (shouldFail) {
        reject(new Error("Mock API failed"));
      } else {
        resolve({ success: true });
      }
    }, delay);
  });
};
