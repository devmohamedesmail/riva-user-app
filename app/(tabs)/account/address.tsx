import React, { useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from 'nativewind';
import { useAddresses } from '@/hooks/address/useAddresses';
import Header from '@/components/ui/header';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Modal from '@/components/ui/modal';
import Toast from 'react-native-toast-message';

export default function Address() {
    const { t, i18n } = useTranslation();
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const { useAddressesQuery, useCreateAddress, useUpdateAddress, useDeleteAddress } = useAddresses();
    const { data: addresses, isLoading, isError } = useAddressesQuery();
    
    const createAddressMutation = useCreateAddress();
    const updateAddressMutation = useUpdateAddress();
    const deleteAddressMutation = useDeleteAddress();

    const [modalVisible, setModalVisible] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [form, setForm] = useState({ street: '', phone: '' });

    const openModal = (address?: any) => {
        if (address) {
            setEditingId(address.id);
            setForm({ street: address.address || '', phone: address.phone || '' });
        } else {
            setEditingId(null);
            setForm({ street: '', phone: '' });
        }
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setEditingId(null);
        setForm({ street: '', phone: '' });
    };

    const handleSave = () => {
        if (!form.street || !form.phone) {
            Toast.show({ type: 'error', text1: t('common.error'), text2: t('address.validationError') });
            return;
        }

        if (editingId) {
            updateAddressMutation.mutate(
                { id: editingId, data: { address: form.street, phone: form.phone } },
                {
                    onSuccess: () => {
                        Toast.show({ type: 'success', text1: t('address.successUpdate') });
                        closeModal();
                    },
                    onError: () => Toast.show({ type: 'error', text1: t('address.error') })
                }
            );
        } else {
            createAddressMutation.mutate(
                { address: form.street, phone: form.phone },
                {
                    onSuccess: () => {
                        Toast.show({ type: 'success', text1: t('address.successAdd') });
                        closeModal();
                    },
                    onError: () => Toast.show({ type: 'error', text1: t('address.error') })
                }
            );
        }
    };

    const handleDelete = (id: number) => {
        Alert.alert(
            t('address.deleteConfirmTitle'),
            t('address.deleteConfirmMessage'),
            [
                { text: t('address.cancel'), style: 'cancel' },
                { 
                    text: t('address.deleteAddress'), 
                    style: 'destructive', 
                    onPress: () => {
                        deleteAddressMutation.mutate(id, {
                            onSuccess: () => Toast.show({ type: 'success', text1: t('address.successDelete') }),
                            onError: () => Toast.show({ type: 'error', text1: t('address.error') })
                        });
                    } 
                }
            ]
        );
    };

    const renderItem = ({ item }: { item: any }) => (
        <View className={`p-4 mb-3 rounded-xl border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} shadow-sm flex-row justify-between items-center ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
            <View className={`flex-1 ${i18n.language === 'ar' ? 'mr-3' : 'ml-3'}`}>
                <Text className={`text-base font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'} ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                    {item.address}
                </Text>
                {item.phone && (
                    <Text className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'} ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                        {item.phone}
                    </Text>
                )}
            </View>
            <View className={`flex-row gap-2 ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                <TouchableOpacity onPress={() => openModal(item)} className="p-2 bg-blue-100 rounded-full dark:bg-blue-900/30">
                    <Ionicons name="pencil" size={20} color="#3b82f6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)} className="p-2 bg-red-100 rounded-full dark:bg-red-900/30">
                    <Ionicons name="trash" size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            <Header title={t('address.title')} showBackButton={true} />
            
            <View className="flex-1 p-4">
                {isLoading ? (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" color="#fd4a12" />
                    </View>
                ) : isError ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className={`text-red-500 text-lg ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                            {t('address.error')}
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={addresses || []}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 80 }}
                        ListEmptyComponent={
                            <View className="flex-1 justify-center items-center py-20">
                                <Ionicons name="location-outline" size={64} color={isDark ? '#4b5563' : '#d1d5db'} />
                                <Text className={`text-lg font-bold mt-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                    {t('address.noAddresses')}
                                </Text>
                                <Text className={`text-sm mt-2 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {t('address.noAddressesDescription')}
                                </Text>
                            </View>
                        }
                    />
                )}
            </View>

            <View className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <Button 
                    title={t('address.addAddress')} 
                    onPress={() => openModal()} 
                    variant="primary" 
                    icon={<Ionicons name="add" size={20} color="white" />} 
                />
            </View>

            <Modal visible={modalVisible} onClose={closeModal} animation="slide">
                <View className="pb-8">
                    <Text className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'} ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>
                        {editingId ? t('address.editAddress') : t('address.addAddress')}
                    </Text>
                    
                    <Input
                        label={t('address.street')}
                        placeholder={t('address.enterStreet')}
                        value={form.street}
                        onChangeText={(text) => setForm({ ...form, street: text })}
                        icon="location-outline"
                    />

                    <Input
                        label={t('address.phone')}
                        placeholder={t('address.enterPhone')}
                        value={form.phone}
                        onChangeText={(text) => setForm({ ...form, phone: text })}
                        icon="call-outline"
                        keyboardType="phone-pad"
                    />

                    <View className={`flex-row mt-6 pt-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} justify-between ${i18n.language === 'ar' ? 'flex-row-reverse' : ''}`}>
                        <Button 
                            title={t('address.cancel')} 
                            onPress={closeModal} 
                            variant="outline"
                            className="flex-1 mr-2"
                        />
                        <Button 
                            title={editingId ? t('address.save') : t('address.addAddress')} 
                            onPress={handleSave} 
                            variant="primary"
                            loading={editingId ? updateAddressMutation.isPending : createAddressMutation.isPending}
                            className="flex-1 ml-2"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}