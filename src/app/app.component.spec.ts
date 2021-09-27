import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { Covid19Service } from './services/covid-19.service';

describe('AppComponent', () => {

  let mockCovid19Service: IMocked<Covid19Service>;

  const covidServiceList: any[] = [
    {
      country: 'Ghana',
      provinces: [
        {
          province: 'Ghana',
          confirmed: '8070',
          recovered: '2947',
          deaths: '36',
          active: '5087',
        },
      ],
      latitude: 7.946527,
      longitude: -1.023194,
      date: '2020-06-01',
    },
  ];

  beforeEach(() => {
    mockCovid19Service = Mock.create<Covid19Service>().setup(
      setupFunction('getCovidReports', () => of(covidServiceList))
    );
  });

  function getInstance() {
    return new AppComponent(mockCovid19Service.mock);
  }

  it('should create Covid Component', () => {
    const covidComponent = getInstance();
    expect(covidComponent).toBeDefined();
  });

  it('should render 4 cases in the covid component', () => {
    const covidComponent = getInstance();
    covidComponent.code = "gh"
    covidComponent.selectedDate = new Date('2020-06-01');
    covidComponent.ngOnInit();
    expect(covidComponent.stats.length).toBe(4);
  });

  it('should render active cases in the covid component', () => {
    const covidComponent = getInstance();
    covidComponent.code = 'gh';
    covidComponent.selectedDate = new Date('2020-06-01');
    covidComponent.ngOnInit();
    expect(covidComponent.stats[3].status).toBe('active');
    expect(covidComponent.stats[3].value).toBe('5087');
  });

  it('should render confirmed cases in the covid component', () => {
    const covidComponent = getInstance();
    covidComponent.code = 'gh';
    covidComponent.selectedDate = new Date('2020-06-01');
    covidComponent.ngOnInit();
    expect(covidComponent.stats[0].status).toBe('confirmed');
    expect(covidComponent.stats[0].value).toBe('8070');
  });

  it('should render recovered cases in the covid component', () => {
    const covidComponent = getInstance();
    covidComponent.code = 'gh';
    covidComponent.selectedDate = new Date('2020-06-01');
    covidComponent.ngOnInit();
    expect(covidComponent.stats[1].status).toBe('recovered');
    expect(covidComponent.stats[1].value).toBe('2947');
  });

  it('should render deaths cases in the covid component', () => {
    const covidComponent = getInstance();
    covidComponent.code = 'gh';
    covidComponent.selectedDate = new Date('2020-06-01');
    covidComponent.ngOnInit();
    expect(covidComponent.stats[2].status).toBe('deaths');
    expect(covidComponent.stats[2].value).toBe('36');
  });

});
