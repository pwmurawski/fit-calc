import { useEffect, useState } from 'react';
import { BarChart } from 'components/BarChart/BarChart';
import { SummaryDataView } from 'components/SummaryDataView/SummaryDataView';
import { SummarySliderPdf } from 'components/Pdf/SummarySlider/SummarySliderPdf';
import { getDataPdf } from '_api/pdf';
import { useRouter } from 'next/router';
import { SummaryPdfData } from 'types/pdf';
import MealsTablePdf from 'components/Pdf/MealsTable/MealsTable';

function GeneratePdf() {
    const { isReady, query } = useRouter();
    const [pdfData, setPdfData] = useState<SummaryPdfData>();

    const getData = async () => {
        const res = await getDataPdf(String(query.token));
        if (res?.status === 'OK') {
            setPdfData(res.pdfData);
        }
    };

    useEffect(() => {
        if (isReady) {
            getData();
        }
    }, [isReady]);

    console.log(pdfData);

    if (!pdfData) {
        return null;
    }
    return (
        <div id="generate-pdf">
            <SummarySliderPdf startDate={pdfData.startDate} endDate={pdfData.endDate} />
            <BarChart summary={pdfData.summary} />
            <SummaryDataView summary={pdfData.summary} />
            <div style={{ display: 'block', pageBreakAfter: 'always' }} />
            {pdfData.daysData.map(({ mealsData, date }) => (
                <>
                    <SummarySliderPdf startDate={date} endDate={date} />
                    <MealsTablePdf mealsData={mealsData} />
                    <div style={{ display: 'block', pageBreakAfter: 'always' }} />
                </>
            ))}
        </div>
    );
}

export default GeneratePdf;
