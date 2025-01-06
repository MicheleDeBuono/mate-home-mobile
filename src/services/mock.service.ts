// Servizio per generare dati simulati per test e demo

class MockService {
  private static instance: MockService;

  private constructor() {}

  public static getInstance(): MockService {
    if (!MockService.instance) {
      MockService.instance = new MockService();
    }
    return MockService.instance;
  }

  // Genera un numero random in un range
  private randomInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Genera un timestamp random nelle ultime ore
  private randomTimestamp(hoursAgo: number = 24): string {
    const now = new Date();
    const hours = this.randomInRange(1, hoursAgo);
    const minutes = this.randomInRange(0, 59);
    now.setHours(now.getHours() - hours);
    now.setMinutes(minutes);
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Genera dati per la stanza principale
  public getMainRoomStatus() {
    const breathingRate = this.randomInRange(12, 20);
    const activityLevel = this.randomInRange(0, 100);
    
    return {
      presence: Math.random() > 0.1, // 90% del tempo presente
      breathing: breathingRate < 14 ? 'Lento' : breathingRate > 18 ? 'Accelerato' : 'Normale',
      breathingRate: `${breathingRate} resp/min`,
      activity: activityLevel < 30 ? 'Calmo' : activityLevel > 70 ? 'Agitato' : 'Normale',
      activityLevel: activityLevel < 30 ? 'Basso' : activityLevel > 70 ? 'Alto' : 'Medio',
      lastMovement: `${this.randomInRange(1, 15)} minuti fa`,
    };
  }

  // Genera dati per il bagno
  public getBathroomStatus() {
    const visits = this.randomInRange(4, 8);
    return {
      presence: Math.random() > 0.9, // 10% del tempo presente
      lastVisit: this.randomTimestamp(3),
      duration: `${this.randomInRange(3, 8)} min`,
      visitsToday: visits,
      averageVisitTime: `${(this.randomInRange(30, 60) / 10).toFixed(1)} min`,
    };
  }

  // Genera dati per i grafici della stanza principale
  public getMainRoomChartData(points: number = 7) {
    return {
      breathing: {
        labels: Array.from({ length: points }, (_, i) => {
          const date = new Date();
          date.setHours(date.getHours() - (points - 1 - i));
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }),
        datasets: [{
          data: Array.from({ length: points }, () => this.randomInRange(12, 20)),
        }]
      },
      activity: {
        labels: Array.from({ length: points }, (_, i) => {
          const date = new Date();
          date.setHours(date.getHours() - (points - 1 - i));
          return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }),
        datasets: [{
          data: Array.from({ length: points }, () => this.randomInRange(0, 100)),
        }]
      }
    };
  }

  // Genera dati per i grafici del bagno
  public getBathroomChartData() {
    return {
      weeklyVisits: {
        labels: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
        datasets: [{
          data: Array.from({ length: 7 }, () => this.randomInRange(4, 10)),
        }]
      },
      visitDurations: {
        labels: ['1-3m', '3-5m', '5-7m', '7-10m', '>10m'],
        datasets: [{
          data: [
            this.randomInRange(5, 15),  // 1-3m
            this.randomInRange(10, 20), // 3-5m
            this.randomInRange(5, 10),  // 5-7m
            this.randomInRange(2, 5),   // 7-10m
            this.randomInRange(0, 3),   // >10m
          ],
        }]
      }
    };
  }

  // Genera dati per i dispositivi
  public getDevicesStatus() {
    return [
      {
        id: 'RADAR-001',
        name: 'Radar Stanza Principale',
        type: 'Radar',
        location: 'Stanza Principale',
        status: Math.random() > 0.05 ? 'Online' : 'Offline', // 95% online
        lastUpdate: `${this.randomInRange(1, 5)} minuti fa`,
      },
      {
        id: 'RADAR-002',
        name: 'Radar Bagno',
        type: 'Radar',
        location: 'Bagno',
        status: Math.random() > 0.05 ? 'Online' : 'Offline', // 95% online
        lastUpdate: `${this.randomInRange(1, 5)} minuti fa`,
      },
    ];
  }

  // Genera dati di configurazione
  public getConfig() {
    return {
      patient: {
        name: 'Mario Rossi',
        age: '75',
        notes: 'Paziente con difficoltà motorie',
      },
      mainRoom: {
        name: 'Soggiorno',
        deviceId: 'RADAR-001',
        deviceStatus: Math.random() > 0.05 ? 'Online' : 'Offline',
        lastMaintenance: '15/12/2023',
      },
      bathroom: {
        name: 'Bagno',
        deviceId: 'RADAR-002',
        deviceStatus: Math.random() > 0.05 ? 'Online' : 'Offline',
        lastMaintenance: '15/12/2023',
      },
    };
  }
}

export const mockService = MockService.getInstance();
