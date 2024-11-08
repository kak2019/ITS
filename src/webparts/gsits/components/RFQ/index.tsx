import * as React from 'react';
import { useTranslation } from 'react-i18next';

const RFQ: React.FC = () => {

    const { t } = useTranslation();

    return (
        <div>
            <h2>RFQ</h2>
            <p>{t('welcome')} to the RFQ page</p>
        </div>
    )

}

export default RFQ;