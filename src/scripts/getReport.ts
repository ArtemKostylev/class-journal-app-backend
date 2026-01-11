import { getAnnualReport } from '~/service/reports/getAnnualReport';

getAnnualReport().then((link) => {
    console.log(link);
});