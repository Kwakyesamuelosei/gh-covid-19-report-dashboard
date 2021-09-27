import { HttpClient } from '@angular/common/http';
import { IMocked, Mock, setupFunction } from '@morgan-stanley/ts-mocking-bird';
import { of } from 'rxjs';

import { Covid19Service } from './covid-19.service';

describe('Covid19Service', () => {
  let mockHttp: IMocked<HttpClient>;

  const mockData = [
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

  const request = {
    date: '2020-06-01',
    code: 'gh'
  }

  beforeEach(() => {
    mockHttp = Mock.create<HttpClient>().setup(
      setupFunction('get', () => of(mockData) as any)
    );
  });

  function getInstance() {
    return new Covid19Service(mockHttp.mock);
  }

  it('should create the covid service', () => {
    const covidService = getInstance();
    expect(covidService).toBeTruthy();
  });

  it('should request get all covid cases apis once', () => {
    const covidService = getInstance();
    covidService.getCovidReports(request);
    expect(mockHttp.withFunction('get')).wasCalledOnce();
  });

});
