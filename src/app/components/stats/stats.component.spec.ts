import { StatsComponent } from './stats.component';

describe('StatsComponent', () => {
  const mockStatsDetails = {
    status: 'confirmed',
    statusLabel: 'Confirmed',
    value: '123',
  };

  function getInstance() {
    return new StatsComponent();
  }

  it('should create StatsComponent Component', () => {
    const statsComponent = getInstance();
    expect(statsComponent).toBeDefined();
  });

  it('should render status Label "Confirmed"', () => {
    const statsComponent = getInstance();
    statsComponent.statsDetails = mockStatsDetails;
    expect(statsComponent.statsDetails.statusLabel).toBe('Confirmed');
  });
});
