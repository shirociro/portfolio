export const getAvatarUrl = (filename: string): string => {
  const backendHost: string =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : `http://${window.location.hostname}:3000`;

  return `${backendHost}${filename}`;
};
