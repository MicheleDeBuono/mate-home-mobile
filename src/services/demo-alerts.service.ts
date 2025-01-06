import { alertsService } from './alerts.service';

export async function generateDemoAlerts() {
  // Prima pulisce tutte le notifiche esistenti
  await alertsService.deleteAllAlerts();

  // Aggiunge notifiche di esempio
  const demoAlerts = [
    {
      title: 'Respirazione Anomala',
      message: 'Rilevata frequenza respiratoria elevata (22 resp/min) negli ultimi 15 minuti.',
      type: 'warning' as const,
    },
    {
      title: 'Lungo Periodo in Bagno',
      message: 'Il paziente è rimasto in bagno per più di 15 minuti. Si consiglia di verificare.',
      type: 'warning' as const,
    },
    {
      title: 'Dispositivo Offline',
      message: 'Il radar del bagno (RADAR-002) non risponde. Verificare la connessione.',
      type: 'error' as const,
    },
    {
      title: 'Attività Notturna',
      message: 'Rilevati movimenti frequenti durante la notte (3:00 - 4:00).',
      type: 'info' as const,
    },
    {
      title: 'Batteria Scarica',
      message: 'La batteria del dispositivo RADAR-001 è al 15%. Collegare all\'alimentazione.',
      type: 'warning' as const,
    },
    {
      title: 'Aggiornamento Disponibile',
      message: 'È disponibile un nuovo aggiornamento firmware per i dispositivi radar.',
      type: 'info' as const,
    },
    {
      title: 'Pattern Anomalo',
      message: 'Rilevato pattern di movimento insolito nella stanza principale.',
      type: 'warning' as const,
    },
  ];

  // Aggiunge le notifiche con un ritardo crescente per simulare tempi diversi
  for (let i = 0; i < demoAlerts.length; i++) {
    await new Promise(resolve => setTimeout(resolve, i * 100));
    await alertsService.addAlert(demoAlerts[i]);
  }

  // Segna alcune notifiche come lette
  const alerts = await alertsService.getAlerts();
  await alertsService.markAsRead(alerts[3].id); // Attività Notturna
  await alertsService.markAsRead(alerts[5].id); // Aggiornamento Disponibile
}
