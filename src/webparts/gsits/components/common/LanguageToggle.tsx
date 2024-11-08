import * as React from "react";
import { useTranslation } from "react-i18next"
import { Toggle } from "@fluentui/react";

const LanguageToggle:React.FC=()=>{
    const {i18n}=useTranslation();
    const handleToggleChange=(event:React.MouseEvent<HTMLElement>,checked?:boolean):void=>{
        i18n.changeLanguage(checked?'zh':'en').catch(()=>{

        });
    };

    return (
        <Toggle
        label="Language"
        onText="中文"
        offText="English"
        onChange={handleToggleChange}
        />
    )
}
export default LanguageToggle;