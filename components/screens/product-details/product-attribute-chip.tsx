import React from 'react'
import { Pressable , View} from 'react-native'
import Text from '@/components/ui/text'
import { AntDesign } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { Attribute, AttributeValue } from '@/@types/stores'



export default function ProductAttributeChip({
    attrValue,
    attribute,
    isSelected,
    onSelect,
}: {
    attrValue: AttributeValue
    attribute: Attribute
    isSelected: boolean
    onSelect: (attr: { name: string; value: string; price: number }) => void
}) {
     const { t } = useTranslation()
  return (
     <Pressable
                onPress={() =>
                    onSelect({ name: attribute.name, value: attrValue.value, price: attrValue.price })
                }
                className={`mr-2 mb-2 px-4 py-3 rounded-xl border-2 flex-row items-center gap-2 ${
                    isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-card dark:bg-card-dark border-border dark:border-border-dark'
                }`}
                style={isSelected ? { shadowColor: '#fd4a12', shadowOpacity: 0.3, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 4 } : {}}
            >
                {isSelected && (
                    <AntDesign name="check" size={14} color="white" />
                )}
                <View>
                    <Text
                        className={`font-cairoBold text-sm ${
                            isSelected ? 'text-white' : 'text-text dark:text-text-dark'
                        }`}
                    >
                        {attrValue.value}
                    </Text>
                    <Text
                        className={`font-cairo text-xs mt-0.5 ${
                            isSelected ? 'text-white/80' : 'text-primary'
                        }`}
                    >
                        {attrValue.price} {t('common.currency')}
                    </Text>
                </View>
            </Pressable>
  )
}
