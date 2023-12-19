import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { useCallback, useMemo } from "react";

type HapticImpactStyle = 'heavy' | 'medium' | 'light';

type HapticNotificationType = 'success' | 'warning' | 'error';

type UseHapticsResult = {
  impact: (style: HapticImpactStyle) => Promise<void>;
  vibrate: (duration: number) => Promise<void>;
  notification: (type: HapticNotificationType) => Promise<void>;
};

const IMPACT_STYLES: Record<HapticImpactStyle, ImpactStyle> = {
  heavy: ImpactStyle.Heavy,
  medium: ImpactStyle.Medium,
  light: ImpactStyle.Light,
};

const NOTIFICATION_TYPES: Record<HapticNotificationType, NotificationType> = {
  success: NotificationType.Success,
  warning: NotificationType.Warning,
  error: NotificationType.Error,
};

export const useHaptics = (): UseHapticsResult => {

  const impact = useCallback((style: HapticImpactStyle) => {
    return Haptics.impact({ style: IMPACT_STYLES[style] });
  }, []);

  const vibrate = useCallback((duration: number) => {
    return Haptics.vibrate({ duration });
  }, []);

  const notification = useCallback((type: HapticNotificationType) => {
    return Haptics.notification({ type: NOTIFICATION_TYPES[type] });
  }, []);

  return useMemo(() => ({
    impact,
    vibrate,
    notification,
  }), []);
};
