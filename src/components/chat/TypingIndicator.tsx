import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.stagger(200, [
          Animated.sequence([
            Animated.timing(dot1, { toValue: -6, duration: 300, useNativeDriver: true }),
            Animated.timing(dot1, { toValue: 0, duration: 300, useNativeDriver: true })
          ]),
          Animated.sequence([
            Animated.timing(dot2, { toValue: -6, duration: 300, useNativeDriver: true }),
            Animated.timing(dot2, { toValue: 0, duration: 300, useNativeDriver: true })
          ]),
          Animated.sequence([
            Animated.timing(dot3, { toValue: -6, duration: 300, useNativeDriver: true }),
            Animated.timing(dot3, { toValue: 0, duration: 300, useNativeDriver: true })
          ])
        ]),
        Animated.delay(200) 
      ])
    );

    loop.start();

    return () => loop.stop();
  }, [dot1, dot2, dot3]);

  return (
    <View style={styles.typingContainer}>
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot1 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot2 }] }]} />
      <Animated.View style={[styles.dot, { transform: [{ translateY: dot3 }] }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 24,
    width: 32,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D9D9D9',
  },
});
