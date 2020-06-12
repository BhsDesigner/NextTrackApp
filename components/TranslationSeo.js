import {DefaultSeo as DefaultSeoFunction} from "../constants/next-seo.config";
import {DefaultSeo} from "next-seo";
import React from "react";
import {useTranslate} from "react-admin";

export const TranslationSeo = () => {
    const translate = useTranslate();
    return (
        <DefaultSeo {...DefaultSeoFunction(translate)} />
    )
}
