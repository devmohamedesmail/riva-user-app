import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

export const useSwitchLanguage = () => {
    const { i18n, t } = useTranslation();

    const switchLanguage = () => {
        try {
            const newLanguage = i18n.language === "en" ? "ar" : "en";

            i18n.changeLanguage(newLanguage);

            Toast.show({
                type: "success",
                text1: t("account.language_switched"),
                position: "top",
                visibilityTime: 2000,
            });
        } catch (error) {
            Toast.show({
                type: "error",
                text1: t("account.language_switch_failed"),
                position: "top",
                visibilityTime: 2000,
            });
        }
    };

    return switchLanguage;
};