import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useVehicle } from '@/src/contexts/VehicleContext';
import { styles } from './style';

export type ConexaoCarro = 'idle' | 'connecting' | 'connected';

interface CardCarroProps {
    status: ConexaoCarro;
    onConnect: () => void;
}

export default function CardCarro({ status, onConnect }: CardCarroProps) {
    const { veiculoSelecionado } = useVehicle();
    const linhas = veiculoSelecionado.nome.split(' ');

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
                    source={veiculoSelecionado.imagem}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.textContainer}>
                {linhas.map((linha) => (
                    <Text key={linha} style={styles.nameText}>{linha}</Text>
                ))}

                {status === 'connected' && (
                    <View style={styles.badgeContainer}>
                        <Text style={styles.statusText}>Active</Text>
                    </View>
                )}

                {status === 'connecting' && (
                    <View style={styles.badgeContainer}>
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    </View>
                )}

                {status === 'idle' && (
                    <TouchableOpacity style={styles.badgeContainer} onPress={onConnect} activeOpacity={0.8}>
                        <Text style={styles.statusText}>Conectar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </LinearGradient>
    );
}
