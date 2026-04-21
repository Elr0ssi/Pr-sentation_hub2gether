export function riskColor(score: number): string {
  if (score < 30) return '#22c55e';
  if (score < 50) return '#f59e0b';
  if (score < 70) return '#f97316';
  return '#ef4444';
}

export function severityClass(severity: string): string {
  switch (severity) {
    case 'Low':
      return 'text-riskLow';
    case 'Medium':
      return 'text-riskMid';
    case 'High':
      return 'text-riskHigh';
    default:
      return 'text-riskCritical';
  }
}
