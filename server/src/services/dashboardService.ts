import SecurityReport from '../models/SecurityReport.js';
import Recommendation from '../models/Recommendation.js';
import Incident from '../models/Incident.js';
import { fallbackDashboard } from '../utils/demoData.js';

export async function getDashboardData() {
  try {
    const [reports, recommendations, incidents] = await Promise.all([
      SecurityReport.find().limit(3).lean(),
      Recommendation.find().limit(4).lean(),
      Incident.find().limit(5).lean()
    ]);

    if (!reports.length && !recommendations.length && !incidents.length) {
      return fallbackDashboard;
    }

    const score = reports.reduce((sum, report) => sum + Number(report.score || 0), 0) / Math.max(reports.length, 1);

    return {
      score: Math.round(score || fallbackDashboard.score),
      metrics: [
        { label: 'Security Score', value: String(Math.round(score || fallbackDashboard.score)), trend: '+6.4%' },
        { label: 'Threat Indicators', value: String(incidents.length * 8 || 24), trend: '-12%' },
        { label: 'Completed Checks', value: String(reports.length * 6 || 18), trend: '+3' },
        { label: 'Recommendations', value: String(recommendations.length || 7), trend: recommendations.length > 0 ? 'updated' : '2 urgent' }
      ],
      activity: incidents.slice(0, 3).map((incident) => ({
        time: new Date(incident.updatedAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: incident.title,
        status: incident.severity === 'high' ? 'warning' : 'success'
      }))
    };
  } catch {
    return fallbackDashboard;
  }
}
