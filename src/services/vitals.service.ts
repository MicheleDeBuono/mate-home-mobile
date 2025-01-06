// Simula i dati vitali del paziente
class VitalsService {
  private mockVitals = {
    heartRate: 75,
    steps: 2430,
    location: 'Camera da letto',
    lastUpdate: new Date().toISOString(),
  };

  async getVitals() {
    // Simula una chiamata API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Aggiorna i dati mock con valori casuali realistici
    this.mockVitals = {
      heartRate: 65 + Math.floor(Math.random() * 20), // 65-85 bpm
      steps: this.mockVitals.steps + Math.floor(Math.random() * 100), // Incrementa i passi
      location: this.mockVitals.location,
      lastUpdate: new Date().toISOString(),
    };

    return this.mockVitals;
  }

  async updateLocation(location: string) {
    // Simula una chiamata API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.mockVitals = {
      ...this.mockVitals,
      location,
      lastUpdate: new Date().toISOString(),
    };

    return this.mockVitals;
  }
}

export const vitalsService = new VitalsService();
