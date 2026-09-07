import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system/legacy';

export class AudioQueuePlayer {
  private queue: string[] = [];
  private isPlaying = false;
  private sound: Audio.Sound | null = null;
  private chunkIndex = 0;

  constructor(
    private onStatusChange: (status: 'ready' | 'speaking') => void
  ) {}

  /**
   * Adiciona um chunk (em base64) à fila e inicia a reprodução se não estiver tocando.
   */
  public async enqueueChunkBase64(base64Data: string) {
    // Salva o chunk temporariamente no sistema de arquivos
    const uri = `${FileSystem.cacheDirectory}chunk_${this.chunkIndex++}.mp3`;
    
    try {
      await FileSystem.writeAsStringAsync(uri, base64Data, {
        encoding: 'base64',
      });
      
      this.queue.push(uri);
      
      if (!this.isPlaying) {
        this.playNext();
      }
    } catch (error) {
      console.error('Erro ao escrever chunk de áudio:', error);
    }
  }

  /**
   * Toca o próximo chunk da fila
   */
  private async playNext() {
    if (this.queue.length === 0) {
      this.isPlaying = false;
      this.onStatusChange('ready');
      return;
    }

    this.isPlaying = true;
    this.onStatusChange('speaking');
    const nextUri = this.queue.shift();

    if (!nextUri) return;

    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: nextUri },
        { shouldPlay: true }
      );
      this.sound = sound;

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(console.error);
          // Opcional: apagar o arquivo para não encher cache
          FileSystem.deleteAsync(nextUri, { idempotent: true }).catch(console.error);
          this.playNext();
        }
      });
    } catch (error) {
      console.error('Erro ao tocar áudio:', error);
      this.playNext();
    }
  }

  /**
   * Para a reprodução atual e limpa a fila
   */
  public async stopAll() {
    this.queue = [];
    this.isPlaying = false;
    
    if (this.sound) {
      try {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
      } catch (e) {
        // ignora se já descarregou
      }
      this.sound = null;
    }
    
    this.onStatusChange('ready');
  }
}
