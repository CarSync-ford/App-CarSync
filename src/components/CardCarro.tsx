import { Colors } from "@/constants/Constants";
import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

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
                    source={require('../../assets/images/ranger.png')}
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 180,
        backgroundColor: 'transparent',
        borderRadius: 24,
        paddingHorizontal: 20,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '55%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleBackground: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    image: {
        width: '130%',
        height: '100%',
        position: 'absolute',
        left: -15,
    },
    textContainer: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        
    },
    nameText: {
        fontSize: 28,
        fontFamily: 'Inter_700Bold',
        color: '#FFFFFF',
        lineHeight: 36,
        textAlign: 'center',
    },
    badgeContainer: {
        marginTop: 12,
        backgroundColor: Colors.verde,
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#FFFFFF',
    },
});