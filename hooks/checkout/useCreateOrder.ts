import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { selectCartItems, selectCartTotalPrice, useAppSelector } from '@/redux/hooks';
import { useAuth } from '@/hooks/auth/useAuth';
import { usePlace } from '@/hooks/place/usePlace';
import useFetch from '@/hooks/common/useFetch';
import BottomSheet from '@gorhom/bottom-sheet';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import Toast from 'react-native-toast-message';
import { CartItem } from '@/@types/cart';
import axios from 'axios';
import { config } from '@/constants/config';
import { useSetting } from '@/hooks/common/useSetting';

export default function useCreateOrder() {
    const { t } = useTranslation();
    const cartItems = useAppSelector(selectCartItems);
    const totalPrice = useAppSelector(selectCartTotalPrice);
    const { auth } = useAuth();
    const { selectedPlace } = usePlace()
    const cart = useAppSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { data: areas } = useFetch(`/areas/place/${selectedPlace?.id}`);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArea, setSelectedArea] = useState<any>(null);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const filteredAreas = areas?.filter((area: any) =>
        area.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
   



    const formik = useFormik({
        initialValues: {
            customer_name: "",
            phone: "",
            address: "",
            area_id: "",
            area_name: "",
        },

        validationSchema: Yup.object({
            customer_name: Yup.string().required(t("order.customerNameRequired")),
            phone: Yup.string()
                .required(t("order.phoneRequired"))
                .min(6, t("order.phoneMin")),
            area_id: Yup.string().required(t("order.areaRequired")),
            address: Yup.string().required(t("order.addressRequired")),
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true);

                if (cartItems.length === 0) {
                    Toast.show({
                        type: "error",
                        text1: "Your cart is empty",
                        position: "bottom",
                    });
                    return;
                }

                const groupedByStore = cartItems.reduce<Record<number, CartItem[]>>(
                    (acc, item) => {
                        if (!acc[item.store_id]) {
                            acc[item.store_id] = [];
                        }
                        acc[item.store_id].push(item);
                        return acc;
                    },
                    {}
                );



                // ✅ 2. create request لكل store
                const requests = Object.keys(groupedByStore).map((storeId) => {
                    const items = groupedByStore[Number(storeId)];

                    const storeTotal = items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );


                    return axios.post(`${config.URL}/orders/create`, {
                        store_id: Number(storeId),

                        order: items.map((item) => ({
                            id: item.id,
                            name: item.name,
                            description: item.description,
                            image: item.image,
                            quantity: item.quantity,
                            price: item.price,
                            selectedAttribute: item.selectedAttribute,
                            store_id: item.store_id,
                            store_name: item.store_name,
                        })),

                        // total_price:  Number(selectedArea?.price || 0) + Number(storeTotal.toFixed(2)),
                        total_price: Number(storeTotal.toFixed(2)),
                        customer_name: values.customer_name,
                        delivery_address: values.address,
                        phone: values.phone,
                        area_id: selectedArea?.id,
                        area_name: selectedArea?.name,
                    });
                });

                // ✅ process all requests
                await Promise.all(requests);

                setSuccessModalVisible(true);
                formik.resetForm();
            } catch (error) {


                Toast.show({
                    type: "error",
                    text1: t("order.orderErrorcreate"),
                    position: "top",
                });
            } finally {
                setLoading(false);
            }
        },
    });
    const storeCount = Object.keys(
        cartItems.reduce<Record<number, CartItem[]>>((acc, item) => {
            if (!acc[item.store_id]) {
                acc[item.store_id] = [];
            }
            acc[item.store_id].push(item);
            return acc;
        }, {})
    ).length;



    return {
        t,
        bottomSheetRef,
        formik,
        selectedArea,
        loading,
        successModalVisible,
        setSuccessModalVisible,
        searchQuery,
        setSearchQuery,
        filteredAreas,
        setSelectedArea,
        setModalVisible,
        storeCount
    }
}
