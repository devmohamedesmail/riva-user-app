import { Text as RNText, TextProps } from "react-native";
import { useTranslation } from "react-i18next";

export default function Text({ children, className, ...props }: TextProps) {
    const { i18n } = useTranslation();
    const font = i18n.language === "ar" ? "font-cairo" : "font-poppins";
    const textAlign = i18n.language === "ar" ? "text-right" : "text-left";
    return (
        <RNText className={`${font} ${textAlign} ${className}`} {...props}>
            {children}
        </RNText>
    );
}