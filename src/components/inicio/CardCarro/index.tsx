import { Colors } from "@/constants/Constants";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from './style';

export default function CardCarro() {
    return (
        <LinearGradient 
            colors={['#4CA1FE', '#1B47A1']} 
            start={{ x: 1, y: 0 }} 
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <View style={styles.imageContainer}>
                <View style={styles.circleBackground} />

                <Image
                    source={require('@/assets/images/ranger.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.nameText}>Ranger</Text>
                <Text style={styles.nameText}>Raptor</Text>

                <View style={styles.badgeContainer}>
                    <Text style={styles.statusText}>Active</Text>
                </View>
            </View>
        </LinearGradient>
    );
}
