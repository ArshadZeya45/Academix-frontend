import { useEffect, useState } from "react";

const useVerificationCountdown = (expiresAt, onExpire) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    if (!expiresAt) {
      setIsCooldown(false);
      setTimeLeft("");
      return;
    }

    const expiryTime = new Date(expiresAt).getTime();
    const now = Date.now();
    const initialDiff = expiryTime - now;

    // Immediately determine cooldown (prevents flash)
    if (initialDiff <= 0) {
      setIsCooldown(false);
      setTimeLeft("");
      if (onExpire) onExpire();
      return;
    }

    setIsCooldown(true);

    const calculateTime = () => {
      const diff = expiryTime - Date.now();

      if (diff <= 0) {
        setIsCooldown(false);
        setTimeLeft("");
        if (onExpire) onExpire();
        return false;
      }

      const minutes = Math.floor(diff / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
      );

      return true;
    };

    calculateTime();

    const interval = setInterval(() => {
      const valid = calculateTime();
      if (!valid) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, onExpire]);

  return { timeLeft, isCooldown };
};

export default useVerificationCountdown;
