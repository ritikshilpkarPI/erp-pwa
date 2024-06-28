import { jwtDecode } from "jwt-decode";

export const decodeJwtToken = (token: string | null | undefined) => {
  try {
    const decodedToken = jwtDecode(token ?? '');
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode JWT token:", error);
    return null;
  }
};

