import BottomPaper from '@/components/ui/bottom-paper';
import { useSetting } from "@/hooks/common/useSetting";
import BottomSheet from "@gorhom/bottom-sheet";
import Constants from "expo-constants";
import React, { useEffect, useRef } from "react";
import { Linking, View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Text from "./text";
import Button from './button';

export default function AppUpdateChecker() {
    const { t } = useTranslation();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const { settings } = useSetting()
    const version = Constants.expoConfig?.version;
   



    useEffect(() => {
        const timer = setTimeout(() => {
            checkUpdate();
        }, 5000);

        return () => clearTimeout(timer);
    }, [settings]);

    const checkUpdate = () => {
        if (!settings?.version || !version) return;

        const isForceUpdate = settings?.user_force_update;
        const isOutdated = version !== settings.version;

        // console.log("current:", version);
        // console.log("latest:", settings.version);

        if (isForceUpdate) {
            bottomSheetRef.current?.expand();

        }
    };



    return (
        <>

            <BottomPaper ref={bottomSheetRef} snapPoints={['50%']}>
                <View className="p-6 items-center w-full mt-2">
                    <View className="bg-primary/10 p-5 rounded-full mb-5">
                        <Text className="text-5xl">🚀</Text>
                    </View>

                    <Text className="text-2xl cairoBold text-gray-900 mb-3 text-center">
                        {t('update.title')}
                    </Text>

                    <Text className="text-base text-gray-500 text-center mb-8 px-2 leading-6">
                        {t('update.description')}
                    </Text>

                    {/* <TouchableOpacity
                        className="bg-primary w-full py-4 rounded-xl items-center shadow-sm"
                        onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.dev.mohamed.esmail.tawsilaapp")}
                    >
                        <Text className="text-white cairoBold text-lg">
                            {t('update.button')}
                        </Text>
                    </TouchableOpacity> */}
                    <Button

                        className='w-full'
                        title={t('update.button')}
                        onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.dev.mohamed.esmail.tawsilaapp")}
                    />
                </View>
            </BottomPaper>
        </>
    );
}