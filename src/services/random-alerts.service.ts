import { alertsService } from './alerts.service';

const randomAlerts = [
  {
    title: 'Respirazione Rapida',
    message: 'La frequenza respiratoria è aumentata a {value} resp/min negli ultimi 5 minuti.',
    type: 'movement' as const,
    getValue: () => Math.floor(Math.random() * (24 - 20 + 1)) + 20,
  },
  {
    title: 'Attività Notturna',
    message: 'Rilevati {value} episodi di movimento nelle ultime 2 ore.',
    type: 'movement' as const,
    getValue: () => Math.floor(Math.random() * 5) + 3,
  },
  {
    title: 'Tempo in Bagno',
    message: 'Visita in bagno di {value} minuti. Durata superiore alla media.',
    type: 'bathroom' as const,
    getValue: () => Math.floor(Math.random() * 10) + 12,
  },
  {
    title: 'Batteria Dispositivo',
    message: 'La batteria del dispositivo RADAR-001 è al {value}%.',
    type: 'temperature' as const,
    getValue: () => Math.floor(Math.random() * 10) + 5,
  },
  {
    title: 'Connessione Instabile',
    message: 'Persi {value} pacchetti dati negli ultimi 10 minuti.',
    type: 'temperature' as const,
    getValue: () => Math.floor(Math.random() * 50) + 20,
  },
  {
    title: 'Temperatura Ambiente',
    message: 'La temperatura nella stanza principale è {value}°C.',
    type: 'temperature' as const,
    getValue: () => (Math.random() * (28 - 16) + 16).toFixed(1),
  },
];

let intervalId: NodeJS.Timeout | null = null;

export const randomAlertsService = {
  generateOne: async () => {
    // Seleziona un alert casuale
    const alertTemplate = randomAlerts[Math.floor(Math.random() * randomAlerts.length)];
    
    // Genera il valore casuale
    const value = alertTemplate.getValue();
    
    // Crea l'alert con il valore inserito nel messaggio
    const alert = {
      id: Date.now(), // Aggiungi un ID univoco
      title: alertTemplate.title,
      description: alertTemplate.message.replace('{value}', value.toString()),
      timestamp: 'Adesso',
      type: alertTemplate.type,
      read: false, // Imposta read a false per default
    };

    return alert; // Restituisci direttamente l'alert invece di usare alertsService
  },

  startGenerating(intervalMs: number = 30000) {
    if (intervalId) {
      this.stopGenerating();
    }

    // Genera il primo alert immediatamente
    this.generateOne();

    // Imposta l'intervallo per generare alert successivi
    intervalId = setInterval(() => this.generateOne(), intervalMs);
  },

  stopGenerating() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};
